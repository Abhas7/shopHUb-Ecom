function AuthPage() {
  try {
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    // Toggle between login and register forms
    const toggleForm = () => {
      setIsLogin(!isLogin);
      setError(null);
    };
    
    // Handle input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      
      try {
        setLoading(true);
        
        if (isLogin) {
          // Login
          await login(formData.email, formData.password);
          // Redirect to home page after successful login
          window.location.hash = '';
        } else {
          // Register validation
          if (formData.password !== formData.confirmPassword) {
            throw new Error('Passwords do not match');
          }
          
          if (formData.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
          }
          
          // Register
          await register(formData.name, formData.email, formData.password);
          // Redirect to home page after successful registration
          window.location.hash = '';
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err.message || 'Authentication failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <div data-name="auth-page" className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? 
                'Enter your credentials to access your account' : 
                'Fill out the form below to create your account'}
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                    data-name="name-input"
                  />
                </div>
              )}
              
              <div className={!isLogin ? "mb-4" : ""}>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? "rounded-t-md" : ""} focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  data-name="email-input"
                />
              </div>
              
              <div className={!isLogin ? "mb-4" : ""}>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${isLogin ? "rounded-b-md" : ""} focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  data-name="password-input"
                />
              </div>
              
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    data-name="confirm-password-input"
                  />
                </div>
              )}
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                data-name="submit-button"
              >
                {loading ? (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i className="fas fa-spinner fa-spin"></i>
                  </span>
                ) : (
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}`}></i>
                  </span>
                )}
                {loading ? 'Processing...' : (isLogin ? 'Sign in' : 'Sign up')}
              </button>
            </div>
            
            <div className="text-center">
              <button
                type="button"
                onClick={toggleForm}
                className="font-medium text-purple-600 hover:text-purple-500"
                data-name="toggle-form-button"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <i className="fab fa-google text-red-600 mr-2"></i>
                    Google
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <i className="fab fa-facebook text-blue-600 mr-2"></i>
                    Facebook
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AuthPage component error:', error);
    reportError(error);
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-8">We're having trouble loading the authentication page. Please try again later.</p>
        <Button onClick={() => window.location.hash = ''}>Return to Home</Button>
      </div>
    );
  }
}
