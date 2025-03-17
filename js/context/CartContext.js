const CartContext = React.createContext();

function CartProvider({ children }) {
  try {
    const [cart, setCart] = React.useState([]);
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    
    // Load cart from localStorage on initial render
    React.useEffect(() => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }, []);
    
    // Save cart to localStorage whenever it changes
    React.useEffect(() => {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }, [cart]);
    
    const addToCart = (product, quantity = 1) => {
      setCart(prevCart => {
        // Check if product already exists in cart
        const existingItem = prevCart.find(item => item.id === product.id);
        
        if (existingItem) {
          // Update quantity if product exists
          return prevCart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new product to cart
          return [...prevCart, { ...product, quantity }];
        }
      });
      
      // Open cart sidebar when adding items
      setIsCartOpen(true);
    };
    
    const removeFromCart = (productId) => {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };
    
    const updateQuantity = (productId, quantity) => {
      if (quantity < 1) return;
      
      setCart(prevCart => 
        prevCart.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      );
    };
    
    const clearCart = () => {
      setCart([]);
    };
    
    const toggleCart = () => {
      setIsCartOpen(prev => !prev);
    };
    
    const closeCart = () => {
      setIsCartOpen(false);
    };
    
    const getCartTotal = () => {
      return cart.reduce((total, item) => {
        const price = item.discount 
          ? item.price * (1 - item.discount / 100) 
          : item.price;
        return total + price * item.quantity;
      }, 0);
    };
    
    const getCartCount = () => {
      return cart.reduce((count, item) => count + item.quantity, 0);
    };
    
    const value = {
      cart,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart,
      getCartTotal,
      getCartCount
    };
    
    return (
      <CartContext.Provider value={value}>
        {children}
      </CartContext.Provider>
    );
  } catch (error) {
    console.error('CartProvider error:', error);
    reportError(error);
    return null;
  }
}

function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
