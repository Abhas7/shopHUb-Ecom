function ProductPage() {
  try {
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [relatedProducts, setRelatedProducts] = React.useState([]);
    
    // Get product ID from URL hash
    const getProductId = () => {
      const hash = window.location.hash;
      const match = hash.match(/product\/(\d+)/);
      return match ? match[1] : null;
    };
    
    // Load product data
    React.useEffect(() => {
      const loadProduct = async () => {
        const productId = getProductId();
        
        if (!productId) {
          setError(new Error('Invalid product ID'));
          setLoading(false);
          return;
        }
        
        try {
          setLoading(true);
          setError(null);
          
          // Fetch product details
          const productData = await fetchProductById(productId);
          setProduct(productData);
          
          // Fetch related products (same category)
          const relatedData = await fetchProducts({ 
            category: productData.category,
          });
          
          // Filter out the current product and limit to 4 items
          setRelatedProducts(
            relatedData
              .filter(item => item.id !== productData.id)
              .slice(0, 4)
          );
          
          setLoading(false);
          
          // Scroll to top when product changes
          window.scrollTo(0, 0);
        } catch (err) {
          console.error('Error loading product:', err);
          setError(err);
          setLoading(false);
        }
      };
      
      loadProduct();
      
      // Listen for hash changes to reload product data
      const handleHashChange = () => {
        loadProduct();
      };
      
      window.addEventListener('hashchange', handleHashChange);
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
      };
    }, []);
    
    return (
      <div data-name="product-page" className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-600">Home</a>
                <span className="mx-2">/</span>
              </li>
              {product && (
                <li>
                  <a href={`#category/${product.category}`} className="hover:text-purple-600">
                    {product.category}
                  </a>
                  <span className="mx-2">/</span>
                </li>
              )}
              <li className="text-gray-900 font-medium">
                {product ? product.name : 'Product Details'}
              </li>
            </ol>
          </nav>
          
          {/* Product details */}
          <ProductDetail 
            product={product}
            loading={loading}
            error={error}
          />
          
          {/* Related products section */}
          {!loading && !error && product && (
            <div className="mt-16" data-name="related-products">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              
              {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {relatedProducts.map(relatedProduct => (
                    <ProductCard 
                      key={relatedProduct.id} 
                      product={relatedProduct}
                      onClick={() => window.location.hash = `product/${relatedProduct.id}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No related products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProductPage component error:', error);
    reportError(error);
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-8">We're having trouble loading this product. Please try again later.</p>
        <Button onClick={() => window.location.href = '#'}>Return to Home</Button>
      </div>
    );
  }
}
