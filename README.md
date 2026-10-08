# 🍔 Savora — Premium Food Delivery Platform

A full-featured food delivery web application with Business Process Management (BPM) and Entity Relationship Diagram (ERD) showcase.

---

## 🚀 How to Open (No Installation Needed!)

### Option 1: Open Directly in Browser (Recommended - Zero Setup)
1. Navigate to the `public/` folder
2. Double-click **`index.html`** to open the food delivery app
3. Double-click **`bpm.html`** to open the BPM & ERD dashboard

### Option 2: Run with Node.js Backend (If Node.js is installed)
```bash
cd foodrush
npm install
npm start
# Then open http://localhost:3000
```

---

## 📱 Features

### Food Delivery App (`index.html`)
- ✅ **Homepage** — Hero section, search, restaurant listings
- ✅ **Restaurant Browsing** — 8 restaurants with cuisine filters
- ✅ **Menu & Cart** — Full menu with add/remove, quantity control
- ✅ **Order Placement** — Full checkout with delivery fee + tax
- ✅ **Live Order Tracking** — 6-step animated tracking with real-time progress
- ✅ **Order History** — View all past orders with status
- ✅ **User Auth** — Sign in / Register with localStorage persistence
- ✅ **Light/Dark Theme** — Toggle with 🌙/☀️ button
- ✅ **Responsive Design** — Mobile-friendly layout

### BPM & ERD Page (`bpm.html`)
- ✅ **BPM Lifecycle** — Interactive 6-stage lifecycle with detail panels
- ✅ **Order Process Flow** — Visual step-by-step flow diagram
- ✅ **ERD Diagram** — Full SVG entity-relationship diagram with 9 entities
- ✅ **Entity Tables** — Detailed attribute tables for all 6 major entities
- ✅ **Decision Gateways** — 4 BPMN decision points explained
- ✅ **KPI Dashboard** — 8 real-time business metrics
- ✅ **Process Details** — 4 core business process breakdowns

---

## 🎨 Design Features
- **Vibrant orange/red brand palette** (appetite-stimulating)
- **Glassmorphism navbar** with backdrop blur
- **Smooth micro-animations** — floating hero, card hover lifts
- **Google Fonts** — Outfit (primary) + Inter
- **Dark mode** — Complete CSS variable system
- **Toast notifications** for every action

---

## 🗂️ Project Structure
```
foodrush/
├── public/
│   ├── index.html    ← Main food delivery app
│   ├── bpm.html      ← BPM & ERD showcase page
│   ├── styles.css    ← Complete design system
│   ├── data.js       ← Mock data + API + Cart utilities
│   └── app.js        ← Application logic & routing
├── server.js         ← Express backend (requires Node.js)
└── package.json
```

---

## 🔑 Demo Login
- **Email:** `demo@savora.com`
- **Password:** `demo123`

---

## 📊 BPM Lifecycle Stages
1. **Process Discovery** — Identify & map all business processes
2. **Process Design** — Model optimized workflows with BPMN
3. **Process Modeling** — Simulate and validate process performance
4. **Process Execution** — Implement and automate processes
5. **Process Monitoring** — Track KPIs in real-time
6. **Process Optimization** — Continuously improve with data

## 🗃️ ERD Entities
- **User** — Customer accounts & loyalty
- **Restaurant** — Partner restaurants & menus
- **Menu Item** — Food items with categories
- **Order** — Order lifecycle management
- **Order Item** — Line items in each order
- **Delivery Partner** — Real-time GPS tracking
- **Payment** — Multi-gateway transactions
- **Address** — Saved delivery addresses
- **Review** — Ratings & feedback system
