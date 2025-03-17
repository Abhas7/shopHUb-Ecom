function CartSidebar() {
  try {
    const { 
      cart, 
      isCartOpen, 
      closeCart, 
      removeFromCart, 
      updateQuantity, 
      getCartTotal 
    } = useCart();
    
    const cartTotal = getCartTotal();
    
    // Calculate shipping (free over $50)
    const shipping = cartTotal >= 50 || cartTotal === 0 ? 0 : 5.99;
    
    // Calculate tax (8.25%)
    const tax = cartTotal * 0.0825;
    
    // Calculate order total
    const orderTotal = cartTotal + shipping + tax;
    
    return (
      <div 
        data-name="cart-sidebar"
        className={`cart-sidebar fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 transform transition-transform ${isCartOpen ? 'open' : 'closed'}`}
      >
        {/* Cart header */}
        <div data-name="cart-header" className="bg-gray-100 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Your Cart ({cart.length})
          </h2>
          <button 
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            data-name="close-cart-button"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {/* Cart body */}
        <div 
          data-name="cart-body"
          className="p-4 overflow-y-auto"
          style={{ height: 'calc(100% - 180px)' }}
        >
          {cart.length === 0 ? (
            <div data-name="empty-cart" className="text-center py-10">
              <i className="fas fa-shopping-cart text-gray-300 text-5xl mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button 
                variant="primary" 
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div data-name="cart-items">
              {cart.map(item => (
                <CartItem 
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Cart footer */}
        {cart.length > 0 && (
          <div 
            data-name="cart-footer"
            className="absolute bottom-0 left-0 right-0 bg-gray-50 p-4 border-t"
          >
            <div data-name="cart-summary" className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base mt-3 pt-3 border-t">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                variant="primary"
                fullWidth
                onClick={() => {
                  window.location.hash = 'checkout';
                  closeCart();
                }}
                icon={<i className="fas fa-lock"></i>}
              >
                Checkout
              </Button>
              <Button 
                variant="outline"
                fullWidth
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('CartSidebar component error:', error);
    reportError(error);
    return null;
  }
}
