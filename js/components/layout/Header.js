function Header() {
  try {
    const { currentUser, logout } = useAuth();
    const { getCartCount, toggleCart } = useCart();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [showAccountMenu, setShowAccountMenu] = React.useState(false);
    
    // Fetch categories
    React.useEffect(() => {
      const loadCategories = async () => {
        try {
          const data = await fetchCategories();
          setCategories(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading categories:', error);
          setIsLoading(false);
        }
      };
      
      loadCategories();
    }, []);
    
    const handleLogout = () => {
      logout();
      setShowAccountMenu(false);
    };
    
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    
    const toggleAccountMenu = () => {
      setShowAccountMenu(!showAccountMenu);
    };
    
    const cartCount = getCartCount();
    
    return (
      <header data-name="header" className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div data-name="logo" className="flex-shrink-0 flex items-center">
              <a href="#" onClick={() => window.location.hash = ''} className="text-purple-600 font-bold text-xl">
                ShopHub
              </a>
            </div>
            
            {/* Navigation - Desktop */}
            <nav data-name="desktop-nav" className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#" onClick={() => window.location.hash = ''} className="text-gray-900 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                Home
              </a>
              <div className="relative group">
                <button className="text-gray-900 group-hover:text-purple-600 px-3 py-2 text-sm font-medium flex items-center">
                  Categories
                  <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {isLoading ? (
                      <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                    ) : (
                      categories.map(category => (
                        <a
                          key={category.id}
                          href={`#category/${category.name}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                          role="menuitem"
                        >
                          <i className={`${category.icon} mr-2`}></i>
                          {category.name}
                        </a>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <a href="#deals" className="text-gray-900 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                Deals
              </a>
              <a href="#new-arrivals" className="text-gray-900 hover:text-purple-600 px-3 py-2 text-sm font-medium">
                New Arrivals
              </a>
            </nav>
            
            {/* Search, Cart, Account - Desktop */}
            <div data-name="desktop-actions" className="hidden md:flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-bar w-64 pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.hash = `search/${searchQuery}`;
                    }
                  }}
                />
                <div className="absolute left-3 top-2 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              
              <div className="relative mx-4">
                <button
                  onClick={toggleCart}
                  className="text-gray-600 hover:text-purple-600 focus:outline-none"
                  aria-label="Cart"
                >
                  <i className="fas fa-shopping-cart text-xl"></i>
                  {cartCount > 0 && <Badge count={cartCount} />}
                </button>
              </div>
              
              <div className="relative ml-4">
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={toggleAccountMenu}
                      className="flex items-center focus:outline-none"
                      aria-label="Account menu"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        {currentUser.name.charAt(0)}
                      </div>
                    </button>
                    
                    {showAccountMenu && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <p className="font-medium">{currentUser.name}</p>
                            <p className="text-xs text-gray-500">{currentUser.email}</p>
                          </div>
                          <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" role="menuitem">
                            <i className="fas fa-user mr-2"></i> Profile
                          </a>
                          <a href="#orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" role="menuitem">
                            <i className="fas fa-box mr-2"></i> Orders
                          </a>
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700" 
                            role="menuitem"
                          >
                            <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a 
                    href="#login" 
                    className="text-gray-900 hover:text-purple-600 px-3 py-2 text-sm font-medium"
                  >
                    Sign in
                  </a>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div data-name="mobile-menu-button" className="flex md:hidden">
              <button
                onClick={toggleCart}
                className="text-gray-600 hover:text-purple-600 focus:outline-none mr-4"
                aria-label="Cart"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {cartCount > 0 && <Badge count={cartCount} />}
              </button>
              
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-purple-600 focus:outline-none"
                aria-label="Open menu"
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div data-name="mobile-menu" className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              <div className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-bar w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.hash = `search/${searchQuery}`;
                      setIsMenuOpen(false);
                    }
                  }}
                />
                <div className="absolute left-7 top-5 text-gray-400">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              
              <a 
                href="#" 
                onClick={() => {
                  window.location.hash = '';
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
              >
                Home
              </a>
              
              <div className="px-3 py-2 rounded-md text-base font-medium text-gray-900">
                Categories
                <div className="ml-4 mt-2 space-y-1">
                  {isLoading ? (
                    <div className="text-sm text-gray-500">Loading...</div>
                  ) : (
                    categories.map(category => (
                      <a
                        key={category.id}
                        href={`#category/${category.name}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1 text-sm text-gray-700 hover:text-purple-700"
                      >
                        <i className={`${category.icon} mr-2`}></i>
                        {category.name}
                      </a>
                    ))
                  )}
                </div>
              </div>
              
              <a 
                href="#deals" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
              >
                Deals
              </a>
              
              <a 
                href="#new-arrivals" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
              >
                New Arrivals
              </a>
              
              {!currentUser ? (
                <a 
                  href="#login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
                >
                  Sign in
                </a>
              ) : (
                <div className="border-t mt-2 pt-2">
                  <div className="px-3 py-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      {currentUser.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{currentUser.name}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <a 
                    href="#profile" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <i className="fas fa-user mr-2"></i> Profile
                  </a>
                  
                  <a 
                    href="#orders" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <i className="fas fa-box mr-2"></i> Orders
                  </a>
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    reportError(error);
    return null;
  }
}
