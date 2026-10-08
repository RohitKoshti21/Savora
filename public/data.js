// ==================== SAVORA MOCK DATA ====================

const RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "Indian", rating: 4.8,
    deliveryTime: "25-35 min", minOrder: 150, deliveryFee: 30,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    tags: ["Biryani", "Curry", "North Indian"], isOpen: true, distance: "1.2 km", promoted: true,
    description: "Authentic flavors from the heart of North India. Our master chefs bring you traditional recipes with a modern twist."
  },
  {
    id: 2, name: "Dragon Wok", cuisine: "Chinese", rating: 4.5,
    deliveryTime: "30-40 min", minOrder: 200, deliveryFee: 40,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80",
    tags: ["Noodles", "Dim Sum", "Fried Rice"], isOpen: true, distance: "2.1 km", promoted: false,
    description: "Authentic Chinese cuisine with bold flavors and fresh ingredients wok-tossed to perfection."
  },
  {
    id: 3, name: "Burger Republic", cuisine: "American", rating: 4.6,
    deliveryTime: "20-30 min", minOrder: 120, deliveryFee: 25,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    tags: ["Burgers", "Fries", "Shakes"], isOpen: true, distance: "0.8 km", promoted: true,
    description: "Premium smash burgers with house-ground beef, artisan buns and secret sauce. Voted #1 burger joint 2024."
  },
  {
    id: 4, name: "Pizza Palazzo", cuisine: "Italian", rating: 4.7,
    deliveryTime: "35-45 min", minOrder: 250, deliveryFee: 35,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    tags: ["Pizza", "Pasta", "Garlic Bread"], isOpen: true, distance: "1.8 km", promoted: false,
    description: "Stone-baked artisan pizzas with imported Italian ingredients. Our dough ferments for 72 hours for the perfect crust."
  },
  {
    id: 5, name: "Sushi Sakura", cuisine: "Japanese", rating: 4.9,
    deliveryTime: "40-50 min", minOrder: 300, deliveryFee: 50,
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80",
    tags: ["Sushi", "Ramen", "Tempura"], isOpen: false, distance: "3.5 km", promoted: false,
    description: "Premium Japanese cuisine crafted by a Michelin-starred chef. Only the freshest ingredients sourced daily."
  },
  {
    id: 6, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.4,
    deliveryTime: "25-35 min", minOrder: 180, deliveryFee: 30,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80",
    tags: ["Tacos", "Burritos", "Nachos"], isOpen: true, distance: "1.5 km", promoted: false,
    description: "Vibrant Mexican street food with bold spices, fresh salsas and handmade tortillas every single day."
  },
  {
    id: 7, name: "The Kebab Corner", cuisine: "Middle Eastern", rating: 4.3,
    deliveryTime: "20-30 min", minOrder: 200, deliveryFee: 25,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    tags: ["Kebabs", "Shawarma", "Hummus"], isOpen: true, distance: "1.0 km", promoted: false,
    description: "Flame-grilled kebabs and authentic Middle Eastern flavors, marinated overnight for maximum taste."
  },
  {
    id: 8, name: "Green Bowl", cuisine: "Healthy", rating: 4.6,
    deliveryTime: "15-25 min", minOrder: 180, deliveryFee: 20,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    tags: ["Salads", "Bowls", "Smoothies"], isOpen: true, distance: "0.5 km", promoted: true,
    description: "Nutritious and delicious power bowls, smoothies, and salads. Fuel your body the right way."
  }
];

const MENU_ITEMS = {
  1: [
    { id: 101, name: "Chicken Biryani", price: 280, description: "Aromatic basmati rice with tender chicken, saffron & caramelized onions", category: "Main Course", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03246963d651?w=400&q=80", bestseller: true, rating: 4.9 },
    { id: 102, name: "Paneer Butter Masala", price: 220, description: "Creamy tomato-based curry with soft paneer cubes, butter & cream", category: "Main Course", veg: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", bestseller: true, rating: 4.8 },
    { id: 103, name: "Dal Makhani", price: 180, description: "Slow-cooked black lentils in rich butter & cream gravy, 24hrs preparation", category: "Main Course", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", bestseller: false, rating: 4.6 },
    { id: 104, name: "Garlic Naan", price: 60, description: "Freshly baked flatbread with garlic butter & fresh herbs", category: "Bread", veg: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80", bestseller: false, rating: 4.5 },
    { id: 105, name: "Mango Lassi", price: 80, description: "Thick refreshing yogurt drink with Alphonso mango", category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=400&q=80", bestseller: false, rating: 4.7 },
    { id: 106, name: "Seekh Kebab", price: 240, description: "Minced lamb kebabs with spices grilled on charcoal", category: "Starters", veg: false, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", bestseller: true, rating: 4.8 }
  ],
  2: [
    { id: 201, name: "Kung Pao Chicken", price: 280, description: "Spicy stir-fried chicken with peanuts, dried chillies & Sichuan sauce", category: "Main Course", veg: false, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80", bestseller: true, rating: 4.7 },
    { id: 202, name: "Veg Fried Rice", price: 200, description: "Wok-tossed fluffy rice with fresh seasonal vegetables & soy sauce", category: "Rice", veg: true, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", bestseller: false, rating: 4.4 },
    { id: 203, name: "Hakka Noodles", price: 180, description: "Stir-fried noodles with vegetables & aromatic Chinese spices", category: "Noodles", veg: true, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", bestseller: false, rating: 4.3 },
    { id: 204, name: "Dim Sum Basket", price: 250, description: "6-piece steamed dumplings with ginger-soy dipping sauce", category: "Starters", veg: false, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&q=80", bestseller: true, rating: 4.8 }
  ],
  3: [
    { id: 301, name: "Classic Smash Burger", price: 320, description: "Double smash patty, special sauce, pickles, American cheese on brioche bun", category: "Burgers", veg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80", bestseller: true, rating: 4.9 },
    { id: 302, name: "Crispy Veggie Burger", price: 220, description: "Crispy chickpea patty, avocado, lettuce, tomato & house sauce", category: "Burgers", veg: true, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&q=80", bestseller: false, rating: 4.5 },
    { id: 303, name: "Loaded Cheese Fries", price: 150, description: "Crispy fries loaded with cheddar sauce, jalapeños & spring onion", category: "Sides", veg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80", bestseller: true, rating: 4.7 },
    { id: 304, name: "Chocolate Shake", price: 180, description: "Thick Belgian chocolate milkshake with whipped cream", category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80", bestseller: false, rating: 4.6 }
  ],
  4: [
    { id: 401, name: "Margherita Pizza", price: 350, description: "San Marzano tomatoes, fresh mozzarella, basil on 72hr fermented dough", category: "Pizza", veg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", bestseller: false, rating: 4.7 },
    { id: 402, name: "BBQ Chicken Pizza", price: 450, description: "Smoky BBQ sauce, grilled chicken, red onion, mozzarella & coriander", category: "Pizza", veg: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", bestseller: true, rating: 4.8 },
    { id: 403, name: "Pasta Arrabiata", price: 280, description: "Penne in fiery tomato & garlic sauce with fresh basil", category: "Pasta", veg: true, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80", bestseller: false, rating: 4.5 },
    { id: 404, name: "Garlic Bread", price: 120, description: "Toasted ciabatta with roasted garlic butter & herbs", category: "Sides", veg: true, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&q=80", bestseller: false, rating: 4.4 }
  ],
  5: [
    { id: 501, name: "Salmon Nigiri (6pc)", price: 650, description: "Premium Norwegian salmon over hand-pressed sushi rice with wasabi", category: "Sushi", veg: false, image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80", bestseller: true, rating: 4.9 },
    { id: 502, name: "Tonkotsu Ramen", price: 480, description: "12-hour slow-boiled pork bone broth with chashu, soft-boiled egg & noodles", category: "Ramen", veg: false, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", bestseller: true, rating: 4.8 },
    { id: 503, name: "Vegetable Tempura", price: 380, description: "Lightly battered seasonal vegetables, tentsuyu dipping sauce", category: "Starters", veg: true, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&q=80", bestseller: false, rating: 4.6 }
  ],
  6: [
    { id: 601, name: "Chicken Tacos (3pc)", price: 260, description: "Grilled chipotle chicken, pico de gallo, avocado crema in corn tortillas", category: "Tacos", veg: false, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80", bestseller: true, rating: 4.8 },
    { id: 602, name: "Veg Burrito", price: 220, description: "Loaded with black beans, rice, roasted peppers, guac & sour cream", category: "Burritos", veg: true, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80", bestseller: false, rating: 4.4 },
    { id: 603, name: "Nachos Supreme", price: 200, description: "Crispy tortilla chips with house guacamole, sour cream & fresh salsa", category: "Starters", veg: true, image: "https://images.unsplash.com/photo-1574894709920-11b28be1368c?w=400&q=80", bestseller: false, rating: 4.5 }
  ],
  7: [
    { id: 701, name: "Mixed Grill Platter", price: 480, description: "Selection of chicken, lamb & beef kebabs with pita & mezze", category: "Main Course", veg: false, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80", bestseller: true, rating: 4.8 },
    { id: 702, name: "Chicken Shawarma Wrap", price: 220, description: "Slow-roasted chicken with garlic sauce, pickles in warm pita", category: "Wraps", veg: false, image: "https://images.unsplash.com/photo-1561626423-a51b45aef0a1?w=400&q=80", bestseller: true, rating: 4.7 },
    { id: 703, name: "Hummus Plate", price: 160, description: "Smooth hummus with olive oil, pine nuts & warm pita", category: "Starters", veg: true, image: "https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?w=400&q=80", bestseller: false, rating: 4.5 }
  ],
  8: [
    { id: 801, name: "Buddha Bowl", price: 280, description: "Quinoa, roasted veggies, edamame, avocado, tahini dressing", category: "Bowls", veg: true, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", bestseller: true, rating: 4.8 },
    { id: 802, name: "Acai Smoothie Bowl", price: 220, description: "Thick acai base with granola, fresh berries & honey drizzle", category: "Bowls", veg: true, image: "https://images.unsplash.com/photo-1591543869747-95f71d0afeaa?w=400&q=80", bestseller: true, rating: 4.7 },
    { id: 803, name: "Greek Salad", price: 180, description: "Fresh cucumbers, tomatoes, olives, feta & lemon herb dressing", category: "Salads", veg: true, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80", bestseller: false, rating: 4.5 }
  ]
};

const CUISINES = ["All", "Indian", "Chinese", "American", "Italian", "Japanese", "Mexican", "Middle Eastern", "Healthy"];

// Simulate API delay
function apiDelay(ms = 400) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Mock API
const API = {
  async getRestaurants(search = '', cuisine = 'All') {
    await apiDelay();
    let result = [...RESTAURANTS];
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(r => r.name.toLowerCase().includes(s) || r.cuisine.toLowerCase().includes(s) || r.tags.some(t => t.toLowerCase().includes(s)));
    }
    if (cuisine && cuisine !== 'All') {
      result = result.filter(r => r.cuisine === cuisine);
    }
    return result;
  },
  async getRestaurant(id) {
    await apiDelay();
    return RESTAURANTS.find(r => r.id === id) || null;
  },
  async getMenu(restaurantId) {
    await apiDelay();
    return MENU_ITEMS[restaurantId] || [];
  },
  async placeOrder(orderData) {
    await apiDelay(600);
    const orderId = 'FR' + Date.now().toString().slice(-6);
    const order = {
      id: orderId,
      ...orderData,
      status: 'placed',
      statusHistory: [{ status: 'placed', time: new Date().toISOString(), message: 'Order placed successfully!' }],
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 35 * 60000).toISOString()
    };
    // Save to localStorage
    const orders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('fr_orders', JSON.stringify(orders));
    // Start status progression
    API._simulateOrderProgress(orderId);
    return order;
  },
  async getOrder(orderId) {
    await apiDelay(200);
    const orders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
    return orders.find(o => o.id === orderId) || null;
  },
  async getUserOrders() {
    await apiDelay(300);
    return JSON.parse(localStorage.getItem('fr_orders') || '[]');
  },
  _simulateOrderProgress(orderId) {
    const statusFlow = [
      { status: 'confirmed', delay: 5000, message: '✅ Restaurant confirmed your order!' },
      { status: 'preparing', delay: 15000, message: '👨‍🍳 Chef is preparing your food...' },
      { status: 'picked_up', delay: 28000, message: '🛵 Delivery partner Rahul picked up your order' },
      { status: 'on_the_way', delay: 35000, message: '🚴 Rahul is on the way! 10 mins away.' },
      { status: 'delivered', delay: 50000, message: '🎉 Order delivered! Enjoy your meal!' }
    ];
    statusFlow.forEach(({ status, delay, message }) => {
      setTimeout(() => {
        const orders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
        const order = orders.find(o => o.id === orderId);
        if (order) {
          order.status = status;
          order.statusHistory.push({ status, time: new Date().toISOString(), message });
          localStorage.setItem('fr_orders', JSON.stringify(orders));
          window.dispatchEvent(new CustomEvent('orderStatusUpdate', { detail: { orderId, status, message } }));
        }
      }, delay);
    });
  },
  login(email, password) {
    // Demo login
    if (email === 'demo@savora.com' && password === 'demo123') {
      const user = { id: 1, name: 'Demo User', email, phone: '9999999999' };
      localStorage.setItem('fr_user', JSON.stringify(user));
      return user;
    }
    // Check registered users
    const users = JSON.parse(localStorage.getItem('fr_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      localStorage.setItem('fr_user', JSON.stringify(safeUser));
      return safeUser;
    }
    return null;
  },
  register(name, email, phone, password) {
    const users = JSON.parse(localStorage.getItem('fr_users') || '[]');
    if (users.find(u => u.email === email)) return { error: 'Email already registered' };
    const user = { id: Date.now(), name, email, phone, password };
    users.push(user);
    localStorage.setItem('fr_users', JSON.stringify(users));
    const { password: _, ...safeUser } = user;
    localStorage.setItem('fr_user', JSON.stringify(safeUser));
    return safeUser;
  },
  getCurrentUser() {
    const user = window.Clerk?.user;
    if (!user) return null;
    return {
      id: user.id,
      name: user.fullName || user.firstName || 'User',
      email: user.primaryEmailAddress?.emailAddress,
      address: '123 Main Street, Mumbai, Maharashtra'
    };
  },
  logout() {
    if (window.Clerk) window.Clerk.signOut();
  }
};

// Cart management
const Cart = {
  get() { return JSON.parse(localStorage.getItem('fr_cart') || '{"restaurantId":null,"items":[]}'); },
  save(cart) { localStorage.setItem('fr_cart', JSON.stringify(cart)); },
  addItem(restaurantId, item) {
    let cart = Cart.get();
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      if (!confirm('Your cart has items from another restaurant. Clear cart and add new item?')) return false;
      cart = { restaurantId: null, items: [] };
    }
    cart.restaurantId = restaurantId;
    const existing = cart.items.find(i => i.id === item.id);
    if (existing) existing.quantity++;
    else cart.items.push({ ...item, quantity: 1 });
    Cart.save(cart);
    Cart.updateBadge();
    return true;
  },
  removeItem(itemId) {
    let cart = Cart.get();
    cart.items = cart.items.filter(i => i.id !== itemId);
    if (cart.items.length === 0) cart.restaurantId = null;
    Cart.save(cart);
    Cart.updateBadge();
  },
  updateQuantity(itemId, delta) {
    let cart = Cart.get();
    const item = cart.items.find(i => i.id === itemId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) cart.items = cart.items.filter(i => i.id !== itemId);
    if (cart.items.length === 0) cart.restaurantId = null;
    Cart.save(cart);
    Cart.updateBadge();
  },
  clear() {
    Cart.save({ restaurantId: null, items: [] });
    Cart.updateBadge();
  },
  getTotal() {
    const cart = Cart.get();
    return cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
  getCount() {
    const cart = Cart.get();
    return cart.items.reduce((sum, i) => sum + i.quantity, 0);
  },
  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = Cart.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// Theme management
const Theme = {
  get() { return localStorage.getItem('fr_theme') || 'light'; },
  set(theme) {
    localStorage.setItem('fr_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  },
  toggle() {
    const current = Theme.get();
    Theme.set(current === 'dark' ? 'light' : 'dark');
  },
  init() {
    Theme.set(Theme.get());
  }
};
