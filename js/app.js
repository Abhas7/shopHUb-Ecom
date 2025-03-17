// Main app component
function App() {
  try {
    const [currentRoute, setCurrentRoute] = React.useState(window.location.hash || '#');
    const { currentUser } = useAuth();
    
    // Handle route changes
    React.useEffect(() => {
      const handleRouteChange = () => {
        setCurrentRoute(window.location.hash || '#');
      };
      
      window.addEventListener('hashchange', handleRouteChange);
      
      return () => {
        window.removeEventListener('hashchange', handleRouteChange);
      };
    }, []);
    
    // Render appropriate page based on route
    const renderPage = () => {
      if (currentRoute.startsWith('#product/')) {
        return <ProductPage />;
      } else if (currentRoute === '#cart') {
        return <CartPage />;
      } else if (currentRoute === '#checkout') {
        // Redirect to login if not authenticated
        if (!currentUser && currentRoute === '#checkout') {
          window.location.hash = 'login';
          return null;
        }
        return <CheckoutPage />;
      } else if (currentRoute === '#login' || currentRoute === '#register') {
        // Redirect to home if already authenticated
        if (currentUser) {
          window.location.hash = '';
          return null;
        }
        return <AuthPage />;
      } else {
        return <HomePage />;
      }
    };
    
    return (
      <div data-name="app" className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
        <CartSidebar />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    reportError(error);
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-8">We're having trouble loading the application. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }
}

// Error boundary for the entire application
function reportError(error) {
  console.error('Application error:', error);
  // In a real app, this would send the error to a logging service
}

// Wrap the app with context providers
function AppWithProviders() {
  return (
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
}

// Render the app
ReactDOM.render(<AppWithProviders />, document.getElementById('root'));
