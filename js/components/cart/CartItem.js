function CartItem({ item, onUpdateQuantity, onRemove }) {
  try {
    if (!item) return null;
    
    // Calculate the discounted price if there's a discount
    const finalPrice = item.discount 
      ? item.price * (1 - item.discount / 100) 
      : item.price;
    
    // Calculate total price for this item
    const totalPrice = finalPrice * item.quantity;
    
    // Increment quantity
    const incrementQuantity = () => {
      onUpdateQuantity(item.id, item.quantity + 1);
    };
    
    // Decrement quantity
    const decrementQuantity = () => {
      if (item.quantity > 1) {
        onUpdateQuantity(item.id, item.quantity - 1);
      }
    };
    
    // Handle direct quantity input change
    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value);
      if (value > 0) {
        onUpdateQuantity(item.id, value);
      }
    };
    
    return (
      <div data-name="cart-item" className="cart-item py-4">
        <div className="flex items-center">
          {/* Item image */}
          <div className="w-20 h-20 flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover rounded"
              data-name="cart-item-image"
            />
          </div>
          
          {/* Item details */}
          <div className="ml-4 flex-grow">
            <div className="flex justify-between">
              <h4 
                data-name="cart-item-name"
                className="text-sm font-medium text-gray-900"
              >
                {item.name}
              </h4>
              <button 
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500"
                data-name="cart-item-remove"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div data-name="cart-item-price" className="text-sm text-gray-500 mt-1">
              {formatPrice(finalPrice)}
              {item.discount > 0 && (
                <span className="text-xs text-gray-500 line-through ml-2">
                  {formatPrice(item.price)}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              {/* Quantity controls */}
              <div data-name="cart-item-quantity" className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={decrementQuantity}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  data-name="cart-item-decrement"
                >
                  <i className="fas fa-minus text-xs"></i>
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={handleQuantityChange}
                  className="w-10 text-center text-sm border-0 focus:outline-none"
                  data-name="cart-item-quantity-input"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  data-name="cart-item-increment"
                >
                  <i className="fas fa-plus text-xs"></i>
                </button>
              </div>
              
              {/* Total price */}
              <div data-name="cart-item-total" className="text-sm font-medium price-text">
                {formatPrice(totalPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CartItem component error:', error);
    reportError(error);
    return null;
  }
}
