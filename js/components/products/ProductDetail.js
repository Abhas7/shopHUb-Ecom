function ProductDetail({ product, loading, error }) {
  try {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = React.useState(1);
    
    // Handle quantity changes
    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value);
      if (value > 0) {
        setQuantity(value);
      }
    };
    
    // Increment quantity
    const incrementQuantity = () => {
      setQuantity(prev => prev + 1);
    };
    
    // Decrement quantity
    const decrementQuantity = () => {
      setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };
    
    // Add to cart handler
    const handleAddToCart = () => {
      addToCart(product, quantity);
    };
    
    // Loading state
    if (loading) {
      return (
        <div data-name="product-detail-loading" className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="h-80 bg-gray-200 shimmer rounded-lg"></div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h-8 bg-gray-200 shimmer mb-4 w-3/4"></div>
              <div className="h-6 bg-gray-200 shimmer mb-4 w-1/4"></div>
              <div className="h-6 bg-gray-200 shimmer mb-6 w-1/3"></div>
              <div className="h-24 bg-gray-200 shimmer mb-6"></div>
              <div className="h-10 bg-gray-200 shimmer mb-4"></div>
              <div className="h-12 bg-gray-200 shimmer"></div>
            </div>
          </div>
        </div>
      );
    }
    
    // Error state
    if (error) {
      return (
        <div 
          data-name="product-detail-error"
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message || 'Failed to load product details.'}</span>
        </div>
      );
    }
    
    // No product found
    if (!product) {
      return (
        <div 
          data-name="product-not-found"
          className="text-center py-10"
        >
          <i className="fas fa-exclamation-circle text-gray-400 text-5xl mb-4"></i>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-500 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.hash = ''}
          >
            Back to Home
          </Button>
        </div>
      );
    }
    
    // Calculate the discounted price if there's a discount
    const finalPrice = product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;
    
    return (
      <div data-name="product-detail" className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                data-name="product-detail-image"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 
              data-name="product-detail-name"
              className="text-2xl font-bold text-gray-900 mb-2"
            >
              {product.name}
            </h1>
            
            <div data-name="product-detail-category" className="text-sm text-gray-500 mb-3">
              Category: {product.category}
            </div>
            
            <div data-name="product-detail-rating" className="mb-4">
              <Rating value={product.rating} size="large" showValue={true} />
              <span className="text-sm text-gray-500 ml-2">
                ({product.reviews} customer reviews)
              </span>
            </div>
            
            <div data-name="product-detail-price" className="mb-6">
              <span className="text-2xl font-bold text-purple-600">
                {formatPrice(finalPrice)}
              </span>
              {product.discount > 0 && (
                <div className="mt-1">
                  <span className="text-lg text-gray-500 line-through mr-2">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                    Save {product.discount}% ({formatPrice(product.price - finalPrice)})
                  </span>
                </div>
              )}
            </div>
            
            <p data-name="product-detail-description" className="text-gray-700 mb-6">
              {product.description}
            </p>
            
            <div data-name="product-detail-stock" className="mb-4">
              <span className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? (
                  <span><i className="fas fa-check-circle mr-1"></i> In Stock</span>
                ) : (
                  <span><i className="fas fa-times-circle mr-1"></i> Out of Stock</span>
                )}
              </span>
            </div>
            
            {product.inStock && (
              <div className="mb-6">
                <div data-name="product-detail-quantity" className="flex items-center">
                  <span className="mr-3 text-gray-700">Quantity:</span>
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={decrementQuantity}
                      className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                      data-name="quantity-decrement"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 text-center focus:outline-none"
                      data-name="quantity-input"
                    />
                    <button
                      onClick={incrementQuantity}
                      className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                      data-name="quantity-increment"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <Button
              data-name="add-to-cart-button"
              variant="primary"
              size="large"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              fullWidth
              className="mb-4"
              icon={<i className="fas fa-shopping-cart"></i>}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <div data-name="product-detail-actions" className="flex space-x-4">
              <Button
                variant="outline"
                size="medium"
                className="flex-1"
                icon={<i className="far fa-heart"></i>}
              >
                Wishlist
              </Button>
              <Button
                variant="outline"
                size="medium"
                className="flex-1"
                icon={<i className="fas fa-share-alt"></i>}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProductDetail component error:', error);
    reportError(error);
    return null;
  }
}
