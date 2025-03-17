const AuthContext = React.createContext();

function AuthProvider({ children }) {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    // Check if user is logged in on initial render
    React.useEffect(() => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        setLoading(false);
      }
    }, []);
    
    const login = (email, password) => {
      return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
          // Simple validation
          if (email === 'user@example.com' && password === 'password123') {
            const user = {
              id: '1',
              email: 'user@example.com',
              name: 'John Doe',
              role: 'customer'
            };
            
            setCurrentUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            resolve(user);
          } else {
            reject(new Error('Invalid email or password'));
          }
        }, 800);
      });
    };
    
    const register = (name, email, password) => {
      return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
          // In a real app, this would validate and create a new user
          const user = {
            id: Math.random().toString(36).substring(2, 15),
            email,
            name,
            role: 'customer'
          };
          
          setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        }, 800);
      });
    };
    
    const logout = () => {
      setCurrentUser(null);
      localStorage.removeItem('user');
    };
    
    const value = {
      currentUser,
      login,
      register,
      logout,
      loading
    };
    
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  } catch (error) {
    console.error('AuthProvider error:', error);
    reportError(error);
    return null;
  }
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
