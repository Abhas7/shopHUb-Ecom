function CategoryFilter({ selectedCategory, onSelectCategory }) {
  try {
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    
    // Fetch categories
    React.useEffect(() => {
      const loadCategories = async () => {
        try {
          setLoading(true);
          const data = await fetchCategories();
          setCategories(data);
          setLoading(false);
        } catch (err) {
          console.error('Error loading categories:', err);
          setError(err);
          setLoading(false);
        }
      };
      
      loadCategories();
    }, []);
    
    // Handle category selection
    const handleCategoryClick = (categoryName) => {
      onSelectCategory(categoryName === selectedCategory ? null : categoryName);
    };
    
    // Loading state
    if (loading) {
      return (
        <div data-name="category-filter-loading" className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-8 bg-gray-200 shimmer rounded"></div>
            ))}
          </div>
        </div>
      );
    }
    
    // Error state
    if (error) {
      return (
        <div 
          data-name="category-filter-error"
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> Failed to load categories.</span>
        </div>
      );
    }
    
    return (
      <div data-name="category-filter" className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                data-name={`category-item-${category.id}`}
              >
                <span className="flex items-center">
                  <i className={`${category.icon} mr-2 category-icon`}></i>
                  {category.name}
                </span>
                {selectedCategory === category.name && (
                  <i className="fas fa-check-circle text-purple-600"></i>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('CategoryFilter component error:', error);
    reportError(error);
    return null;
  }
}
