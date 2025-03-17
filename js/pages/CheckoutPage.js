function CheckoutPage() {
  try {
    const { cart, getCartTotal, clearCart } = useCart();
    const { currentUser } = useAuth();
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [orderComplete, setOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [formErrors, setFormErrors] = React.useState({});
    
    // Form state
    const [formData, setFormData] = React.useState({
      email: currentUser?.email || '',
      firstName: currentUser?.name?.split(' ')[0] || '',
      lastName: currentUser?.name?.split(' ')[1] || '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      saveInfo: false
    });
    
    // Calculate order totals
    const cartTotal = getCartTotal();
    const shipping = cartTotal >= 50 || cartTotal === 0 ? 0 : 5.99;
    const tax = cartTotal * 0.0825;
    const orderTotal = cartTotal + shipping + tax;
    
    // Redirect to home if cart is empty
    React.useEffect(() => {
      if (cart.length === 0 && !orderComplete) {
        window.location.hash = '';
      }
    }, [cart, orderComplete]);
    
    // Handle input changes
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
      
      // Clear error when field is edited
      if (formErrors[name]) {
        setFormErrors({
          ...formErrors,
          [name]: ''
        });
      }
    };
    
    // Validate form
    const validateForm = () => {
      const errors = {};
      
      // Required fields
      const requiredFields = [
        'email', 'firstName', 'lastName', 'address', 
        'city', 'state', 'zipCode', 'cardName', 
        'cardNumber', 'expiryDate', 'cvv'
      ];
      
      requiredFields.forEach(field => {
        if (!formData[field].trim()) {
          errors[field] = 'This field is required';
        }
      });
      
      // Email validation
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
      
      // Card number validation (simple check for 16 digits)
      if (formData.cardNumber && !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      // Expiry date validation (MM/YY format)
      if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        errors.expiryDate = 'Please use MM/YY format';
      }
      
      // CVV validation (3 or 4 digits)
      if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'CVV must be 3 or 4 digits';
      }
      
      // Zip code validation (5 digits)
      if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
        errors.zipCode = 'Please enter a valid 5-digit zip code';
      }
      
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validateForm()) {
        // Scroll to first error
        const firstError = document.querySelector('.error-message');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      try {
        setIsProcessing(true);
        
        // Prepare order data
        const orderData = {
          items: cart,
          customer: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          },
          payment: {
            cardName: formData.cardName,
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv
          },
          totals: {
            subtotal: cartTotal,
            shipping: shipping,
            tax: tax,
            total: orderTotal
          },
          date: new Date().toISOString()
        };
        
        // Process order
        const result = await processCheckout(orderData);
        
        if (result.success) {
          setOrderId(result.orderId);
          setOrderComplete(true);
          clearCart();
        } else {
          throw new Error(result.message || 'Failed to process order');
        }
      } catch (err) {
        console.error('Error processing order:', err);
        alert(`Error: ${err.message || 'Failed to process your order. Please try again.'}`);
      } finally {
        setIsProcessing(false);
      }
    };
    
    // Order success screen
    if (orderComplete) {
      return (
        <div data-name="order-success" className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-check text-green-500 text-3xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700">Order ID: <span className="font-semibold">{orderId}</span></p>
                <p className="text-gray-700 mt-2">A confirmation email has been sent to <span className="font-semibold">{formData.email}</span></p>
              </div>
              <Button
                variant="primary"
                onClick={() => window.location.hash = ''}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div data-name="checkout-page" className="py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout form */}
            <div className="lg:w-2/3">
              <form onSubmit={handleSubmit}>
                {/* Contact information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1 error-message">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                
                {/* Shipping information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formErrors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1 error-message">{formErrors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.state ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.state && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.state}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.zipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.zipCode && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.zipCode}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="country" className="block text-gray-700 mb-1">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
                
                {/* Payment information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="cardName" className="block text-gray-700 mb-1">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        formErrors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.cardName && (
                      <p className="text-red-500 text-sm mt-1 error-message">{formErrors.cardName}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-gray-700 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pl-10 ${
                          formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <div className="absolute left-3 top-2.5">
                        <i className="fas fa-credit-card text-gray-400"></i>
                      </div>
                    </div>
                    {formErrors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1 error-message">{formErrors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          formErrors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {formErrors.cvv && (
                        <p className="text-red-500 text-sm mt-1 error-message">{formErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="rounded text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-700">Save payment information for future purchases</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href="#cart" 
                    className="flex items-center text-purple-600 hover:text-purple-800"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Cart
                  </a>
                  <Button
                    type="submit"
                    variant="primary"
                    size="large"
                    disabled={isProcessing}
                    icon={isProcessing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-lock"></i>}
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24" data-name="order-summary">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                {/* Order items */}
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-3">Items ({cart.length})</h3>
                  <div className="max-h-60 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center py-2 border-b last:border-b-0">
                        <div className="w-12 h-12 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-medium price-text">
                          {formatPrice(
                            (item.discount 
                              ? item.price * (1 - item.discount / 100) 
                              : item.price
                            ) * item.quantity
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8.25%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="price-text">{formatPrice(orderTotal)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center text-gray-500 text-sm">
                  <div className="flex items-center justify-center mb-2">
                    <i className="fas fa-shield-alt mr-2"></i>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <i className="fab fa-cc-visa text-2xl"></i>
                    <i className="fab fa-cc-mastercard text-2xl"></i>
                    <i className="fab fa-cc-amex text-2xl"></i>
                    <i className="fab fa-cc-paypal text-2xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CheckoutPage component error:', error);
    reportError(error);
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-8">We're having trouble loading the checkout page. Please try again later.</p>
        <Button onClick={() => window.location.hash = 'cart'}>Return to Cart</Button>
      </div>
    );
  }
}
