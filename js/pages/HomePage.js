function HomePage() {
  try {
    const [featuredProducts, setFeaturedProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(1000);
    const [searchQuery, setSearchQuery] = React.useState('');
    
    // Load featured products and categories on initial render
    React.useEffect(() => {
      const loadInitialData = async () => {
        try {
          setLoading(true);
          
          // Fetch featured products
          const featuredData = await fetchFeaturedProducts();
          setFeaturedProducts(featuredData);
          
          // Fetch categories
          const categoriesData = await fetchCategories();
          setCategories(categoriesData);
          
          // Fetch all products
          const productsData = await fetchProducts();
          setProducts(productsData);
          
          setLoading(false);
        } catch (err) {
          console.error('Error loading initial data:', err);
          setError(err);
          setLoading(false);
        }
      };
      
      loadInitialData();
    }, []);
    
    // Handle category selection
    const handleCategorySelect = async (category) => {
      try {
        setLoading(true);
        setSelectedCategory(category);
        
        // Fetch products with filters
        const filters = {
          category: category,
          minPrice: minPrice,
          maxPrice: maxPrice,
          search: searchQuery
        };
        
        const filteredProducts = await fetchProducts(filters);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error filtering by category:', err);
        setError(err);
        setLoading(false);
      }
    };
    
    // Handle price filter change
    const handlePriceChange = async (min, max) => {
      try {
        setLoading(true);
        setMinPrice(min);
        setMaxPrice(max);
        
        // Fetch products with filters
        const filters = {
          category: selectedCategory,
          minPrice: min,
          maxPrice: max,
          search: searchQuery
        };
        
        const filteredProducts = await fetchProducts(filters);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error filtering by price:', err);
        setError(err);
        setLoading(false);
      }
    };
    
    // Handle search
    const handleSearch = async (query) => {
      try {
        setLoading(true);
        setSearchQuery(query);
        
        // Fetch products with filters
        const filters = {
          category: selectedCategory,
          minPrice: minPrice,
          maxPrice: maxPrice,
          search: query
        };
        
        const filteredProducts = await fetchProducts(filters);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error searching products:', err);
        setError(err);
        setLoading(false);
      }
    };
    
    return (
      <div data-name="home-page">
        {/* Hero section */}
        <section data-name="hero-section" className="hero-section text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-4">Shop the Latest Trends</h1>
              <p className="text-lg mb-8">
                Discover amazing products at unbeatable prices. Free shipping on orders over $50.
              </p>
              <Button 
                variant="primary" 
                size="large"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.scrollTo({ top: document.getElementById('products').offsetTop, behavior: 'smooth' })}
              >
                Shop Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured products section */}
        <section data-name="featured-section" className="featured-section py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Featured Products</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
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
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> Failed to load featured products.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onClick={() => window.location.hash = `product/${product.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* Categories section */}
        <section data-name="categories-section" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
            
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-4 text-center shimmer">
                    <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-2"></div>
                    <div className="h-5 bg-gray-200 w-20 mx-auto"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> Failed to load categories.</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map(category => (
                  <a 
                    key={category.id}
                    href={`#category/${category.name}`}
                    className="bg-gray-100 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors"
                  >
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-2">
                      <i className={`${category.icon} text-2xl category-icon`}></i>
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* All products section */}
        <section id="products" data-name="products-section" className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">All Products</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters sidebar */}
              <div className="w-full md:w-64 space-y-6">
                <SearchBar
                  initialQuery={searchQuery}
                  onSearch={handleSearch}
                />
                
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                />
                
                <PriceFilter
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onPriceChange={handlePriceChange}
                />
              </div>
              
              {/* Products grid */}
              <div className="flex-1">
                <ProductGrid
                  products={products}
                  loading={loading}
                  error={error}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('HomePage component error:', error);
    reportError(error);
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-8">We're having trouble loading this page. Please try again later.</p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }
}
