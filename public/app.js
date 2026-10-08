// ==================== SAVORA APP.JS ====================

let currentPage = 'home';
let currentRestaurantId = null;
let currentOrderId = null;
let activeFilter = 'All';
let cartRestaurantData = null;

// ==================== NAVIGATION ====================

function navigateTo(page, params = {}) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  currentPage = page;

  if (page === 'home') loadHomeRestaurants();
  if (page === 'restaurants') loadRestaurantsPage();
  if (page === 'menu' && params.restaurantId) loadMenuPage(params.restaurantId);
  if (page === 'orders') loadOrdersPage();
  if (page === 'tracking' && params.orderId) loadTrackingPage(params.orderId);
}

function doHeroSearch() {
  const q = document.getElementById('hero-search').value.trim();
  if (q) {
    document.getElementById('restaurant-search').value = q;
    navigateTo('restaurants');
    setTimeout(() => {
      document.getElementById('restaurant-search-2').value = q;
      filterRestaurants();
    }, 100);
  } else {
    navigateTo('restaurants');
  }
}

// ==================== RESTAURANT LOADING ====================

async function loadHomeRestaurants() {
  const grid = document.getElementById('restaurant-grid-home');
  grid.innerHTML = '<div class="loader"></div>';

  // Render cuisine chips
  const chipsContainer = document.getElementById('cuisine-chips');
  chipsContainer.innerHTML = CUISINES.map(c =>
    `<div class="chip ${c === activeFilter ? 'active' : ''}" onclick="setFilter('${c}', 'home')">${c}</div>`
  ).join('');

  const restaurants = await API.getRestaurants();
  renderRestaurantGrid(grid, restaurants);
  document.getElementById('restaurant-count').textContent = `Showing ${restaurants.length} restaurants`;
}

async function loadRestaurantsPage() {
  const grid = document.getElementById('restaurant-grid-2');
  grid.innerHTML = '<div class="loader"></div>';

  const chipsContainer = document.getElementById('cuisine-chips-2');
  chipsContainer.innerHTML = CUISINES.map(c =>
    `<div class="chip ${c === activeFilter ? 'active' : ''}" onclick="setFilter('${c}', 'restaurants')">${c}</div>`
  ).join('');

  const restaurants = await API.getRestaurants();
  renderRestaurantGrid(grid, restaurants);
  document.getElementById('restaurant-count-2').textContent = `${restaurants.length} restaurants found`;
}

function renderRestaurantGrid(container, restaurants) {
  if (!restaurants.length) {
    container.innerHTML = `<div class="no-results" style="grid-column: 1/-1;">
      <div class="no-results-icon">🔍</div>
      <h3>No restaurants found</h3>
      <p style="margin-top: 8px;">Try a different search or cuisine filter</p>
    </div>`;
    return;
  }

  container.innerHTML = restaurants.map(r => `
    <div class="card restaurant-card" onclick="navigateTo('menu', { restaurantId: ${r.id} })" id="rest-card-${r.id}">
      <div class="restaurant-card-image-wrap">
        <img class="restaurant-card-image" src="${r.image}" alt="${r.name}" loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80'">
        ${r.promoted ? `<span class="badge-promoted">⭐ Promoted</span>` : ''}
        ${!r.isOpen ? `<div class="badge-closed">Closed</div>` : ''}
      </div>
      <div class="restaurant-card-body">
        <div class="restaurant-card-title">${r.name}</div>
        <div class="restaurant-card-meta">
          <span class="restaurant-card-cuisine">${r.cuisine}</span>
          <span class="rating-chip">⭐ ${r.rating}</span>
        </div>
        <div class="restaurant-card-info">
          <span>🕐 ${r.deliveryTime}</span>
          <span>📍 ${r.distance}</span>
          <span>Min ₹${r.minOrder}</span>
        </div>
        <div class="restaurant-card-tags">
          ${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

async function filterRestaurants() {
  const search1 = document.getElementById('restaurant-search')?.value.trim() || '';
  const search2 = document.getElementById('restaurant-search-2')?.value.trim() || '';
  const searchVal = search1 || search2;

  const restaurants = await API.getRestaurants(searchVal, activeFilter);

  if (currentPage === 'home') {
    const grid = document.getElementById('restaurant-grid-home');
    renderRestaurantGrid(grid, restaurants);
    document.getElementById('restaurant-count').textContent = `Showing ${restaurants.length} restaurants`;
  }

  if (currentPage === 'restaurants') {
    const grid = document.getElementById('restaurant-grid-2');
    renderRestaurantGrid(grid, restaurants);
    document.getElementById('restaurant-count-2').textContent = `${restaurants.length} restaurants found`;
  }
}

function setFilter(cuisine, page) {
  activeFilter = cuisine;
  const chips1 = document.querySelectorAll('#cuisine-chips .chip');
  const chips2 = document.querySelectorAll('#cuisine-chips-2 .chip');
  [...chips1, ...chips2].forEach(c => {
    c.classList.toggle('active', c.textContent === cuisine);
  });
  filterRestaurants();
}

// ==================== MENU PAGE ====================

async function loadMenuPage(restaurantId) {
  currentRestaurantId = restaurantId;

  const restaurant = await API.getRestaurant(restaurantId);
  if (!restaurant) { navigateTo('restaurants'); return; }

  cartRestaurantData = restaurant;

  // Set hero
  document.getElementById('menu-hero-img').src = restaurant.image;
  document.getElementById('menu-restaurant-name').textContent = restaurant.name;
  document.getElementById('menu-restaurant-meta').innerHTML = `
    <span>⭐ ${restaurant.rating}</span>
    <span>🕐 ${restaurant.deliveryTime}</span>
    <span>📍 ${restaurant.distance}</span>
    <span>🚴 Delivery ₹${restaurant.deliveryFee}</span>
  `;

  // Load menu items
  const container = document.getElementById('menu-items-container');
  container.innerHTML = '<div class="loader"></div>';
  const items = await API.getMenu(restaurantId);

  // Group by category
  const categories = {};
  items.forEach(item => {
    if (!categories[item.category]) categories[item.category] = [];
    categories[item.category].push(item);
  });

  container.innerHTML = Object.entries(categories).map(([cat, catItems]) => `
    <div class="menu-categories">
      <div class="menu-category-title">${cat}</div>
      ${catItems.map(item => renderMenuItem(item, restaurantId)).join('')}
    </div>
  `).join('');

  updateCartUI();
}

function renderMenuItem(item, restaurantId) {
  return `
    <div class="menu-item" id="menu-item-${item.id}">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span class="veg-icon ${item.veg ? 'veg' : 'non-veg'}"></span>
          ${item.bestseller ? `<span class="bestseller-badge">🔥 Bestseller</span>` : ''}
        </div>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-desc">${item.description}</div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
          <span class="menu-item-price">₹${item.price}</span>
          <div id="item-control-${item.id}">
            <button class="btn btn-outline btn-sm" onclick="addToCart(${restaurantId}, ${JSON.stringify(item).replace(/"/g, '&quot;')})">+ Add</button>
          </div>
        </div>
      </div>
      <img class="menu-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80'" loading="lazy">
    </div>
  `;
}

// ==================== CART ====================

function addToCart(restaurantId, item) {
  const added = Cart.addItem(restaurantId, item);
  if (added) {
    showToast('Added to cart!', 'success');
    updateCartUI();
    // Animate button
    const ctrl = document.getElementById('item-control-' + item.id);
    if (ctrl) updateItemControl(ctrl, item.id);
  }
}

function updateItemControl(ctrl, itemId) {
  const cart = Cart.get();
  const cartItem = cart.items.find(i => i.id === itemId);
  if (cartItem) {
    ctrl.innerHTML = `
      <div class="quantity-control">
        <button class="qty-btn" onclick="changeQty(${itemId}, -1)">−</button>
        <span class="qty-value" id="qty-${itemId}">${cartItem.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${itemId}, 1)">+</button>
      </div>`;
  } else {
    ctrl.innerHTML = `<button class="btn btn-outline btn-sm" onclick="addToCart(${currentRestaurantId}, /* re-fetch */)">+ Add</button>`;
  }
}

function changeQty(itemId, delta) {
  Cart.updateQuantity(itemId, delta);
  const cart = Cart.get();
  const item = cart.items.find(i => i.id === itemId);
  const ctrl = document.getElementById('item-control-' + itemId);
  if (item && ctrl) {
    document.getElementById('qty-' + itemId).textContent = item.quantity;
  } else if (ctrl) {
    // Item removed
    const menu = MENU_ITEMS[currentRestaurantId];
    const menuItem = menu ? menu.find(m => m.id === itemId) : null;
    if (menuItem) {
      ctrl.innerHTML = `<button class="btn btn-outline btn-sm" onclick="addToCart(${currentRestaurantId}, ${JSON.stringify(menuItem).replace(/"/g, '&quot;')})">+ Add</button>`;
    }
  }
  updateCartUI();
}

function clearCart() {
  if (confirm('Clear your cart?')) {
    Cart.clear();
    updateCartUI();
    // Reload menu to reset buttons
    if (currentRestaurantId) loadMenuPage(currentRestaurantId);
  }
}

function updateCartUI() {
  Cart.updateBadge();

  const cart = Cart.get();
  const itemsList = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');

  if (!itemsList) return;

  if (!cart.items.length) {
    itemsList.innerHTML = `<div class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <p>Your cart is empty</p>
      <p style="font-size: 0.82rem; margin-top: 4px;">Add items to get started</p>
    </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }

  const subtotal = Cart.getTotal();
  const deliveryFee = cartRestaurantData ? cartRestaurantData.deliveryFee : 30;
  const tax = Math.round(subtotal * 0.05);
  const grand = subtotal + deliveryFee + tax;

  itemsList.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <span class="veg-icon ${item.veg ? 'veg' : 'non-veg'}"></span>
      <span class="cart-item-name">${item.name}</span>
      <div class="quantity-control" style="transform: scale(0.85);">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-value">${item.quantity}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <span class="cart-item-price">₹${item.price * item.quantity}</span>
    </div>
  `).join('');

  if (footer) {
    footer.style.display = 'block';
    document.getElementById('cart-subtotal').textContent = '₹' + subtotal;
    document.getElementById('cart-delivery-fee').textContent = '₹' + deliveryFee;
    document.getElementById('cart-tax').textContent = '₹' + tax;
    document.getElementById('cart-grand-total').textContent = '₹' + grand;
  }
}

async function placeOrder() {
  const user = API.getCurrentUser();
  if (!user) {
    openAuth();
    showToast('Please sign in to place an order', 'info');
    return;
  }

  const cart = Cart.get();
  if (!cart.items.length) return;

  const btn = document.getElementById('place-order-btn');
  btn.textContent = 'Placing Order...';
  btn.disabled = true;

  try {
    const subtotal = Cart.getTotal();
    const deliveryFee = cartRestaurantData ? cartRestaurantData.deliveryFee : 30;
    const tax = Math.round(subtotal * 0.05);

    const orderData = {
      userId: user.id,
      restaurantId: cart.restaurantId,
      restaurantName: cartRestaurantData ? cartRestaurantData.name : 'Restaurant',
      items: cart.items,
      subtotal,
      deliveryFee,
      tax,
      grandTotal: subtotal + deliveryFee + tax,
      address: user.address || '123 Main Street, Mumbai, Maharashtra',
      paymentMethod: 'Online Payment'
    };

    const order = await API.placeOrder(orderData);
    Cart.clear();
    cartRestaurantData = null;
    currentOrderId = order.id;

    showToast('🎉 Order placed! Tracking live...', 'success');
    navigateTo('tracking', { orderId: order.id });
  } catch (e) {
    showToast('Failed to place order. Try again.', 'error');
  } finally {
    if (btn) { btn.textContent = 'Place Order 🚀'; btn.disabled = false; }
  }
}

function openCart() {
  if (currentPage !== 'menu') {
    // Navigate to menu if a restaurant is selected
    const cart = Cart.get();
    if (cart.restaurantId) {
      navigateTo('menu', { restaurantId: cart.restaurantId });
    } else {
      navigateTo('restaurants');
    }
  }
}

function toggleMobileCart() {
  const sidebar = document.getElementById('cart-sidebar-menu');
  if (sidebar) sidebar.classList.toggle('open');
}

// ==================== ORDER TRACKING ====================

async function loadTrackingPage(orderId) {
  currentOrderId = orderId;
  const container = document.getElementById('tracking-card');
  container.innerHTML = '<div class="loader"></div>';

  const order = await API.getOrder(orderId);
  if (!order) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 40px;">Order not found</p>';
    return;
  }

  renderTrackingCard(order);

  // Live updates
  window.addEventListener('orderStatusUpdate', (e) => {
    if (e.detail.orderId === orderId) {
      API.getOrder(orderId).then(o => { if (o) renderTrackingCard(o); });
    }
  });

  // Poll for updates
  const poller = setInterval(async () => {
    const updated = await API.getOrder(orderId);
    if (updated) {
      renderTrackingCard(updated);
      if (updated.status === 'delivered') clearInterval(poller);
    }
  }, 3000);
}

const STATUS_STEPS = [
  { key: 'placed',     icon: '📋', label: 'Order Placed',     color: '#3B82F6' },
  { key: 'confirmed',  icon: '✅', label: 'Confirmed',         color: '#8B5CF6' },
  { key: 'preparing',  icon: '👨‍🍳', label: 'Preparing',       color: '#F59E0B' },
  { key: 'picked_up',  icon: '🛵', label: 'Picked Up',         color: '#FF4500' },
  { key: 'on_the_way', icon: '🚴', label: 'On The Way',        color: '#FF4500' },
  { key: 'delivered',  icon: '🎉', label: 'Delivered',          color: '#22C55E' }
];

function renderTrackingCard(order) {
  const currentIdx = STATUS_STEPS.findIndex(s => s.key === order.status);
  const currentStep = STATUS_STEPS[currentIdx] || STATUS_STEPS[0];

  const estTime = new Date(order.estimatedDelivery);
  const minsLeft = Math.max(0, Math.round((estTime - Date.now()) / 60000));

  document.getElementById('tracking-card').innerHTML = `
    <div class="order-status-header">
      <div class="status-icon">${currentStep.icon}</div>
      <h2>${currentStep.label}</h2>
      <p style="color: var(--text-muted); margin-top: 6px;">${order.restaurantName} · Order #${order.id}</p>
      ${order.status !== 'delivered' ? `<p style="margin-top: 12px; font-weight: 700; color: var(--brand-primary);">⏱ ${minsLeft > 0 ? minsLeft + ' mins away' : 'Arriving any moment!'}</p>` : ''}
    </div>

    <div class="tracking-steps" id="tracking-steps-${order.id}">
      ${STATUS_STEPS.map((step, i) => {
        const isDone = i < currentIdx;
        const isActive = i === currentIdx;
        const historyItem = order.statusHistory.find(h => h.status === step.key);
        const time = historyItem ? new Date(historyItem.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '';
        return `
          <div class="tracking-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
            ${i < STATUS_STEPS.length - 1 ? `<div class="step-line"></div>` : ''}
            <div class="step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
              ${isDone ? '✓' : step.icon}
            </div>
            <div class="step-content">
              <div class="step-label" style="${isActive ? 'color: var(--brand-primary);' : isDone ? 'color: var(--success);' : 'color: var(--text-muted);'}">${step.label}</div>
              ${historyItem ? `<div class="step-message">${historyItem.message}</div><div class="step-time">${time}</div>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div style="margin-top: 32px; padding: 20px; background: var(--bg-muted); border-radius: var(--radius-md);">
      <h4 style="margin-bottom: 12px;">Order Summary</h4>
      ${order.items.map(i => `<div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;"><span>${i.name} × ${i.quantity}</span><span style="font-weight:600;">₹${i.price * i.quantity}</span></div>`).join('')}
      <div style="border-top: 1px solid var(--border); margin-top: 12px; padding-top: 12px; display:flex; justify-content:space-between; font-weight:800;">
        <span>Grand Total</span>
        <span style="color: var(--brand-primary);">₹${order.grandTotal}</span>
      </div>
    </div>

    <div style="margin-top: 16px; text-align: center;">
      <button class="btn btn-secondary" onclick="navigateTo('restaurants')" style="margin-right: 12px;">Order Again</button>
      <button class="btn btn-primary" onclick="navigateTo('home')">Back to Home</button>
    </div>
  `;
}

// ==================== ORDERS LIST ====================

async function loadOrdersPage() {
  const user = API.getCurrentUser();
  const container = document.getElementById('orders-list');

  if (!user) {
    container.innerHTML = `<div class="no-results">
      <div class="no-results-icon">🔒</div>
      <h3>Please Sign In</h3>
      <p style="margin-top: 8px;">Sign in to view your order history</p>
      <button class="btn btn-primary" style="margin-top: 20px;" onclick="openAuth()">Sign In</button>
    </div>`;
    return;
  }

  const orders = await API.getUserOrders();

  if (!orders.length) {
    container.innerHTML = `<div class="no-results">
      <div class="no-results-icon">📦</div>
      <h3>No orders yet</h3>
      <p style="margin-top: 8px;">Order something delicious!</p>
      <button class="btn btn-primary" style="margin-top: 20px;" onclick="navigateTo('restaurants')">Browse Restaurants</button>
    </div>`;
    return;
  }

  container.innerHTML = orders.map(order => {
    const statusColors = {
      placed: '#3B82F6', confirmed: '#8B5CF6', preparing: '#F59E0B',
      picked_up: '#FF4500', on_the_way: '#FF4500', delivered: '#22C55E', cancelled: '#EF4444'
    };
    const statusLabels = {
      placed: '📋 Placed', confirmed: '✅ Confirmed', preparing: '👨‍🍳 Preparing',
      picked_up: '🛵 Picked Up', on_the_way: '🚴 On the Way', delivered: '🎉 Delivered', cancelled: '❌ Cancelled'
    };
    const color = statusColors[order.status] || '#999';
    return `
      <div class="card" style="padding: 20px; margin-bottom: 16px; cursor: pointer;" onclick="navigateTo('tracking', { orderId: '${order.id}' })">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h3 style="margin-bottom: 4px;">${order.restaurantName}</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted);">Order #${order.id} · ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <span style="background: ${color}20; color: ${color}; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; white-space: nowrap;">${statusLabels[order.status] || order.status}</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">${order.items.map(i => `${i.name} ×${i.quantity}`).join(', ')}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: var(--brand-primary);">₹${order.grandTotal}</span>
          <span style="font-size: 0.82rem; color: var(--brand-primary); font-weight: 600;">Track Order →</span>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== AUTH ====================

function openAuth() {
  if (window.Clerk) {
    if (!window.Clerk.user) {
      window.Clerk.openSignIn();
    }
  }
}

function updateAuthButton() {
  if (!window.Clerk) return;
  const btn = document.getElementById('auth-btn');
  const userBtnContainer = document.getElementById('clerk-user-button');
  
  if (window.Clerk.user) {
    if (btn) btn.style.display = 'none';
    if (userBtnContainer) window.Clerk.mountUserButton(userBtnContainer);
  } else {
    if (btn) {
      btn.style.display = 'inline-flex';
      btn.textContent = 'Sign In';
      btn.onclick = () => window.Clerk.openSignIn();
    }
    if (userBtnContainer) userBtnContainer.innerHTML = '';
  }
}

// ==================== TOASTS ====================

function showToast(message, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slide-in-right 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==================== KEYBOARD / CLICK OUTSIDE ====================

document.getElementById('hero-search').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') doHeroSearch();
});

// ==================== RESPONSIVE MOBILE CART ====================

function checkMobileCart() {
  const btn = document.getElementById('mobile-cart-btn');
  if (window.innerWidth <= 1024 && currentPage === 'menu') {
    btn.style.display = 'flex';
  } else {
    btn.style.display = 'none';
  }
}

window.addEventListener('resize', checkMobileCart);

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Cart.updateBadge();
  updateAuthButton();
  loadHomeRestaurants();

  // Smooth navbar shadow on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
      navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
});
