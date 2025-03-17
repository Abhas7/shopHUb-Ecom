function CartPage() {
  try {
    const { 
      cart, 
      removeFromCart, 
      updateQuantity, 
      getCartTotal,
      clearCart
    } = useCart();
    
    const cartTotal = getCartTotal();
    
    // Calculate shipping (free over $50)
    const shipping = cartTotal >= 50 || cartTotal === 0 ? 0 : 5.99;
    
    // Calculate tax (8.25%)
    const tax = cartTotal * 0.0825;
    
    // Calculate order total
    const orderTotal = cartTotal + shipping + tax;
    
    // Proceed to checkout
    const proceedToCheckout = () => {
      window.location.hash = 'checkout';
    };
    
    // Continue shopping
    const continueShopping = () => {
      window.location.hash = '';
    };
    
    return (
      <div data-name="cart-page" className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <i className="fas fa-shopping-cart text-gray-300 text-6xl mb-4"></i>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                variant="primary" 
                size="large"
                onClick={continueShopping}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="hidden md:flex border-b pb-4 mb-4 font-medium text-gray-600">
                    <div className="w-2/5">Product</div>
                    <div className="w-1/5 text-center">Price</div>
                    <div className="w-1/5 text-center">Quantity</div>
                    <div className="w-1/5 text-right">Total</div>
                  </div>
                  
                  {/* Cart items list */}
                  <div data-name="cart-items-list">
                    {cart.map(item => (
                      <div key={item.id} className="py-4 border-b last:border-b-0">
                        <div className="flex flex-col md:flex-row md:items-center">
                          {/* Product info */}
                          <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                            <div className="w-20 h-20 flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-500">{item.category}</p>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-sm text-red-500 hover:text-red-700 mt-1 md:hidden"
                              >
                                <i className="fas fa-trash-alt mr-1"></i> Remove
                              </button>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="w-full md:w-1/5 text-left md:text-center mb-2 md:mb-0">
                            <span className="md:hidden text-gray-600">Price: </span>
                            <span>
                              {formatPrice(item.discount 
                                ? item.price * (1 - item.discount / 100) 
                                : item.price
                              )}
                            </span>
                            {item.discount > 0 && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>
                          
                          {/* Quantity */}
                          <div className="w-full md:w-1/5 text-left md:text-center mb-2 md:mb-0">
                            <div className="flex items-center md:justify-center">
                              <span className="md:hidden text-gray-600 mr-2">Quantity: </span>
                              <div className="flex border border-gray-300 rounded">
                                <button
                                  onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  <i className="fas fa-minus text-xs"></i>
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (value > 0) updateQuantity(item.id, value);
                                  }}
                                  className="w-10 text-center border-0 focus:outline-none"
                                />
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  <i className="fas fa-plus text-xs"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Total */}
                          <div className="w-full md:w-1/5 text-left md:text-right">
                            <span className="md:hidden text-gray-600">Total: </span>
                            <span className="font-medium price-text">
                              {formatPrice(
                                (item.discount 
                                  ? item.price * (1 - item.discount / 100) 
                                  : item.price
                                ) * item.quantity
                              )}
                            </span>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 ml-4 hidden md:inline-block"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cart actions */}
                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <Button 
                      variant="outline"
                      onClick={continueShopping}
                      icon={<i className="fas fa-arrow-left"></i>}
                    >
                      Continue Shopping
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      icon={<i className="fas fa-trash-alt"></i>}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6" data-name="order-summary">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8.25%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="price-text">{formatPrice(orderTotal)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary"
                    fullWidth
                    className="mt-6"
                    onClick={proceedToCheckout}
                    icon={<i className="fas fa-lock"></i>}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-6 text-center text-gray-500 text-sm">
                    <div className="flex items-center justify-center mb-2">
                      <i className="fas fa-shield-alt mr-2"></i>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <i className="fab fa-cc-visa text-2xl"></i>
                      <i className="fab fa-cc-mastercard text-2xl"></i>
                      <i className="fab fa-cc-amex text-2xl"></i>
                      <i className="fab fa-cc-paypal text-2xl"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('CartPage component error:', error);
    reportError(error);
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-8">We're having trouble loading your cart. Please try again later.</p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }
}
