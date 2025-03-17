function ProductGrid({ products, loading, error }) {
  try {
    // Navigate to product page on click
    const navigate = (productId) => {
      window.location.hash = `product/${productId}`;
    };
    
    // Loading state
    if (loading) {
      return (
        <div data-name="product-grid-loading" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
              data-name={`product-skeleton-${index}`}
            >
              <div className="h-48 bg-gray-200 shimmer"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 shimmer mb-2"></div>
                <div className="h-4 bg-gray-200 shimmer mb-3 w-2/3"></div>
                <div className="h-4 bg-gray-200 shimmer mb-3"></div>
                <div className="h-10 bg-gray-200 shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    // Error state
    if (error) {
      return (
        <div 
          data-name="product-grid-error"
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.message || 'Failed to load products.'}</span>
        </div>
      );
    }
    
    // No products found
    if (!products || products.length === 0) {
      return (
        <div 
          data-name="no-products-found"
          className="text-center py-10"
        >
          <i className="fas fa-search text-gray-400 text-5xl mb-4"></i>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-500">
            We couldn't find any products matching your criteria. Try adjusting your filters.
          </p>
        </div>
      );
    }
    
    // Product grid
    return (
      <div 
        data-name="product-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {products.map(product => (
          <div key={product.id} data-name={`product-item-${product.id}`}>
            <ProductCard 
              product={product} 
              onClick={() => navigate(product.id)}
            />
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('ProductGrid component error:', error);
    reportError(error);
    return null;
  }
}
