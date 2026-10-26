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
  if (page === 'smartfinder') sfResetWizard();
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
          onerror="this.onerror=null;this.src='/images/food-placeholder.jpg'">
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
        onerror="this.onerror=null;this.src='/images/food-placeholder.jpg'" loading="lazy">
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

// ==================== COUPONS & DELIVERY PROMISE ====================
function isPromiseVoucherUnlocked() {
  return localStorage.getItem('fr_promise_unlocked') === 'true';
}

let activeCoupon = localStorage.getItem('fr_active_coupon') || null;
// Invalidate PROMISE50 if user does not actually have an unlocked voucher
if (activeCoupon === 'PROMISE50' && !isPromiseVoucherUnlocked()) {
  activeCoupon = null;
  localStorage.removeItem('fr_active_coupon');
}

function applyCoupon(customCode) {
  const input = document.getElementById('coupon-code-input');
  const code = (customCode || (input ? input.value : '') || '').trim().toUpperCase();
  if (!code) {
    showToast('Please enter a coupon code', 'info');
    return;
  }
  if (code === 'PROMISE50') {
    if (!isPromiseVoucherUnlocked()) {
      showToast('❌ Not eligible: PROMISE50 is strictly for customers whose delivery exceeded 30 minutes!', 'error');
      if (input) input.value = '';
      return;
    }
    activeCoupon = 'PROMISE50';
    localStorage.setItem('fr_active_coupon', 'PROMISE50');
    showToast('🎉 Delivery-Time Promise: 50% OFF applied!', 'success');
    updateCartUI();
  } else {
    showToast('Invalid coupon code. Only verified late-delivery vouchers are accepted.', 'error');
  }
}

function removeCoupon() {
  activeCoupon = null;
  localStorage.removeItem('fr_active_coupon');
  const input = document.getElementById('coupon-code-input');
  if (input) input.value = '';
  showToast('Coupon removed', 'info');
  updateCartUI();
}

async function claimLatePromise(orderId) {
  const order = await API.getOrder(orderId);
  if (!order) return;
  if (!order.isLate) {
    showToast('🔒 Voucher Locked: This order was delivered on time! The 50% discount only unlocks if delivery takes >30 mins.', 'info');
    return;
  }
  localStorage.setItem('fr_promise_unlocked', 'true');
  localStorage.setItem('fr_claimed_' + orderId, 'true');
  activeCoupon = 'PROMISE50';
  localStorage.setItem('fr_active_coupon', 'PROMISE50');
  showToast('🎉 50% OFF Promise Voucher Claimed! Code PROMISE50 is unlocked for your next order.', 'success');

  const btn = document.getElementById('claim-promise-btn-' + orderId);
  if (btn) {
    btn.textContent = '✅ 50% OFF Claimed · Code: PROMISE50';
    btn.className = 'btn btn-sm btn-primary';
    btn.disabled = true;
    btn.style.boxShadow = 'none';
  }
  updateCartUI();
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

  // Calculate 50% discount if PROMISE50 active and verified
  let discount = 0;
  if (activeCoupon === 'PROMISE50' && isPromiseVoucherUnlocked()) {
    discount = Math.round(subtotal * 0.5);
  } else if (activeCoupon === 'PROMISE50' && !isPromiseVoucherUnlocked()) {
    activeCoupon = null;
    localStorage.removeItem('fr_active_coupon');
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = Math.round(discountedSubtotal * 0.05);
  const grand = discountedSubtotal + deliveryFee + tax;

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

    // Handle discount row and coupon badge
    const discountRow = document.getElementById('cart-discount-row');
    const discountEl = document.getElementById('cart-discount');
    const couponPill = document.getElementById('coupon-applied-pill');
    const couponInput = document.getElementById('coupon-code-input');
    const hintEl = document.getElementById('coupon-status-hint');

    if (hintEl) {
      if (isPromiseVoucherUnlocked()) {
        hintEl.className = 'coupon-status-hint unlocked';
        hintEl.innerHTML = `<span>🎁 50% Voucher Unlocked! <a href="javascript:void(0)" onclick="applyCoupon('PROMISE50')" style="color:var(--brand-primary);font-weight:700;text-decoration:underline;margin-left:4px;">Apply Code</a></span>`;
      } else {
        hintEl.className = 'coupon-status-hint locked';
        hintEl.innerHTML = `<span>🔒 PROMISE50 locked (only available if an order exceeded 30 min)</span>`;
      }
    }

    if (activeCoupon === 'PROMISE50' && discount > 0) {
      if (discountRow) discountRow.style.display = 'flex';
      if (discountEl) discountEl.textContent = '-₹' + discount;
      if (couponPill) couponPill.style.display = 'flex';
      if (couponInput) couponInput.value = 'PROMISE50';
    } else {
      if (discountRow) discountRow.style.display = 'none';
      if (couponPill) couponPill.style.display = 'none';
    }

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
    const discount = activeCoupon === 'PROMISE50' ? Math.round(subtotal * 0.5) : 0;
    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = Math.round(discountedSubtotal * 0.05);

    const orderData = {
      userId: user.id,
      restaurantId: cart.restaurantId,
      restaurantName: cartRestaurantData ? cartRestaurantData.name : 'Restaurant',
      items: cart.items,
      subtotal,
      discount,
      coupon: activeCoupon || null,
      deliveryFee,
      tax,
      grandTotal: discountedSubtotal + deliveryFee + tax,
      address: user.address || '123 Main Street, Mumbai, Maharashtra',
      paymentMethod: 'Online Payment'
    };

    const order = await API.placeOrder(orderData);
    Cart.clear();
    cartRestaurantData = null;
    currentOrderId = order.id;

    // Clear coupon and consume unlocked late promise voucher after using it
    if (activeCoupon) {
      if (activeCoupon === 'PROMISE50') {
        localStorage.removeItem('fr_promise_unlocked');
      }
      activeCoupon = null;
      localStorage.removeItem('fr_active_coupon');
    }

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
  const isLate = !!order.isLate;
  const isClaimed = localStorage.getItem('fr_claimed_' + order.id) === 'true';

  // Realistic ETA text based on delay status & progress stage
  let etaText = '';
  if (isLate) {
    if (order.status === 'on_the_way') {
      etaText = '⚠️ Heavy traffic delay: 12–15 mins away (ETA >30 min SLA breach)';
    } else if (order.status === 'picked_up') {
      etaText = '⚠️ Slow transit: ~18 mins away (Exceeding 30 min promise)';
    } else if (order.status === 'preparing') {
      etaText = '⚠️ High kitchen rush: Delayed ~24 mins';
    } else if (order.status === 'confirmed') {
      etaText = '⏱ 26–30 mins away (Peak hour rush)';
    } else if (order.status === 'placed') {
      etaText = '⏱ 32–36 mins away (Delay expected)';
    } else if (order.status === 'delivered') {
      etaText = '🚨 Delivered Late (34 mins) — 30-Min Promise Breached!';
    }
  } else {
    if (order.status === 'on_the_way') {
      etaText = '⏱ 6–8 mins away';
    } else if (order.status === 'picked_up') {
      etaText = '⏱ 10–12 mins away';
    } else if (order.status === 'preparing') {
      etaText = '⏱ 14–16 mins away';
    } else if (order.status === 'confirmed') {
      etaText = '⏱ 18–20 mins away';
    } else if (order.status === 'placed') {
      etaText = '⏱ 20–24 mins away';
    } else if (order.status === 'delivered') {
      etaText = '🎉 Delivered On-Time in 21 mins! Promise SLA Met.';
    }
  }

  document.getElementById('tracking-card').innerHTML = `
    <div class="order-status-header">
      <div class="status-icon">${currentStep.icon}</div>
      <h2>${currentStep.label}</h2>
      <p style="color: var(--text-muted); margin-top: 6px;">${order.restaurantName} · Order #${order.id}</p>
      ${order.status !== 'delivered' ? `<p style="margin-top: 12px; font-weight: 700; color: ${isLate ? '#e03131' : 'var(--brand-primary)'};">${etaText}</p>` : `<p style="margin-top: 12px; font-weight: 700; color: ${isLate ? '#e03131' : 'var(--success)'};">${etaText}</p>`}
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

    <!-- Delivery-Time Promise Assurance Card -->
    <div class="promise-tracking-card ${isLate ? 'late' : 'ontime'}">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.8rem;">${isLate ? '🚨' : '⏱️'}</span>
          <div>
            <div style="font-weight: 800; font-size: 0.95rem; color: ${isLate ? '#e03131' : 'var(--brand-primary)'};">
              Savora Delivery-Time Promise ${isLate ? '(SLA Breached)' : '(Guarantee Active)'}
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Guaranteed arrival under 30 minutes, or enjoy 50% OFF your next order!
            </div>
          </div>
        </div>
        <span style="padding: 4px 10px; border-radius: 20px; font-size: 0.76rem; font-weight: 700; background: ${isLate ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)'}; color: ${isLate ? '#ef4444' : 'var(--success)'};">
          ${isLate ? '⚠️ Delayed (>30 Min)' : '🟢 On-Time Guarantee (<30 Min)'}
        </span>
      </div>

      <div style="border-top: 1px dashed rgba(232,89,12,0.25); padding-top: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="font-size: 0.82rem; color: var(--text-secondary); max-width: 420px;">
          ${isLate 
            ? '<strong>Promise SLA Breached!</strong> Your delivery exceeded 30 mins. You are eligible to claim a 50% OFF voucher for your next order.' 
            : '<strong>On-Time Guarantee:</strong> Your order is safely within the 30-min window. The 50% voucher remains locked.'}
        </div>
        <div>
          ${isLate 
            ? (isClaimed
                ? `<button class="btn btn-sm btn-primary" disabled style="background: #22c55e; border-color: #22c55e; font-size: 0.8rem;">✅ 50% OFF Claimed · Code: PROMISE50</button>`
                : `<button id="claim-promise-btn-${order.id}" class="btn btn-sm btn-primary pulse-claim-btn" style="font-size: 0.82rem; font-weight: 700; background: linear-gradient(135deg, #e8590c, #f76707);" onclick="claimLatePromise('${order.id}')">🎁 Claim 50% OFF Late Voucher</button>`)
            : `<button class="btn btn-sm btn-outline" style="font-size: 0.8rem; opacity: 0.7; cursor: not-allowed; border-color: var(--border); color: var(--text-muted);" onclick="showToast('🔒 Voucher Locked: This order is on time! Voucher unlocks only if delivery exceeds 30 minutes.', 'info')">🔒 50% Voucher Locked (On-Time)</button>`
          }
        </div>
      </div>

      <!-- Simulation Testing Controls -->
      <div class="sim-controls-bar">
        <span style="font-size: 0.78rem; color: var(--text-muted);">
          🎲 <strong>Test Simulation:</strong> ${isLate ? '<span style="color:#e03131; font-weight:700;">Randomly Set to LATE (>30m)</span>' : '<span style="color:#2f9e44; font-weight:700;">Randomly Set to ON-TIME (<30m)</span>'}
        </span>
        <div style="display: flex; gap: 6px;">
          <button class="btn btn-sm btn-outline" style="font-size: 0.74rem; padding: 4px 10px;" onclick="toggleDelayTest('${order.id}')">
            ⇄ Toggle Late / On-Time
          </button>
          ${order.status !== 'delivered' ? `<button class="btn btn-sm btn-outline" style="font-size: 0.74rem; padding: 4px 10px;" onclick="instantDeliverTest('${order.id}')">⚡ Fast-Forward Delivered</button>` : ''}
        </div>
      </div>
    </div>

    <div style="margin-top: 24px; padding: 20px; background: var(--bg-muted); border-radius: var(--radius-md);">
      <h4 style="margin-bottom: 12px;">Order Summary</h4>
      ${order.items.map(i => `<div style="display:flex; justify-content:space-between; font-size:0.88rem; margin-bottom:6px;"><span>${i.name} × ${i.quantity}</span><span style="font-weight:600;">₹${i.price * i.quantity}</span></div>`).join('')}
      ${order.discount ? `<div style="display:flex; justify-content:space-between; font-size:0.88rem; color:var(--success); margin-bottom:6px; font-weight:700;"><span>🏷️ 50% Promise Discount</span><span>-₹${order.discount}</span></div>` : ''}
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

function toggleDelayTest(orderId) {
  API.toggleOrderDelay(orderId);
  API.getOrder(orderId).then(o => {
    if (o) {
      renderTrackingCard(o);
      showToast(o.isLate ? '⚠️ Switched to LATE delivery simulation (>30 min)' : '🟢 Switched to ON-TIME delivery (<30 min)', 'info');
      updateCartUI();
    }
  });
}

function instantDeliverTest(orderId) {
  API.instantDeliver(orderId);
  API.getOrder(orderId).then(o => {
    if (o) {
      renderTrackingCard(o);
      showToast('⚡ Order fast-forwarded to Delivered!', 'success');
      updateCartUI();
    }
  });
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
    const isLate = !!order.isLate;
    const isClaimed = localStorage.getItem('fr_claimed_' + order.id) === 'true';

    return `
      <div class="card" style="padding: 20px; margin-bottom: 16px; cursor: pointer;" onclick="navigateTo('tracking', { orderId: '${order.id}' })">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
          <div>
            <h3 style="margin-bottom: 4px;">${order.restaurantName}</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted);">Order #${order.id} · ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            ${isLate 
              ? `<span style="background: rgba(239, 68, 68, 0.15); color: #ef4444; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;">🚨 Delayed (>30m) ${isClaimed ? '· 50% Claimed' : '· 50% Eligible'}</span>` 
              : `<span style="background: rgba(34, 197, 94, 0.15); color: #22c55e; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;">🟢 On-Time (21m)</span>`
            }
            <span style="background: ${color}20; color: ${color}; padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: 700; white-space: nowrap;">${statusLabels[order.status] || order.status}</span>
          </div>
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

// ==================== SMART FINDER ====================

// State
const SF = {
  budget: null,
  mood: null,
  hunger: null,
  diet: null,
  time: null,
  results: [],
  currentSort: 'score'
};

/** Called when user clicks an option tile */
function sfSelect(el) {
  const group = el.dataset.group;
  const val = el.dataset.value;

  // Deselect siblings
  document.querySelectorAll(`.sf-option[data-group="${group}"]`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');

  SF[group] = group === 'budget' || group === 'time' ? Number(val) : val;

  // Enable next button for this step
  const stepMap = { budget: 1, mood: 2, hunger: 3, diet: 4, time: 5 };
  const step = stepMap[group];
  const btn = document.getElementById(`sf-btn-${step}-next`);
  if (btn) btn.disabled = false;
}

function sfNext(toStep) {
  sfGoTo(toStep);
}

function sfPrev(toStep) {
  sfGoTo(toStep);
}

function sfGoTo(step) {
  // Update step dots & lines
  document.querySelectorAll('.sf-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.sf-step-dot').forEach(d => {
    const ds = Number(d.dataset.step);
    d.classList.remove('active', 'done');
    if (ds < step) d.classList.add('done');
    if (ds === step) d.classList.add('active');
  });
  document.querySelectorAll('.sf-step-line').forEach((line, i) => {
    line.classList.toggle('done', i + 1 < step);
  });

  const target = document.getElementById(`sf-step-${step}`);
  if (target) {
    target.classList.add('active');
    // Scroll wizard into view smoothly
    target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/** Main recommendation engine */
function sfFindMeals() {
  const btn = document.getElementById('sf-btn-5-next');
  btn.textContent = '🔍 Searching...';
  btn.disabled = true;

  setTimeout(() => {
    const results = sfComputeRecommendations();
    SF.results = results;
    SF.currentSort = 'score';
    sfShowResults(results);
    btn.textContent = '✨ Find My Meals';
    btn.disabled = false;
  }, 900);
}

/** Scoring & filtering logic */
function sfComputeRecommendations() {
  const { budget, mood, hunger, diet, time } = SF;

  // --- Mood → cuisine / tag affinity ---
  const moodMap = {
    comfort: {
      cuisines: ['Indian', 'South Indian', 'American', 'Korean', 'Middle Eastern'],
      tags: ['Biryani', 'Curry', 'Burgers', 'Fried Chicken', 'Kebabs'],
      keywords: ['rich', 'creamy', 'butter', 'ghee', 'double', 'slow-cooked', 'hearty', 'classic']
    },
    spicy: {
      cuisines: ['Indian', 'South Indian', 'Mexican', 'Korean', 'Middle Eastern'],
      tags: ['Biryani', 'Curry', 'Tacos', 'K-Food'],
      keywords: ['spicy', 'chili', 'fiery', 'gochujang', 'chipotle', 'sriracha', 'podi', 'chilli', 'pepper', 'masala', 'jalap']
    },
    light: {
      cuisines: ['Healthy', 'Japanese', 'French', 'Middle Eastern'],
      tags: ['Salads', 'Bowls', 'Smoothies', 'Sushi'],
      keywords: ['salad', 'fresh', 'light', 'bowl', 'quinoa', 'acai', 'edamame', 'steamed', 'greek', 'smoothie']
    },
    treat: {
      cuisines: ['Desserts', 'Japanese', 'French', 'Italian'],
      tags: ['Waffles', 'Gelato', 'Sushi', 'Croissants'],
      keywords: ['waffle', 'gelato', 'chocolate', 'truffle', 'premium', 'artisan', 'brulee', 'salmon', 'nutella', 'crepe', 'caramel']
    }
  };

  // --- Hunger → price range multiplier ---
  const hungerPriceMultiplier = { snack: 0.65, regular: 1.0, extra: 1.4 };
  const effectiveBudget = budget * hungerPriceMultiplier[hunger];

  // Hunger → prefer items with lower/higher base price
  const hungerPriceRange = {
    snack: { min: 0, max: 180 },
    regular: { min: 100, max: 350 },
    extra: { min: 200, max: 9999 }
  };

  const affinities = moodMap[mood] || moodMap.comfort;
  const scored = [];

  // Iterate all restaurants & their items
  for (const restaurant of RESTAURANTS) {
    if (!restaurant.isOpen) continue;

    // Time filter: parse delivery time upper bound
    const deliveryTimeMax = parseDeliveryTimeMax(restaurant.deliveryTime);
    if (deliveryTimeMax > time) continue;

    const menuItems = MENU_ITEMS[restaurant.id] || [];

    for (const item of menuItems) {
      // Diet filter
      if (diet === 'veg' && !item.veg) continue;
      if (diet === 'nonveg' && item.veg) continue;
      if (diet === 'healthy') {
        // Allow veg items + items from Healthy/Japanese cuisine
        if (!item.veg && !['Healthy', 'Japanese', 'French'].includes(restaurant.cuisine)) continue;
      }

      // Budget filter (item price + delivery fee must fit)
      const totalCost = item.price + restaurant.deliveryFee;
      if (totalCost > budget * 1.1) continue; // 10% tolerance

      // Hunger range filter
      const { min, max } = hungerPriceRange[hunger];
      if (item.price < min * 0.7 || item.price > max * 1.3) continue;

      // === Scoring ===
      let score = 0;

      // 1. Mood-cuisine match (0-25 pts)
      if (affinities.cuisines.includes(restaurant.cuisine)) score += 25;

      // 2. Mood-tag match (0-20 pts)
      const tagMatches = restaurant.tags.filter(t => affinities.tags.includes(t)).length;
      score += tagMatches * 8;

      // 3. Keyword match in item name + description (0-20 pts)
      const combinedText = (item.name + ' ' + item.description).toLowerCase();
      const kwMatches = affinities.keywords.filter(k => combinedText.includes(k)).length;
      score += Math.min(kwMatches * 7, 20);

      // 4. Rating bonus (0-15 pts)
      score += (restaurant.rating - 3.5) * 10;

      // 5. Bestseller bonus (0-8 pts)
      if (item.bestseller) score += 8;

      // 6. Budget efficiency: how well item fits budget (0-12 pts)
      const budgetUtilization = item.price / effectiveBudget;
      const efficiency = 1 - Math.abs(budgetUtilization - 0.8); // peak at 80% utilization
      score += Math.max(0, efficiency * 12);

      // 7. Delivery speed bonus (0-10 pts, faster = more pts)
      score += Math.max(0, (60 - deliveryTimeMax) / 5);

      // 8. Veg affinity when healthy selected
      if (diet === 'healthy' && item.veg) score += 6;

      // Collect match reasons
      const reasons = [];
      if (affinities.cuisines.includes(restaurant.cuisine)) reasons.push(restaurant.cuisine + ' cuisine');
      if (item.bestseller) reasons.push('Bestseller');
      if (item.veg) reasons.push('Vegetarian');
      if (kwMatches > 0) reasons.push(mood.charAt(0).toUpperCase() + mood.slice(1) + ' mood');
      if (deliveryTimeMax <= 20) reasons.push('Super fast delivery');
      if (item.rating >= 4.8) reasons.push('Highly rated');

      scored.push({
        item,
        restaurant,
        score: Math.round(score),
        totalCost: item.price + restaurant.deliveryFee,
        deliveryTimeMax,
        reasons
      });
    }
  }

  // Sort by score descending, deduplicate restaurant (keep best item per restaurant)
  scored.sort((a, b) => b.score - a.score);

  // Keep top-2 items per restaurant to allow variety
  const perRestaurant = {};
  const filtered = [];
  for (const entry of scored) {
    const rid = entry.restaurant.id;
    if (!perRestaurant[rid]) perRestaurant[rid] = 0;
    if (perRestaurant[rid] < 2) {
      filtered.push(entry);
      perRestaurant[rid]++;
    }
    if (filtered.length >= 18) break;
  }

  return filtered.slice(0, 12);
}

function parseDeliveryTimeMax(str) {
  // "18-24 min" → 24
  const match = str.match(/(\d+)\s*min/g);
  if (!match) return 30;
  const nums = match.map(m => parseInt(m));
  return Math.max(...nums);
}

function sfShowResults(results) {
  // Hide wizard, show results
  document.getElementById('sf-wizard-wrap').style.display = 'none';
  const section = document.getElementById('sf-results-section');
  section.style.display = 'block';

  // Summary tags
  const summaryLabels = {
    budget: { 100: '₹100 budget', 200: '₹200 budget', 300: '₹300 budget', 500: '₹500+ budget' },
    mood: { comfort: '🤗 Comfort food', spicy: '🌶️ Spicy & Bold', light: '🥗 Light & Fresh', treat: '🎂 Treat yourself' },
    hunger: { snack: '🥨 Snack-sized', regular: '🍽️ Regular meal', extra: '🦁 Extra hungry' },
    diet: { any: '🍴 No restriction', veg: '🥦 Vegetarian', nonveg: '🍗 Non-veg', healthy: '💪 Healthy & Clean' },
    time: { 15: '⚡ Under 15 min', 25: '🕐 Under 25 min', 60: '😌 No rush' }
  };

  const pill = document.getElementById('sf-summary-pill');
  pill.innerHTML = ['budget', 'mood', 'hunger', 'diet', 'time'].map(k => {
    const val = SF[k];
    const label = summaryLabels[k][val] || val;
    return `<span class="sf-summary-tag">${label}</span>`;
  }).join('');

  document.getElementById('sf-results-title').textContent = results.length
    ? `🎯 ${results.length} Meal${results.length > 1 ? 's' : ''} Found For You`
    : '😕 No Meals Found';
  document.getElementById('sf-results-subtitle').textContent = results.length
    ? `Ranked by match score · budget ₹${SF.budget} · ${Object.values({ mood: SF.mood, hunger: SF.hunger }).join(', ')}`
    : 'Try relaxing your filters (higher budget or more time)';

  sfRenderGrid(results);
}

function sfRenderGrid(results) {
  const grid = document.getElementById('sf-results-grid');

  if (!results.length) {
    grid.innerHTML = `
      <div class="sf-no-results">
        <div class="sf-no-results-icon">🔍</div>
        <h3>No meals match your criteria</h3>
        <p style="margin-top: 8px;">Try increasing your budget, selecting "No Rush" for time, or a different diet.</p>
        <button class="btn btn-primary" style="margin-top: 20px;" onclick="sfReset()">🔄 Try Again</button>
      </div>`;
    return;
  }

  const maxScore = Math.max(...results.map(r => r.score));

  grid.innerHTML = results.map((entry, idx) => {
    const { item, restaurant, score, totalCost, deliveryTimeMax, reasons } = entry;
    const scorePercent = Math.round((score / maxScore) * 100);
    const isTop = idx === 0;
    const vegIcon = item.veg
      ? `<span class="veg-icon veg" style="flex-shrink:0;"></span>`
      : `<span class="veg-icon non-veg" style="flex-shrink:0;"></span>`;

    const reasonTags = reasons.slice(0, 3).map(r =>
      `<span class="sf-match-tag">✓ ${r}</span>`
    ).join('');

    return `
      <div class="sf-meal-card ${isTop ? 'rank-1' : ''}"
           onclick="navigateTo('menu', { restaurantId: ${restaurant.id} })"
           id="sf-card-${restaurant.id}-${item.id}">
        <div class="sf-card-img-wrap">
          <img class="sf-card-img" src="${item.image}" alt="${item.name}"
            onerror="this.onerror=null;this.src='/images/food-placeholder.jpg'" loading="lazy">
          <div class="sf-card-score-badge">
            <span>⭐ ${(score / 10).toFixed(1)}</span>
            <div class="sf-card-score-bar">
              <div class="sf-card-score-fill" style="width:${scorePercent}%"></div>
            </div>
          </div>
        </div>
        <div class="sf-card-body">
          <div class="sf-card-restaurant">
            ${vegIcon}
            <span class="sf-card-restaurant-name">${restaurant.name}</span>
            <span class="rating-chip" style="font-size:0.72rem; padding: 2px 7px;">⭐ ${restaurant.rating}</span>
          </div>
          <div class="sf-card-item-name">${item.name}</div>
          <div class="sf-card-desc">${item.description}</div>
          <div class="sf-match-tags">${reasonTags}</div>
          <div class="sf-card-meta">
            <span>🕐 ${restaurant.deliveryTime}</span>
            <span>📍 ${restaurant.distance}</span>
            <span>🚴 +₹${restaurant.deliveryFee} delivery</span>
          </div>
          <div class="sf-card-footer">
            <div>
              <div class="sf-card-price">₹${item.price}</div>
              <div class="sf-card-total-label">+₹${restaurant.deliveryFee} delivery · ₹${totalCost} total</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); sfQuickAdd(${restaurant.id}, ${JSON.stringify(item).replace(/"/g, '&quot;')})">
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function sfSort(by) {
  SF.currentSort = by;

  // Update sort button UI
  ['score', 'price', 'time', 'rating'].forEach(k => {
    const btn = document.getElementById(`sf-sort-${k}`);
    if (btn) btn.classList.toggle('active', k === by);
  });

  const sorted = [...SF.results].sort((a, b) => {
    if (by === 'score') return b.score - a.score;
    if (by === 'price') return a.totalCost - b.totalCost;
    if (by === 'time') return a.deliveryTimeMax - b.deliveryTimeMax;
    if (by === 'rating') return b.restaurant.rating - a.restaurant.rating;
    return 0;
  });

  sfRenderGrid(sorted);
}

/** Quick add to cart from result card */
function sfQuickAdd(restaurantId, item) {
  const added = Cart.addItem(restaurantId, item);
  if (added) {
    showToast(`🛒 ${item.name} added to cart!`, 'success');
    updateCartUI();
  }
}

function sfReset() {
  // Clear state
  SF.budget = null; SF.mood = null; SF.hunger = null; SF.diet = null; SF.time = null;
  SF.results = []; SF.currentSort = 'score';
  sfResetWizard();
}

function sfResetWizard() {
  // Show wizard, hide results
  const wrap = document.getElementById('sf-wizard-wrap');
  const results = document.getElementById('sf-results-section');
  if (wrap) wrap.style.display = 'block';
  if (results) results.style.display = 'none';

  // Reset all option selections
  document.querySelectorAll('.sf-option').forEach(o => o.classList.remove('selected'));

  // Disable all next buttons
  [1,2,3,4,5].forEach(i => {
    const btn = document.getElementById(`sf-btn-${i}-next`);
    if (btn) btn.disabled = true;
  });

  // Reset sort buttons
  document.querySelectorAll('.sf-sort-btn').forEach(b => b.classList.remove('active'));
  const defSort = document.getElementById('sf-sort-score');
  if (defSort) defSort.classList.add('active');

  // Go to step 1
  sfGoTo(1);
}

