const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ==================== MOCK DATA ====================

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.8,
    deliveryTime: "18-24 min",
    minOrder: 150,
    deliveryFee: 30,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    tags: ["Biryani", "Curry", "North Indian"],
    isOpen: true,
    distance: "1.2 km",
    promoted: true
  },
  {
    id: 2,
    name: "Dragon Wok",
    cuisine: "Chinese",
    rating: 4.5,
    deliveryTime: "20-26 min",
    minOrder: 200,
    deliveryFee: 40,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80",
    tags: ["Noodles", "Dim Sum", "Fried Rice"],
    isOpen: true,
    distance: "2.1 km",
    promoted: false
  },
  {
    id: 3,
    name: "Burger Republic",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "15-22 min",
    minOrder: 120,
    deliveryFee: 25,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    tags: ["Burgers", "Fries", "Shakes"],
    isOpen: true,
    distance: "0.8 km",
    promoted: true
  },
  {
    id: 4,
    name: "Pizza Palazzo",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "18-25 min",
    minOrder: 250,
    deliveryFee: 35,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    tags: ["Pizza", "Pasta", "Garlic Bread"],
    isOpen: true,
    distance: "1.8 km",
    promoted: false
  },
  {
    id: 5,
    name: "Sushi Sakura",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "20-28 min",
    minOrder: 300,
    deliveryFee: 50,
    image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80",
    tags: ["Sushi", "Ramen", "Tempura"],
    isOpen: false,
    distance: "3.5 km",
    promoted: false
  },
  {
    id: 6,
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "16-24 min",
    minOrder: 180,
    deliveryFee: 30,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80",
    tags: ["Tacos", "Burritos", "Nachos"],
    isOpen: true,
    distance: "1.5 km",
    promoted: false
  }
];

const menuItems = {
  1: [
    { id: 101, name: "Chicken Biryani", price: 280, description: "Aromatic basmati rice with tender chicken", category: "Main Course", veg: false, image: "https://images.unsplash.com/photo-1563379091339-03246963d651?w=300&q=80", bestseller: true },
    { id: 102, name: "Paneer Butter Masala", price: 220, description: "Creamy tomato-based curry with paneer", category: "Main Course", veg: true, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&q=80", bestseller: true },
    { id: 103, name: "Dal Makhani", price: 180, description: "Slow-cooked black lentils in rich butter gravy", category: "Main Course", veg: true, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80", bestseller: false },
    { id: 104, name: "Garlic Naan", price: 60, description: "Freshly baked flatbread with garlic butter", category: "Bread", veg: true, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80", bestseller: false },
    { id: 105, name: "Mango Lassi", price: 80, description: "Refreshing yogurt drink with mango", category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1568051243858-533a607809a5?w=300&q=80", bestseller: false }
  ],
  2: [
    { id: 201, name: "Kung Pao Chicken", price: 280, description: "Spicy stir-fried chicken with peanuts", category: "Main Course", veg: false, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=80", bestseller: true },
    { id: 202, name: "Veg Fried Rice", price: 200, description: "Wok-tossed rice with fresh vegetables", category: "Rice", veg: true, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&q=80", bestseller: false },
    { id: 203, name: "Hakka Noodles", price: 180, description: "Stir-fried noodles Chinese style", category: "Noodles", veg: true, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80", bestseller: false },
    { id: 204, name: "Dim Sum Basket", price: 250, description: "Steamed dumplings with dipping sauce", category: "Starters", veg: false, image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&q=80", bestseller: true }
  ],
  3: [
    { id: 301, name: "Classic Smash Burger", price: 320, description: "Double smash patty with special sauce", category: "Burgers", veg: false, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80", bestseller: true },
    { id: 302, name: "Crispy Veggie Burger", price: 220, description: "Crispy veggie patty with fresh greens", category: "Burgers", veg: true, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&q=80", bestseller: false },
    { id: 303, name: "Loaded Fries", price: 150, description: "Fries loaded with cheese and jalapenos", category: "Sides", veg: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80", bestseller: true },
    { id: 304, name: "Chocolate Shake", price: 180, description: "Thick creamy chocolate milkshake", category: "Beverages", veg: true, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&q=80", bestseller: false }
  ],
  4: [
    { id: 401, name: "Margherita Pizza", price: 350, description: "Classic tomato, mozzarella and basil", category: "Pizza", veg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80", bestseller: false },
    { id: 402, name: "BBQ Chicken Pizza", price: 450, description: "Smoky BBQ sauce with grilled chicken", category: "Pizza", veg: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80", bestseller: true },
    { id: 403, name: "Pasta Arrabiata", price: 280, description: "Penne in spicy tomato sauce", category: "Pasta", veg: true, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=80", bestseller: false },
    { id: 404, name: "Garlic Bread", price: 120, description: "Toasted garlic bread with herbs", category: "Sides", veg: true, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300&q=80", bestseller: false }
  ],
  5: [
    { id: 501, name: "Salmon Nigiri (6pc)", price: 650, description: "Fresh salmon over seasoned rice", category: "Sushi", veg: false, image: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=300&q=80", bestseller: true },
    { id: 502, name: "Tonkotsu Ramen", price: 480, description: "Rich pork bone broth with noodles", category: "Ramen", veg: false, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=80", bestseller: true },
    { id: 503, name: "Vegetable Tempura", price: 380, description: "Lightly battered seasonal vegetables", category: "Starters", veg: true, image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=300&q=80", bestseller: false }
  ],
  6: [
    { id: 601, name: "Chicken Tacos (3pc)", price: 260, description: "Grilled chicken with salsa and cheese", category: "Tacos", veg: false, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&q=80", bestseller: true },
    { id: 602, name: "Veg Burrito", price: 220, description: "Loaded veggie burrito with rice and beans", category: "Burritos", veg: true, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300&q=80", bestseller: false },
    { id: 603, name: "Nachos Supreme", price: 200, description: "Crispy nachos with guacamole and sour cream", category: "Starters", veg: true, image: "https://images.unsplash.com/photo-1574894709920-11b28be1368c?w=300&q=80", bestseller: false }
  ]
};

// In-memory orders store
const orders = [];
let orderIdCounter = 1001;

// In-memory users store
const users = [
  { id: 1, name: "Demo User", email: "demo@savora.com", phone: "9999999999", password: "demo123", addresses: ["123 Main St, Mumbai"] }
];
let userIdCounter = 2;

// ==================== ROUTES ====================

// --- Restaurants ---
app.get('/api/restaurants', (req, res) => {
  const { search, cuisine } = req.query;
  let result = [...restaurants];
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(r => r.name.toLowerCase().includes(s) || r.cuisine.toLowerCase().includes(s) || r.tags.some(t => t.toLowerCase().includes(s)));
  }
  if (cuisine && cuisine !== 'All') {
    result = result.filter(r => r.cuisine === cuisine);
  }
  res.json({ success: true, data: result });
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
  res.json({ success: true, data: restaurant });
});

// --- Menu ---
app.get('/api/restaurants/:id/menu', (req, res) => {
  const id = parseInt(req.params.id);
  const items = menuItems[id];
  if (!items) return res.status(404).json({ success: false, message: 'Menu not found' });
  res.json({ success: true, data: items });
});

// --- Orders ---
app.post('/api/orders', (req, res) => {
  const { userId, restaurantId, items, address, paymentMethod } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ success: false, message: 'No items in order' });

  const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = restaurant ? restaurant.deliveryFee : 30;

  const order = {
    id: orderIdCounter++,
    userId,
    restaurantId: parseInt(restaurantId),
    restaurantName: restaurant ? restaurant.name : 'Unknown',
    items,
    total,
    deliveryFee,
    grandTotal: total + deliveryFee,
    address,
    paymentMethod,
    status: 'placed',
    // Randomly assign ~45% of orders to experience a late delivery
    isLate: Math.random() < 0.45,
    statusHistory: [
      { status: 'placed', time: new Date().toISOString(), message: 'Order placed successfully' }
    ],
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 22 * 60000).toISOString()
  };

  orders.push(order);

  // Status progression: on-time flow vs late flow
  const onTimeFlow = [
    { status: 'confirmed', delay: 5000, message: 'Restaurant confirmed your order' },
    { status: 'preparing', delay: 12000, message: 'Chef is preparing your food' },
    { status: 'picked_up', delay: 25000, message: 'Delivery partner picked up your order' },
    { status: 'on_the_way', delay: 30000, message: 'Your order is on the way! 6–8 mins away.' },
    { status: 'delivered', delay: 45000, message: 'Order delivered on time in 21 mins! Enjoy your meal 🎉' }
  ];

  const lateFlow = [
    { status: 'confirmed', delay: 5000, message: 'Restaurant confirmed your order' },
    { status: 'preparing', delay: 12000, message: 'Kitchen rush: Order preparation delayed.' },
    { status: 'picked_up', delay: 25000, message: 'Delivery partner picked up your order from restaurant.' },
    { status: 'on_the_way', delay: 30000, message: '⚠️ Heavy traffic & rain delay: Delivery time will exceed 30 mins!' },
    { status: 'delivered', delay: 45000, message: '🚨 Delivered late (34 mins)! 30-Min Promise breached. You can now claim 50% OFF!' }
  ];

  const statusFlow = order.isLate ? lateFlow : onTimeFlow;

  statusFlow.forEach(({ status, delay, message }) => {
    setTimeout(() => {
      const o = orders.find(o => o.id === order.id);
      if (o) {
        o.status = status;
        o.statusHistory.push({ status, time: new Date().toISOString(), message });
      }
    }, delay);
  });

  res.json({ success: true, data: order });
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
  res.json({ success: true, data: order });
});

app.get('/api/orders/user/:userId', (req, res) => {
  const userOrders = orders.filter(o => o.userId === parseInt(req.params.userId));
  res.json({ success: true, data: userOrders.reverse() });
});

// --- Auth ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, data: { user: safeUser, token: `token_${user.id}_${Date.now()}` } });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: 'Email already registered' });
  const newUser = { id: userIdCounter++, name, email, phone, password, addresses: [] };
  users.push(newUser);
  const { password: _, ...safeUser } = newUser;
  res.json({ success: true, data: { user: safeUser, token: `token_${newUser.id}_${Date.now()}` } });
});

app.get('/api/auth/me', (req, res) => {
  // Simple token check
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'No token' });
  const userId = parseInt(token.split('_')[1]);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(401).json({ success: false, message: 'Invalid token' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});

// --- BPM Data ---
app.get('/api/bpm/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalOrders: orders.length + 142,
      activeOrders: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length + 8,
      avgDeliveryTime: 22,
      customerSatisfaction: 94.7,
      totalRestaurants: restaurants.length,
      totalUsers: users.length + 1247,
      revenueToday: 48650,
      ordersToday: orders.length + 67
    }
  });
});

// Catch-all: serve index.html for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🍔 Savora Server running at http://localhost:${PORT}`);
  console.log(`📊 BPM Dashboard: http://localhost:${PORT}/bpm.html`);
  console.log(`Press Ctrl+C to stop\n`);
});
