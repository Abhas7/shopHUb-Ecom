function ProductCard({ product, onClick }) {
  try {
    if (!product) return null;
    
    const { addToCart } = useCart();
    
    // Calculate the discounted price if there's a discount
    const finalPrice = product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;
    
    const handleAddToCart = (e) => {
      e.stopPropagation();
      addToCart(product, 1);
    };
    
    return (
      <div 
        data-name="product-card"
        className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 product-card-hover"
        onClick={onClick}
      >
        {/* Product image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
            data-name="product-image"
          />
          {product.discount > 0 && (
            <div 
              data-name="discount-badge"
              className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded"
            >
              {product.discount}% OFF
            </div>
          )}
          {!product.inStock && (
            <div 
              data-name="out-of-stock-overlay"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="p-4">
          <h3 
            data-name="product-name"
            className="text-lg font-medium text-gray-900 mb-1 line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>
          
          <div data-name="product-category" className="text-sm text-gray-500 mb-2">
            {product.category}
          </div>
          
          <div data-name="product-rating" className="mb-3">
            <Rating value={product.rating} showValue={true} />
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          
          <div data-name="product-price" className="flex items-end mb-3">
            <span className="text-lg font-bold price-text">
              {formatPrice(finalPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <Button
            data-name="add-to-cart-button"
            variant="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={!product.inStock}
            icon={<i className="fas fa-shopping-cart"></i>}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProductCard component error:', error);
    reportError(error);
    return null;
  }
}
