// ==================== SAVORA MOCK DATA ====================

const RESTAURANTS = [
  {
    id: 1, name: "Spice Garden", cuisine: "Indian", rating: 4.8,
    deliveryTime: "18-24 min", minOrder: 150, deliveryFee: 30,
    image: "/images/chicken-biryani.jpg",
    tags: ["Biryani", "Curry", "North Indian"], isOpen: true, distance: "1.2 km", promoted: true,
    description: "Authentic flavors from the heart of North India. Our master chefs bring you traditional recipes with a modern twist."
  },
  {
    id: 2, name: "Dragon Wok", cuisine: "Chinese", rating: 4.5,
    deliveryTime: "20-26 min", minOrder: 200, deliveryFee: 40,
    image: "/images/dim-sum-basket.jpg",
    tags: ["Noodles", "Dim Sum", "Fried Rice"], isOpen: true, distance: "2.1 km", promoted: false,
    description: "Authentic Chinese cuisine with bold flavors and fresh ingredients wok-tossed to perfection."
  },
  {
    id: 3, name: "Burger Republic", cuisine: "American", rating: 4.6,
    deliveryTime: "15-22 min", minOrder: 120, deliveryFee: 25,
    image: "/images/classic-smash-burger.jpg",
    tags: ["Burgers", "Fries", "Shakes"], isOpen: true, distance: "0.8 km", promoted: true,
    description: "Premium smash burgers with house-ground beef, artisan buns and secret sauce. Voted #1 burger joint 2024."
  },
  {
    id: 4, name: "Pizza Palazzo", cuisine: "Italian", rating: 4.7,
    deliveryTime: "18-25 min", minOrder: 250, deliveryFee: 35,
    image: "/images/margherita-pizza.jpg",
    tags: ["Pizza", "Pasta", "Garlic Bread"], isOpen: true, distance: "1.8 km", promoted: false,
    description: "Stone-baked artisan pizzas with imported Italian ingredients. Our dough ferments for 72 hours for the perfect crust."
  },
  {
    id: 5, name: "Sushi Sakura", cuisine: "Japanese", rating: 4.9,
    deliveryTime: "20-28 min", minOrder: 300, deliveryFee: 50,
    image: "/images/salmon-nigiri.jpg",
    tags: ["Sushi", "Ramen", "Tempura"], isOpen: true, distance: "3.5 km", promoted: true,
    description: "Premium Japanese cuisine crafted by master chefs. Authentic hand-rolled sushi, artisanal ramen, and fresh tempura."
  },
  {
    id: 6, name: "Taco Fiesta", cuisine: "Mexican", rating: 4.4,
    deliveryTime: "16-24 min", minOrder: 180, deliveryFee: 30,
    image: "/images/chicken-tacos.jpg",
    tags: ["Tacos", "Burritos", "Nachos"], isOpen: true, distance: "1.5 km", promoted: false,
    description: "Vibrant Mexican street food with bold spices, fresh salsas and handmade tortillas every single day."
  },
  {
    id: 7, name: "The Kebab Corner", cuisine: "Middle Eastern", rating: 4.3,
    deliveryTime: "15-22 min", minOrder: 200, deliveryFee: 25,
    image: "/images/seekh-kebab.jpg",
    tags: ["Kebabs", "Shawarma", "Hummus"], isOpen: true, distance: "1.0 km", promoted: false,
    description: "Flame-grilled kebabs and authentic Middle Eastern flavors, marinated overnight for maximum taste."
  },
  {
    id: 8, name: "Green Bowl", cuisine: "Healthy", rating: 4.6,
    deliveryTime: "12-18 min", minOrder: 180, deliveryFee: 20,
    image: "/images/buddha-bowl.jpg",
    tags: ["Salads", "Bowls", "Smoothies"], isOpen: true, distance: "0.5 km", promoted: true,
    description: "Nutritious and delicious power bowls, smoothies, and salads. Fuel your body the right way."
  },
  {
    id: 9, name: "Le Bistro Parisien", cuisine: "French", rating: 4.8,
    deliveryTime: "15-22 min", minOrder: 250, deliveryFee: 35,
    image: "/images/butter-croissant.jpg",
    tags: ["Croissants", "Pastas", "Bakery"], isOpen: true, distance: "1.4 km", promoted: true,
    description: "Charming Parisian bakery & bistro. Artisan sourdoughs, golden flaky croissants, and classic French continental delicacies."
  },
  {
    id: 10, name: "Seoul Kitchen", cuisine: "Korean", rating: 4.7,
    deliveryTime: "18-25 min", minOrder: 220, deliveryFee: 35,
    image: "/images/korean-fried-chicken.jpg",
    tags: ["Bibimbap", "Fried Chicken", "K-Food"], isOpen: true, distance: "2.2 km", promoted: false,
    description: "Authentic Korean street food and comforting classics with bold gochujang and sweet-savory marinades."
  },
  {
    id: 11, name: "Dosa Dynasty", cuisine: "South Indian", rating: 4.8,
    deliveryTime: "14-20 min", minOrder: 120, deliveryFee: 20,
    image: "/images/masala-dosa.jpg",
    tags: ["Dosa", "Idli", "Filter Coffee"], isOpen: true, distance: "0.9 km", promoted: true,
    description: "Crispy golden fermented dosas, piping hot sambar, freshly ground coconut chutneys, and Kumbakonam degree filter coffee."
  },
  {
    id: 12, name: "Bella Gelato & Waffles", cuisine: "Desserts", rating: 4.9,
    deliveryTime: "12-18 min", minOrder: 150, deliveryFee: 25,
    image: "/images/belgian-waffle.jpg",
    tags: ["Waffles", "Gelato", "Pancakes"], isOpen: true, distance: "1.1 km", promoted: false,
    description: "Handcrafted artisan Italian gelato, hot Belgian liege waffles, and decadent dessert jars prepared fresh daily."
  },
  {
    id: 13, name: "Coastal Catch", cuisine: "Seafood", rating: 4.6,
    deliveryTime: "18-24 min", minOrder: 250, deliveryFee: 40,
    image: "/images/prawn-curry.jpg",
    tags: ["Fish Curry", "Prawns", "Coastal"], isOpen: true, distance: "2.4 km", promoted: false,
    description: "Fresh daily catch from the Arabian Sea, cooked in coconut-rich Konkani, Goan, and Mangalorean masala gravies."
  }
];

const MENU_ITEMS = {
  1: [
    { id: 101, name: "Chicken Biryani", price: 280, description: "Aromatic basmati rice with tender chicken, saffron & caramelized onions", category: "Main Course", veg: false, image: "/images/chicken-biryani.jpg", bestseller: true, rating: 4.9 },
    { id: 102, name: "Paneer Butter Masala", price: 220, description: "Creamy tomato-based curry with soft paneer cubes, butter & cream", category: "Main Course", veg: true, image: "/images/paneer-butter-masala.jpg", bestseller: true, rating: 4.8 },
    { id: 103, name: "Dal Makhani", price: 180, description: "Slow-cooked black lentils in rich butter & cream gravy, 24hrs preparation", category: "Main Course", veg: true, image: "/images/dal-makhani.jpg", bestseller: false, rating: 4.6 },
    { id: 104, name: "Garlic Naan", price: 60, description: "Freshly baked flatbread with garlic butter & fresh herbs", category: "Bread", veg: true, image: "/images/garlic-naan.jpg", bestseller: false, rating: 4.5 },
    { id: 105, name: "Mango Lassi", price: 80, description: "Thick refreshing yogurt drink with Alphonso mango", category: "Beverages", veg: true, image: "/images/mango-lassi.jpg", bestseller: false, rating: 4.7 },
    { id: 106, name: "Seekh Kebab", price: 240, description: "Minced lamb kebabs with spices grilled on charcoal", category: "Starters", veg: false, image: "/images/seekh-kebab.jpg", bestseller: true, rating: 4.8 }
  ],
  2: [
    { id: 201, name: "Kung Pao Chicken", price: 280, description: "Spicy stir-fried chicken with peanuts, dried chillies & Sichuan sauce", category: "Main Course", veg: false, image: "/images/kung-pao-chicken.jpg", bestseller: true, rating: 4.7 },
    { id: 202, name: "Veg Fried Rice", price: 200, description: "Wok-tossed fluffy rice with fresh seasonal vegetables & soy sauce", category: "Rice", veg: true, image: "/images/veg-fried-rice.jpg", bestseller: false, rating: 4.4 },
    { id: 203, name: "Hakka Noodles", price: 180, description: "Stir-fried noodles with vegetables & aromatic Chinese spices", category: "Noodles", veg: true, image: "/images/hakka-noodles.jpg", bestseller: false, rating: 4.3 },
    { id: 204, name: "Dim Sum Basket", price: 250, description: "6-piece steamed dumplings with ginger-soy dipping sauce", category: "Starters", veg: false, image: "/images/dim-sum-basket.jpg", bestseller: true, rating: 4.8 }
  ],
  3: [
    { id: 301, name: "Classic Smash Burger", price: 320, description: "Double smash patty, special sauce, pickles, American cheese on brioche bun", category: "Burgers", veg: false, image: "/images/classic-smash-burger.jpg", bestseller: true, rating: 4.9 },
    { id: 302, name: "Crispy Veggie Burger", price: 220, description: "Crispy chickpea patty, avocado, lettuce, tomato & house sauce", category: "Burgers", veg: true, image: "/images/veggie-burger.jpg", bestseller: false, rating: 4.5 },
    { id: 303, name: "Loaded Cheese Fries", price: 150, description: "Crispy fries loaded with cheddar sauce, jalapeños & spring onion", category: "Sides", veg: true, image: "/images/loaded-cheese-fries.jpg", bestseller: true, rating: 4.7 },
    { id: 304, name: "Chocolate Shake", price: 180, description: "Thick Belgian chocolate milkshake with whipped cream", category: "Beverages", veg: true, image: "/images/chocolate-shake.jpg", bestseller: false, rating: 4.6 }
  ],
  4: [
    { id: 401, name: "Margherita Pizza", price: 350, description: "San Marzano tomatoes, fresh mozzarella, basil on 72hr fermented dough", category: "Pizza", veg: true, image: "/images/margherita-pizza.jpg", bestseller: false, rating: 4.7 },
    { id: 402, name: "BBQ Chicken Pizza", price: 450, description: "Smoky BBQ sauce, grilled chicken, red onion, mozzarella & coriander", category: "Pizza", veg: false, image: "/images/bbq-chicken-pizza.jpg", bestseller: true, rating: 4.8 },
    { id: 403, name: "Pasta Arrabiata", price: 280, description: "Penne in fiery tomato & garlic sauce with fresh basil", category: "Pasta", veg: true, image: "/images/pasta-arrabiata.jpg", bestseller: false, rating: 4.5 },
    { id: 404, name: "Garlic Bread", price: 120, description: "Toasted ciabatta with roasted garlic butter & herbs", category: "Sides", veg: true, image: "/images/garlic-bread.jpg", bestseller: false, rating: 4.4 }
  ],
  5: [
    { id: 501, name: "Salmon Nigiri (6pc)", price: 650, description: "Premium Norwegian salmon over hand-pressed sushi rice with wasabi", category: "Sushi", veg: false, image: "/images/salmon-nigiri.jpg", bestseller: true, rating: 4.9 },
    { id: 502, name: "Tonkotsu Ramen", price: 480, description: "12-hour slow-boiled pork bone broth with chashu, soft-boiled ajitsuke egg & noodles", category: "Ramen", veg: false, image: "/images/tonkotsu-ramen.jpg", bestseller: true, rating: 4.8 },
    { id: 503, name: "Vegetable Tempura", price: 380, description: "Lightly battered seasonal crisp vegetables, tentsuyu dipping sauce", category: "Starters", veg: true, image: "/images/vegetable-tempura.jpg", bestseller: false, rating: 4.6 },
    { id: 504, name: "Spicy Tuna Roll (8pc)", price: 550, description: "Fresh yellowfin tuna tossed in spicy sriracha mayo, cucumber & toasted sesame", category: "Sushi", veg: false, image: "/images/spicy-tuna-roll.jpg", bestseller: true, rating: 4.8 },
    { id: 505, name: "Edamame with Sea Salt", price: 220, description: "Steamed young soybeans tossed with Maldon sea salt crystals", category: "Starters", veg: true, image: "/images/edamame.jpg", bestseller: false, rating: 4.5 }
  ],
  6: [
    { id: 601, name: "Chicken Tacos (3pc)", price: 260, description: "Grilled chipotle chicken, pico de gallo, avocado crema in corn tortillas", category: "Tacos", veg: false, image: "/images/chicken-tacos.jpg", bestseller: true, rating: 4.8 },
    { id: 602, name: "Veg Burrito", price: 220, description: "Loaded with black beans, rice, roasted peppers, guac & sour cream", category: "Burritos", veg: true, image: "/images/veg-burrito.jpg", bestseller: false, rating: 4.4 },
    { id: 603, name: "Nachos Supreme", price: 200, description: "Crispy tortilla chips with house guacamole, sour cream & fresh salsa", category: "Starters", veg: true, image: "/images/nachos-supreme.jpg", bestseller: false, rating: 4.5 }
  ],
  7: [
    { id: 701, name: "Mixed Grill Platter", price: 480, description: "Selection of chicken, lamb & beef kebabs with pita & mezze", category: "Main Course", veg: false, image: "/images/mixed-grill.jpg", bestseller: true, rating: 4.8 },
    { id: 702, name: "Chicken Shawarma Wrap", price: 220, description: "Slow-roasted chicken with garlic sauce, pickles in warm pita", category: "Wraps", veg: false, image: "/images/chicken-shawarma.jpg", bestseller: true, rating: 4.7 },
    { id: 703, name: "Hummus Plate", price: 160, description: "Smooth hummus with olive oil, pine nuts & warm pita", category: "Starters", veg: true, image: "/images/hummus-plate.jpg", bestseller: false, rating: 4.5 }
  ],
  8: [
    { id: 801, name: "Buddha Bowl", price: 280, description: "Quinoa, roasted veggies, edamame, avocado, tahini dressing", category: "Bowls", veg: true, image: "/images/buddha-bowl.jpg", bestseller: true, rating: 4.8 },
    { id: 802, name: "Acai Smoothie Bowl", price: 220, description: "Thick acai base with granola, fresh berries & honey drizzle", category: "Bowls", veg: true, image: "/images/acai-bowl.jpg", bestseller: true, rating: 4.7 },
    { id: 803, name: "Greek Salad", price: 180, description: "Fresh cucumbers, tomatoes, olives, feta & lemon herb dressing", category: "Salads", veg: true, image: "/images/greek-salad.jpg", bestseller: false, rating: 4.5 }
  ],
  9: [
    { id: 901, name: "Butter Croissant (2pc)", price: 180, description: "Flaky golden Viennoiserie laminated with pure French butter", category: "Bakery", veg: true, image: "/images/butter-croissant.jpg", bestseller: true, rating: 4.9 },
    { id: 902, name: "Truffle Cream Pasta", price: 380, description: "Fettuccine tossed in aromatic black truffle cream with shaved parmesan", category: "Main Course", veg: true, image: "/images/truffle-pasta.jpg", bestseller: true, rating: 4.8 },
    { id: 903, name: "French Onion Soup", price: 240, description: "Slow-caramelized onions in rich herb broth topped with melted Gruyere crouton", category: "Starters", veg: true, image: "/images/french-onion-soup.jpg", bestseller: false, rating: 4.6 },
    { id: 904, name: "Classic Creme Brulee", price: 220, description: "Velvety vanilla bean custard with crackling caramelized sugar crust", category: "Desserts", veg: true, image: "/images/creme-brulee.jpg", bestseller: true, rating: 4.9 }
  ],
  10: [
    { id: 1001, name: "Yangnyeom Fried Chicken", price: 340, description: "Double-fried ultra-crispy boneless chicken coated in sweet & spicy gochujang glaze", category: "Main Course", veg: false, image: "/images/korean-fried-chicken.jpg", bestseller: true, rating: 4.9 },
    { id: 1002, name: "Dolsot Bibimbap", price: 290, description: "Steamed rice bowl with seasoned sautéed vegetables, fried egg & spicy bibim sauce", category: "Main Course", veg: true, image: "/images/bibimbap.jpg", bestseller: true, rating: 4.8 },
    { id: 1003, name: "Tteokbokki Deluxe", price: 240, description: "Chewy Korean rice cakes and fish cakes simmered in fiery sweet red chili sauce", category: "Starters", veg: false, image: "/images/tteokbokki.jpg", bestseller: false, rating: 4.6 },
    { id: 1004, name: "Kimchi Fried Rice", price: 220, description: "Wok-fried rice with aged tangy kimchi, seaweed crisps & sunny-side up egg", category: "Rice", veg: true, image: "/images/kimchi-fried-rice.jpg", bestseller: false, rating: 4.5 }
  ],
  11: [
    { id: 1101, name: "Mysore Masala Dosa", price: 160, description: "Crispy crepe smeared with red chili-garlic chutney and spiced potato filling", category: "Dosa", veg: true, image: "/images/masala-dosa.jpg", bestseller: true, rating: 4.9 },
    { id: 1102, name: "Ghee Podi Idli (3pc)", price: 130, description: "Soft steamed rice cakes tossed in fragrant gunpowder spice podi and melting desi ghee", category: "Idli", veg: true, image: "/images/podi-idli.jpg", bestseller: true, rating: 4.8 },
    { id: 1103, name: "Crispy Medu Vada (2pc)", price: 110, description: "Golden fried savory lentil donuts served with piping hot drumstick sambar", category: "Starters", veg: true, image: "/images/medu-vada.jpg", bestseller: false, rating: 4.7 },
    { id: 1104, name: "South Indian Filter Coffee", price: 70, description: "Traditional strong chicory-infused filter coffee frothed in a brass davara", category: "Beverages", veg: true, image: "/images/filter-coffee.jpg", bestseller: true, rating: 4.9 }
  ],
  12: [
    { id: 1201, name: "Belgian Chocolate Waffle", price: 240, description: "Crispy golden waffle smothered in warm Belgian milk & dark chocolate ganache", category: "Waffles", veg: true, image: "/images/belgian-waffle.jpg", bestseller: true, rating: 4.9 },
    { id: 1202, name: "Sicilian Pistachio Gelato Tub", price: 290, description: "Silky slow-churned gelato made with 100% roasted Sicilian pistachio paste", category: "Gelato", veg: true, image: "/images/pistachio-gelato.jpg", bestseller: true, rating: 4.8 },
    { id: 1203, name: "Nutella Strawberry Crepe", price: 220, description: "Paper-thin warm crepe stuffed with fresh sliced strawberries and generous Nutella", category: "Crepes", veg: true, image: "/images/strawberry-crepe.jpg", bestseller: false, rating: 4.7 },
    { id: 1204, name: "Salted Caramel Shake", price: 180, description: "Thick milkshake blended with house caramel sauce and sea salt crystals", category: "Beverages", veg: true, image: "/images/caramel-shake.jpg", bestseller: false, rating: 4.6 }
  ],
  13: [
    { id: 1301, name: "Goan Prawn Curry with Rice", price: 390, description: "Juicy tiger prawns simmered in tangy coconut, kokum & Kashmiri chili curry", category: "Main Course", veg: false, image: "/images/prawn-curry.jpg", bestseller: true, rating: 4.8 },
    { id: 1302, name: "Surmai Rava Fry", price: 360, description: "Kingfish steak marinated in coastal spices and crusted in crisp semolina rava", category: "Starters", veg: false, image: "/images/fish-fry.jpg", bestseller: true, rating: 4.7 },
    { id: 1303, name: "Butter Garlic Prawns", price: 380, description: "Succulent prawns pan-tossed in garlic butter with fresh herbs and lemon", category: "Starters", veg: false, image: "/images/butter-garlic-prawns.jpg", bestseller: false, rating: 4.7 },
    { id: 1304, name: "Refreshing Sol Kadhi", price: 80, description: "Digestive coastal cooler made from fresh coconut milk, kokum and green chilies", category: "Beverages", veg: true, image: "/images/sol-kadhi.jpg", bestseller: false, rating: 4.5 }
  ]
};

const CUISINES = ["All", "Indian", "Chinese", "American", "Italian", "Japanese", "Mexican", "Middle Eastern", "Healthy", "French", "Korean", "South Indian", "Desserts", "Seafood"];

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
    // Randomly assign ~45% of orders to experience a late delivery
    const isLateOrder = Math.random() < 0.45;
    const estMinutes = isLateOrder ? 35 : 22;

    const order = {
      id: orderId,
      ...orderData,
      status: 'placed',
      isLate: isLateOrder,
      statusHistory: [{ status: 'placed', time: new Date().toISOString(), message: 'Order placed successfully!' }],
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + estMinutes * 60000).toISOString()
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
    const orders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    const isLate = order ? order.isLate : false;

    // Normal On-Time Flow (Promise Met)
    const onTimeFlow = [
      { status: 'confirmed', delay: 4000, message: '✅ Restaurant confirmed your order!' },
      { status: 'preparing', delay: 12000, message: '👨‍🍳 Chef is preparing your food...' },
      { status: 'picked_up', delay: 24000, message: '🛵 Delivery partner Rahul picked up your order' },
      { status: 'on_the_way', delay: 32000, message: '🚴 Rahul is on the way! 6–8 mins away.' },
      { status: 'delivered', delay: 46000, message: '🎉 Order delivered on time in 21 mins! Enjoy your meal!' }
    ];

    // Late Delivery Flow (Promise Breached -> 50% Coupon Claimable)
    const lateFlow = [
      { status: 'confirmed', delay: 4000, message: '✅ Restaurant confirmed your order!' },
      { status: 'preparing', delay: 12000, message: '👨‍🍳 Kitchen rush: Order preparation delayed.' },
      { status: 'picked_up', delay: 24000, message: '🛵 Delivery partner picked up food from restaurant.' },
      { status: 'on_the_way', delay: 32000, message: '⚠️ Heavy traffic & rain delay: Delivery time will exceed 30 mins!' },
      { status: 'delivered', delay: 46000, message: '🚨 Delivered late (34 mins)! 30-Min Promise breached. You can now claim 50% OFF!' }
    ];

    const statusFlow = isLate ? lateFlow : onTimeFlow;

    statusFlow.forEach(({ status, delay, message }) => {
      setTimeout(() => {
        const storedOrders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
        const target = storedOrders.find(o => o.id === orderId);
        if (target) {
          target.status = status;
          target.statusHistory.push({ status, time: new Date().toISOString(), message });
          localStorage.setItem('fr_orders', JSON.stringify(storedOrders));
          window.dispatchEvent(new CustomEvent('orderStatusUpdate', { detail: { orderId, status, message } }));
        }
      }, delay);
    });
  },
  toggleOrderDelay(orderId) {
    const orders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.isLate = !target.isLate;
      const estMinutes = target.isLate ? 35 : 22;
      target.estimatedDelivery = new Date(Date.now() + estMinutes * 60000).toISOString();
      const lastHistory = target.statusHistory[target.statusHistory.length - 1];
      if (lastHistory) {
        if (target.status === 'delivered') {
          lastHistory.message = target.isLate
            ? '🚨 Delivered late (34 mins)! 30-Min Promise breached. You can now claim 50% OFF!'
            : '🎉 Order delivered on time in 21 mins! Enjoy your meal!';
        } else {
          lastHistory.message = target.isLate
            ? '⚠️ Heavy traffic & delay: Delivery time will exceed 30 mins!'
            : '🚴 Rahul is on the way! Arriving under 30 mins.';
        }
      }
      localStorage.setItem('fr_orders', JSON.stringify(orders));
      window.dispatchEvent(new CustomEvent('orderStatusUpdate', { detail: { orderId, status: target.status, message: 'Delay status toggled' } }));
    }
  },
  instantDeliver(orderId) {
    const orders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.status = 'delivered';
      const msg = target.isLate 
        ? '🚨 Delivered late (34 mins)! 30-Min Promise breached. You can now claim 50% OFF!'
        : '🎉 Order delivered on time in 21 mins! SLA met.';
      // remove any previous delivered history entry to avoid duplicate
      target.statusHistory = target.statusHistory.filter(h => h.status !== 'delivered');
      target.statusHistory.push({ status: 'delivered', time: new Date().toISOString(), message: msg });
      localStorage.setItem('fr_orders', JSON.stringify(orders));
      window.dispatchEvent(new CustomEvent('orderStatusUpdate', { detail: { orderId, status: 'delivered', message: msg } }));
    }
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
