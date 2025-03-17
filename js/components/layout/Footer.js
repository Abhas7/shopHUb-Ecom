function Footer() {
  try {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer data-name="footer" className="bg-gray-800 text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div data-name="company-info">
              <h2 className="text-xl font-bold mb-4">ShopHub</h2>
              <p className="text-gray-300 mb-4">
                Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent service.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            {/* Shop */}
            <div data-name="shop-links">
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#new-arrivals" className="text-gray-300 hover:text-white transition-colors">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#deals" className="text-gray-300 hover:text-white transition-colors">
                    Best Deals
                  </a>
                </li>
                <li>
                  <a href="#category/Electronics" className="text-gray-300 hover:text-white transition-colors">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#category/Fashion" className="text-gray-300 hover:text-white transition-colors">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#category/Home & Kitchen" className="text-gray-300 hover:text-white transition-colors">
                    Home & Kitchen
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Customer Service */}
            <div data-name="customer-service-links">
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#shipping" className="text-gray-300 hover:text-white transition-colors">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#returns" className="text-gray-300 hover:text-white transition-colors">
                    Returns & Exchanges
                  </a>
                </li>
                <li>
                  <a href="#track-order" className="text-gray-300 hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div data-name="newsletter">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for the latest products and exclusive offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r-md transition-colors"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
          
          {/* Bottom section */}
          <div data-name="footer-bottom" className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} ShopHub. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0">
                <ul className="flex space-x-6 text-sm text-gray-400">
                  <li>
                    <a href="#terms" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#cookies" className="hover:text-white transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    reportError(error);
    return null;
  }
}
