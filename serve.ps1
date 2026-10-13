# FoodRush Local Server - Pure PowerShell (No Node.js/Python needed)
# Uses .NET HttpListener built into Windows

$port = 3000
$rootPath = "$PSScriptRoot\public"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host ""
Write-Host "  ============================================" -ForegroundColor DarkGray
Write-Host "  🍔  FoodRush Server Running!" -ForegroundColor Green
Write-Host "  ============================================" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  🌐  App URL  : " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:$port" -ForegroundColor Yellow
Write-Host "  📊  BPM/ERD : " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:$port/bpm.html" -ForegroundColor Yellow
Write-Host "  ⚡  Canvas  : " -NoNewline -ForegroundColor Cyan
Write-Host "http://localhost:$port/erd-bpmn.html" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor DarkGray
Write-Host ""

# Auto-open browser
try { Start-Process "http://localhost:$port" -ErrorAction SilentlyContinue } catch {}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Get requested path
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/" -or $urlPath -eq "") { $urlPath = "/index.html" }

        $filePath = Join-Path $rootPath $urlPath.TrimStart("/").Replace("/", "\")

        # Security: prevent path traversal
        if (-not $filePath.StartsWith($rootPath)) {
            $response.StatusCode = 403
            $response.Close()
            continue
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $contentType
            $response.ContentLength64 = $content.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($content, 0, $content.Length)
            
            $timestamp = Get-Date -Format "HH:mm:ss"
            Write-Host "  [$timestamp] " -NoNewline -ForegroundColor DarkGray
            Write-Host "200 " -NoNewline -ForegroundColor Green
            Write-Host "$urlPath" -ForegroundColor White
        } else {
            # 404 - serve index.html for SPA routing
            $indexPath = Join-Path $rootPath "index.html"
            if (Test-Path $indexPath) {
                $content = [System.IO.File]::ReadAllBytes($indexPath)
                $response.ContentType = "text/html; charset=utf-8"
                $response.ContentLength64 = $content.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($content, 0, $content.Length)
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
            $timestamp = Get-Date -Format "HH:mm:ss"
            Write-Host "  [$timestamp] " -NoNewline -ForegroundColor DarkGray
            Write-Host "404 " -NoNewline -ForegroundColor Red
            Write-Host "$urlPath" -ForegroundColor DarkGray
        }
    } catch {
        # Silently handle client disconnects
    } finally {
        try { $response.OutputStream.Close() } catch {}
        try { $response.Close() } catch {}
    }
}
