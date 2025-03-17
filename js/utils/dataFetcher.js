// Mock data for the e-commerce site
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    discount: 0,
    featured: true
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 149.99,
    description: "Track your fitness goals with this advanced smart watch. Monitors heart rate, steps, sleep quality, and more. Water-resistant and includes a color touchscreen.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    discount: 10,
    featured: true
  },
  {
    id: 3,
    name: "Designer Leather Backpack",
    price: 79.99,
    description: "Stylish and functional leather backpack perfect for daily use or travel. Features multiple compartments, laptop sleeve, and durable construction.",
    image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.3,
    reviews: 56,
    inStock: true,
    discount: 0,
    featured: false
  },
  {
    id: 4,
    name: "Professional DSLR Camera",
    price: 899.99,
    description: "Capture stunning photos and videos with this professional-grade DSLR camera. Includes 24.1 megapixel sensor, 4K video recording, and interchangeable lens system.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    discount: 5,
    featured: true
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Keep your drinks hot or cold for hours with this insulated stainless steel water bottle. Durable, leak-proof design with 32oz capacity.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.7,
    reviews: 312,
    inStock: true,
    discount: 0,
    featured: false
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable and eco-friendly organic cotton t-shirt. Available in multiple colors and sizes. Perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.2,
    reviews: 78,
    inStock: true,
    discount: 0,
    featured: false
  },
  {
    id: 7,
    name: "Wireless Charging Pad",
    price: 39.99,
    description: "Convenient wireless charging for compatible smartphones and devices. Fast charging technology with sleek, minimalist design.",
    image: "https://images.unsplash.com/photo-1608155686393-8fdd966d784d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.4,
    reviews: 42,
    inStock: true,
    discount: 15,
    featured: false
  },
  {
    id: 8,
    name: "Smart Home Speaker",
    price: 129.99,
    description: "Voice-controlled smart speaker with premium sound quality. Control your smart home, play music, get information, and more with simple voice commands.",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.6,
    reviews: 167,
    inStock: true,
    discount: 0,
    featured: true
  },
  {
    id: 9,
    name: "Ceramic Coffee Mug Set",
    price: 34.99,
    description: "Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe with elegant design and comfortable handle.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.3,
    reviews: 92,
    inStock: true,
    discount: 0,
    featured: false
  },
  {
    id: 10,
    name: "Adjustable Desk Lamp",
    price: 49.99,
    description: "Modern LED desk lamp with adjustable brightness levels and color temperatures. Flexible arm and energy-efficient design.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.5,
    reviews: 64,
    inStock: true,
    discount: 5,
    featured: false
  },
  {
    id: 11,
    name: "Bluetooth Portable Speaker",
    price: 59.99,
    description: "Compact and powerful Bluetooth speaker with 12-hour battery life. Waterproof design makes it perfect for outdoor use.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.4,
    reviews: 118,
    inStock: true,
    discount: 0,
    featured: false
  },
  {
    id: 12,
    name: "Running Shoes",
    price: 89.99,
    description: "Lightweight and supportive running shoes with responsive cushioning. Breathable mesh upper and durable rubber outsole.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.7,
    reviews: 231,
    inStock: true,
    discount: 10,
    featured: true
  }
];

const categories = [
  { id: 1, name: "Electronics", icon: "fas fa-laptop" },
  { id: 2, name: "Fashion", icon: "fas fa-tshirt" },
  { id: 3, name: "Home & Kitchen", icon: "fas fa-home" },
  { id: 4, name: "Sports & Outdoors", icon: "fas fa-running" },
  { id: 5, name: "Beauty & Personal Care", icon: "fas fa-spa" },
  { id: 6, name: "Books", icon: "fas fa-book" }
];

// Simulated API functions
function fetchProducts(filters = {}) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredProducts = [...products];
        
        // Apply category filter
        if (filters.category) {
          filteredProducts = filteredProducts.filter(
            product => product.category === filters.category
          );
        }
        
        // Apply price filter
        if (filters.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            product => product.price >= filters.minPrice
          );
        }
        
        if (filters.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(
            product => product.price <= filters.maxPrice
          );
        }
        
        // Apply search filter
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(
            product => 
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower) ||
              product.category.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply featured filter
        if (filters.featured) {
          filteredProducts = filteredProducts.filter(product => product.featured);
        }
        
        resolve(filteredProducts);
      }, 300); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Promise.reject(error);
  }
}

function fetchProductById(id) {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
          resolve(product);
        } else {
          reject(new Error("Product not found"));
        }
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return Promise.reject(error);
  }
}

function fetchCategories() {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categories);
      }, 300);
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Promise.reject(error);
  }
}

function fetchFeaturedProducts() {
  try {
    return fetchProducts({ featured: true });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return Promise.reject(error);
  }
}

// Simulated checkout process
function processCheckout(orderData) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          message: "Order placed successfully!"
        });
      }, 800);
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    return Promise.reject(error);
  }
}
