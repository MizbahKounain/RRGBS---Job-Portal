import React, { useState, useEffect } from 'react';
import {
  STORE_PRODUCTS,
  STORE_CATEGORIES,
  SAMPLE_JOINING_KIT_ITEMS,
  StoreProduct,
  CartItem,
} from '../../data/storeData';
import { RRGBSLogo } from '../common/RRGBSLogo';
import { api } from '../../api';
import {
  Phone,
  Mail,
  ShoppingCart,
  Search,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Check,
  CheckCircle2,
  Menu,
  Briefcase,
  Home,
  Sparkles,
  ArrowUp,
  MessageCircle,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

interface RRGBSStoreViewProps {
  onSwitchPortal: (portal: 'home' | 'jobs' | 'services' | 'store') => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'error') => void;
}

export const RRGBSStoreView: React.FC<RRGBSStoreViewProps> = ({
  onSwitchPortal,
  onShowToast,
}) => {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('rrgbsCart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Back to top scroll state
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Checkout modal form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');
  const [customerMessage, setCustomerMessage] = useState('');
  const [isCheckoutSubmitting, setIsCheckoutSubmitting] = useState(false);

  // Bulk quote form state
  const [bulkName, setBulkName] = useState('');
  const [bulkPhone, setBulkPhone] = useState('');
  const [bulkEmail, setBulkEmail] = useState('');
  const [bulkCategory, setBulkCategory] = useState('Housekeeping');
  const [bulkQty, setBulkQty] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [isBulkSubmitting, setIsBulkSubmitting] = useState(false);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rrgbsCart', JSON.stringify(cart));
    } catch {
      // LocalStorage errors ignored
    }
  }, [cart]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ids = ['home', 'shop', 'categories', 'corporate', 'joining', 'bulk'];
    const updateActive = () => {
      const marker = window.scrollY + 120;
      let current = 'home';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      }
      setActiveSection(current);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  const navClass = (id: string) =>
    `relative py-1 cursor-pointer transition-all duration-300 ${activeSection === id ? 'text-[#d71920]' : 'text-[#111111] hover:text-[#d71920]'} after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-[2px] after:bg-[#d71920] after:transition-all after:duration-300 ${activeSection === id ? 'after:w-full' : 'after:w-0'}`;

  // Cart calculations
  const totalCartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalCartAmount = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Add to cart handler
  const handleAddToCart = (product: StoreProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartDrawerOpen(true);
    onShowToast(`Added "${product.name}" to cart`, 'success');
  };

  // Immediate Enquire / Buy Now handler
  const handleBuyNow = (product: StoreProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCheckoutModalOpen(true);
  };

  // Change cart item quantity
  const handleChangeQty = (id: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  // Remove single item from cart
  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    onShowToast('Item removed from cart', 'info');
  };

  // Filtered products list
  const filteredProducts = STORE_PRODUCTS.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Gifts'
        ? prod.category === 'Corporate Gifts'
        : prod.category === selectedCategory);

    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      prod.name.toLowerCase().includes(term) ||
      prod.category.toLowerCase().includes(term) ||
      prod.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Handle Checkout submission via backend + WhatsApp
  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      onShowToast('Your cart is empty. Add products before checkout.', 'error');
      return;
    }
    if (!customerName.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      onShowToast('Please enter a valid name and 10-digit phone number.', 'error');
      return;
    }
    setIsCheckoutSubmitting(true);
    try {
      const orderText = [
        'Hello RRGBS,', '', '*RRGBS BUSINESS STORE ENQUIRY*', '',
        `Customer / Company: ${customerName}`, `Mobile: ${customerPhone}`,
        customerEmail ? `Email: ${customerEmail}` : '',
        customerLocation ? `Location: ${customerLocation}` : '',
        '', '*PRODUCTS ORDERED:*',
        ...cart.map(item => `• ${item.name} × ${item.qty} = ₹${(item.price * item.qty).toLocaleString('en-IN')}`),
        `\n*Estimated Product Total:* ₹${totalCartAmount.toLocaleString('en-IN')} (+ applicable taxes)`,
        customerMessage ? `\nAdditional Requirement: ${customerMessage}` : ''
      ].filter(Boolean).join('\n');
      await api.storeOrder({
        customerName, customerPhone, customerEmail, customerLocation, customerMessage,
        items: cart, totalAmount: totalCartAmount
      });
      window.open(`https://wa.me/916363565865?text=${encodeURIComponent(orderText)}`, '_blank');
      onShowToast('Order enquiry saved. Opening WhatsApp...', 'success');
      setCheckoutModalOpen(false);
      setCart([]);
    } catch (error) {
      onShowToast(error instanceof Error ? error.message : 'Could not save the order enquiry.', 'error');
    } finally {
      setIsCheckoutSubmitting(false);
    }
  };

  // Handle Bulk Quote submission via backend + WhatsApp
  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkName.trim() || bulkPhone.replace(/\D/g, '').length < 10 || !bulkMessage.trim()) {
      onShowToast('Please enter name, valid phone number and requirement.', 'error');
      return;
    }
    setIsBulkSubmitting(true);
    try {
      const text = [
        'Hello RRGBS,', '', '*BUSINESS BULK QUOTE REQUEST*', '',
        `Company / Customer: ${bulkName}`, `Mobile: ${bulkPhone}`,
        bulkEmail ? `Email: ${bulkEmail}` : '',
        `Category: ${bulkCategory}`,
        bulkQty ? `Estimated Quantity: ${bulkQty}` : '',
        `Requirement: ${bulkMessage}`
      ].filter(Boolean).join('\n');
      await api.bulkQuote({
        name: bulkName, phone: bulkPhone, email: bulkEmail,
        category: bulkCategory, quantity: bulkQty, message: bulkMessage
      });
      window.open(`https://wa.me/916363565865?text=${encodeURIComponent(text)}`, '_blank');
      onShowToast('Bulk quote saved. Opening WhatsApp...', 'success');
      setBulkName(''); setBulkPhone(''); setBulkEmail(''); setBulkQty(''); setBulkMessage('');
    } catch (error) {
      onShowToast(error instanceof Error ? error.message : 'Could not save the bulk quote.', 'error');
    } finally {
      setIsBulkSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#d71920] selection:text-white">
      {/* -------------------- 2. STICKY HEADER -------------------- */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5e5e5] shadow-xs">
        <div className="w-[92%] max-w-[1250px] mx-auto min-h-[76px] flex items-center justify-between gap-6">
          {/* Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <RRGBSLogo size={44} />
            <div className="flex flex-col">
              <div className="text-2xl font-black tracking-tight leading-none text-[#111111]">
                RR<span className="text-[#d71920]">GBS</span>
              </div>
              <small className="block mt-1 text-[8.5px] font-bold text-gray-500 tracking-[2px] uppercase">
                BUSINESS STORE
              </small>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-[14px] font-bold text-[#111111]">
            <button
              onClick={() => scrollToSection('home')}
              className={navClass('home')}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className={navClass('shop')}
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection('categories')}
              className={navClass('categories')}
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection('corporate')}
              className={navClass('corporate')}
            >
              Corporate
            </button>
            <button
              onClick={() => scrollToSection('joining')}
              className={navClass('joining')}
            >
              Joining Kits
            </button>
            <button
              onClick={() => scrollToSection('bulk')}
              className={navClass('bulk')}
            >
              Bulk Orders
            </button>
          </nav>

          {/* Header Action: Cart Drawer Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="border border-[#e5e5e5] hover:border-[#d71920] bg-white rounded-lg px-3.5 py-2 relative flex items-center gap-2 font-bold text-sm text-gray-800 transition-colors shadow-xs cursor-pointer group"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-800 group-hover:text-[#d71920] transition-colors" />
              <span className="hidden sm:inline text-xs font-extrabold">Cart</span>
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#d71920] text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-scale">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-800 hover:text-[#d71920] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e5e5e5] px-6 py-5 shadow-xl flex flex-col gap-3.5 text-sm font-bold text-gray-800">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-left py-1 ${activeSection === 'home' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className={`text-left py-1 ${activeSection === 'shop' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Shop Products
            </button>
            <button
              onClick={() => scrollToSection('categories')}
              className={`text-left py-1 ${activeSection === 'categories' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Categories
            </button>
            <button
              onClick={() => scrollToSection('corporate')}
              className={`text-left py-1 ${activeSection === 'corporate' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Corporate Solutions
            </button>
            <button
              onClick={() => scrollToSection('joining')}
              className={`text-left py-1 ${activeSection === 'joining' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Employee Joining Kits
            </button>
            <button
              onClick={() => scrollToSection('bulk')}
              className={`text-left py-1 ${activeSection === 'bulk' ? 'text-[#d71920]' : 'text-gray-800 hover:text-[#d71920]'}`}
            >
              Bulk Orders &amp; Quotes
            </button>

            <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-extrabold">
                Other Portals
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchPortal('jobs');
                }}
                className="text-left text-xs py-1 text-gray-600 hover:text-[#d71920] flex items-center gap-1.5"
              >
                <Briefcase className="w-3.5 h-3.5" /> Jobs Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchPortal('services');
                }}
                className="text-left text-xs py-1 text-gray-600 hover:text-[#d71920] flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Corporate Services
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchPortal('home');
                }}
                className="text-left text-xs py-1 text-gray-600 hover:text-[#d71920] flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5" /> Home Services
              </button>
            </div>
          </div>
        )}
      </header>

      {/* -------------------- 3. HERO SECTION -------------------- */}
      <section
        id="home"
        className="relative bg-gradient-to-r from-black/92 via-black/75 to-black/45 bg-[#222] text-white min-h-[550px] flex items-center overflow-hidden border-b border-gray-900"
      >
        {/* Background circular accent */}
        <div className="absolute -right-32 -bottom-40 w-[550px] h-[550px] rounded-full border-[80px] border-[#d71920]/25 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#d71920]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-[92%] max-w-[1250px] mx-auto py-16 relative z-10">
          <div className="max-w-[760px]">
            <span className="inline-block bg-[#d71920] text-white px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
              RRGBS ONLINE BUSINESS STORE
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-5">
              Everything Your<br />
              <span className="text-[#ff3b42]">Business Needs.</span>
            </h1>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-8 max-w-[680px]">
              Housekeeping products, staff uniforms, IT products, laptops, biometric systems,
              office supplies, safety products, employee joining kits and corporate gifts — all from
              one business supply platform.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollToSection('shop')}
                className="bg-[#d71920] hover:bg-[#a90000] text-white px-6 py-3.5 rounded-md font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('bulk')}
                className="bg-white hover:bg-gray-100 text-[#111111] px-6 py-3.5 rounded-md font-bold text-sm sm:text-base transition-all duration-200 shadow-md hover:-translate-y-0.5 cursor-pointer"
              >
                {isBulkSubmitting ? 'Saving…' : 'Request Bulk Quote'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 4. TRUST / VALUE PROPOSITION BAR -------------------- */}
      <div className="py-6 bg-white border-b border-[#e5e5e5]">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3">
              <strong className="block text-sm sm:text-base font-bold text-gray-900">
                🏢 B2B &amp; B2C
              </strong>
              <span className="text-xs text-gray-500">Business &amp; Individual Orders</span>
            </div>

            <div className="text-center p-3">
              <strong className="block text-sm sm:text-base font-bold text-gray-900">
                📦 Bulk Supply
              </strong>
              <span className="text-xs text-gray-500">Corporate &amp; Institutional Orders</span>
            </div>

            <div className="text-center p-3">
              <strong className="block text-sm sm:text-base font-bold text-gray-900">
                🎨 Custom Branding
              </strong>
              <span className="text-xs text-gray-500">Logo Printing &amp; Embroidery</span>
            </div>

            <div className="text-center p-3">
              <strong className="block text-sm sm:text-base font-bold text-gray-900">
                🧾 GST Invoice
              </strong>
              <span className="text-xs text-gray-500">Business Billing Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- 5. CATEGORIES SECTION -------------------- */}
      <section id="categories" className="py-16 sm:py-20 bg-[#f6f6f6] border-b border-[#e5e5e5]">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto mb-10">
            <div className="text-[#d71920] font-bold text-xs uppercase tracking-[1.5px] mb-2">
              Shop by Category
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
              Business Supplies Under One Roof
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select a category and explore products for your workplace, workforce and business operations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {STORE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  scrollToSection('shop');
                }}
                className="bg-white border border-[#e5e5e5] rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-[#d71920]/40 cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#fff0f0] flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-1 group-hover:text-[#d71920] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-500">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- 6. SHOP SECTION (PRODUCTS CATALOG) -------------------- */}
      <section id="shop" className="py-16 sm:py-20 bg-white border-b border-[#e5e5e5]">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto mb-10">
            <div className="text-[#d71920] font-bold text-xs uppercase tracking-[1.5px] mb-2">
              RRGBS Store
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Browse products or request a custom corporate quotation with wholesale rates.
            </p>
          </div>

          {/* Search & Filters Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products, uniforms, laptops, biometric..."
                className="w-full border border-[#e5e5e5] focus:border-[#d71920] rounded-lg pl-10 pr-10 py-3 text-sm outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                'All',
                'Housekeeping',
                'Uniforms',
                'IT',
                'Biometric',
                'Corporate Gifts',
                'Joining Kits',
                'Safety',
                'Office',
              ].map((categoryName) => {
                const label = categoryName === 'Corporate Gifts' ? 'Gifts' : categoryName;
                const isActive = selectedCategory === categoryName;
                return (
                  <button
                    key={categoryName}
                    onClick={() => setSelectedCategory(categoryName)}
                    className={`px-3 py-2 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#d71920] text-white border-[#d71920] shadow-xs'
                        : 'bg-white text-gray-700 border-[#e5e5e5] hover:border-[#d71920] hover:text-[#d71920]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No products found</h3>
              <p className="text-sm text-gray-500 mb-4">
                Try adjusting your search keyword or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-[#d71920] text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Product visual area */}
                    <div className="h-48 bg-gradient-to-br from-[#f2f2f2] to-[#dddddd] flex items-center justify-center text-6xl relative select-none">
                      <span className="absolute left-3 top-3 bg-[#d71920] text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        {product.tag}
                      </span>
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {product.icon}
                      </span>
                    </div>

                    {/* Product metadata */}
                    <div className="p-4 pb-2">
                      <div className="text-[#d71920] text-[10px] font-extrabold uppercase tracking-wider mb-1">
                        {product.category}
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-1.5 line-clamp-2 min-h-[44px]">
                        {product.name}
                      </h3>

                      <p className="text-gray-500 text-xs line-clamp-2 min-h-[36px] mb-3 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="text-lg font-black text-gray-900 mb-3">
                        ₹{product.price.toLocaleString('en-IN')}{' '}
                        <small className="text-[11px] font-normal text-gray-500">
                          + applicable taxes
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-[#111111] hover:bg-gray-800 text-white py-2 px-2.5 rounded text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>

                      <button
                        onClick={() => handleBuyNow(product)}
                        className="flex-1 bg-[#d71920] hover:bg-[#a90000] text-white py-2 px-2.5 rounded text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -------------------- 7. CORPORATE SOLUTIONS -------------------- */}
      <section id="corporate" className="py-16 sm:py-20 bg-[#f6f6f6] border-b border-[#e5e5e5]">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="text-center max-w-[750px] mx-auto mb-12">
            <div className="text-[#d71920] font-bold text-xs uppercase tracking-[1.5px] mb-2">
              Corporate Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
              Built for Business Procurement
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              RRGBS can support recurring and bulk procurement requirements for companies, institutions and organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Corporate Procurement */}
            <div className="bg-white p-8 sm:p-9 rounded-2xl border border-[#e5e5e5] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🏢 Corporate Procurement
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Centralized supply support for workplace and workforce requirements across Indian locations.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    'Bulk housekeeping supplies',
                    'Employee uniforms',
                    'IT equipment & accessories',
                    'Biometric attendance systems',
                    'Office stationery',
                    'Safety equipment',
                    'Recurring monthly supplies',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-[#d71920] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('bulk')}
                className="bg-[#d71920] hover:bg-[#a90000] text-white px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors self-start cursor-pointer"
              >
                Request Corporate Quote
              </button>
            </div>

            {/* Card 2: Custom Branding */}
            <div className="bg-white p-8 sm:p-9 rounded-2xl border border-[#e5e5e5] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🎨 Custom Branding
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Create branded products for your employees, customers, trade shows and business events.
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    'Company logo printing',
                    'Uniform embroidery',
                    'Branded notebooks',
                    'Corporate mugs & bottles',
                    'Branded bags',
                    'Employee welcome kits',
                    'Event merchandise',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-[#d71920] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => scrollToSection('bulk')}
                className="bg-[#111111] hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors self-start cursor-pointer"
              >
                Discuss Custom Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 8. EMPLOYEE JOINING KITS SPOTLIGHT -------------------- */}
      <section id="joining" className="py-16 sm:py-20 bg-[#111111] text-white border-b border-gray-900">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left Column Content */}
            <div>
              <div className="text-[#ff4148] font-bold text-xs uppercase tracking-[2px] mb-2">
                Employee Onboarding
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.15] mb-4">
                RRGBS Employee Joining Kits
              </h2>
              <p className="text-gray-300 text-base leading-relaxed mb-7 max-w-[500px]">
                Create a professional first-day experience with customized employee joining and welcome kits tailored to your brand identity.
              </p>
              <button
                onClick={() => scrollToSection('bulk')}
                className="bg-[#d71920] hover:bg-[#a90000] text-white px-6 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Create Your Kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Sample Kit Box */}
            <div className="bg-[#1c1c1c] border border-[#333333] rounded-2xl p-7 sm:p-8 shadow-xl">
              <h3 className="font-bold text-lg text-white mb-4 flex items-center justify-between">
                <span>Sample Corporate Joining Kit</span>
                <span className="text-xs bg-[#d71920] px-2.5 py-1 rounded-full font-bold">10 Items</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SAMPLE_JOINING_KIT_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#333333] bg-[#242424] px-3.5 py-3 rounded-lg text-xs sm:text-sm font-medium text-gray-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 9. BULK ORDERS FORM SECTION -------------------- */}
      <section id="bulk" className="py-16 sm:py-20 bg-white border-b border-[#e5e5e5]">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-12 items-start">
            {/* Left info */}
            <div>
              <div className="text-[#d71920] font-bold text-xs uppercase tracking-[2px] mb-2">
                B2B / Bulk Orders
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                Need 10, 100 or 1,000+ Units?
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Send your requirement to RRGBS. Our team can prepare a customized quotation based on quantity, specifications, branding and delivery requirements.
              </p>

              <ul className="space-y-3">
                {[
                  'Corporate bulk pricing',
                  'Custom branding',
                  'GST billing',
                  'Purchase order support',
                  'Recurring supply arrangements',
                  'Employee kit customization',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-700 font-semibold">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-[#d71920] flex items-center justify-center text-xs font-black shrink-0">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right form */}
            <div className="bg-[#f7f7f7] border border-[#e5e5e5] p-6 sm:p-8 rounded-2xl shadow-xs">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Request a Business Quote
              </h3>

              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Company / Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bulkName}
                      onChange={(e) => setBulkName(e.target.value)}
                      placeholder="e.g. Infosys Ltd / John Doe"
                      className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg bg-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bulkPhone}
                      onChange={(e) => setBulkPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg bg-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={bulkEmail}
                      onChange={(e) => setBulkEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg bg-white text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Product Category
                    </label>
                    <select
                      value={bulkCategory}
                      onChange={(e) => setBulkCategory(e.target.value)}
                      className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg bg-white text-sm outline-none transition-colors"
                    >
                      <option>Housekeeping</option>
                      <option>Uniforms</option>
                      <option>IT &amp; Laptops</option>
                      <option>Biometric &amp; Security</option>
                      <option>Corporate Gifts</option>
                      <option>Employee Joining Kits</option>
                      <option>Safety Products</option>
                      <option>Office Supplies</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={bulkQty}
                    onChange={(e) => setBulkQty(e.target.value)}
                    placeholder="Example: 100 units / recurring monthly"
                    className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg bg-white text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Requirement Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    placeholder="Product specifications, branding, delivery location, required date, etc."
                    className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg bg-white text-sm outline-none transition-colors resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#d71920] hover:bg-[#a90000] text-white py-3.5 px-6 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Quote Request on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- 10. FOOTER CTA -------------------- */}
      <section className="py-12 bg-[#d71920] text-white">
        <div className="w-[92%] max-w-[1250px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-1">
              Looking for a Business Supply Partner?
            </h2>
            <p className="text-red-100 text-sm">
              Housekeeping • Uniforms • IT • Biometric • Gifts • Joining Kits
            </p>
          </div>

          <button
            onClick={() => scrollToSection('bulk')}
            className="bg-white hover:bg-gray-100 text-[#111111] px-7 py-3 rounded-lg font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-md shrink-0"
          >
            Contact RRGBS
          </button>
        </div>
      </section>

      {/* -------------------- 11. FOOTER -------------------- */}
      <footer className="bg-[#0b0b0b] text-white pt-14 pb-8 border-t border-gray-900 mt-auto">
        <div className="w-[92%] max-w-[1250px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
            {/* Col 1: Brand Info */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <RRGBSLogo size={38} />
                <div>
                  <div className="text-xl font-black tracking-tight leading-none text-white">
                    RR<span className="text-[#d71920]">GBS</span>
                  </div>
                  <small className="block mt-0.5 text-[8px] font-bold text-gray-400 tracking-[1.5px] uppercase">
                    BUSINESS STORE
                  </small>
                </div>
              </div>

              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                RR Group of Business Solutions — Business-Friendly Services, Staffing, HR, Payroll,
                Facility Management and Business Supply Solutions.
              </p>

              <p className="text-xs text-white font-bold">
                People. Process. Performance.
              </p>
            </div>

            {/* Col 2: Shop */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-3">
                Shop
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Housekeeping');
                      scrollToSection('shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Housekeeping Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Uniforms');
                      scrollToSection('shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Uniforms &amp; Workwear
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('IT');
                      scrollToSection('shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    IT &amp; Laptops
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Biometric');
                      scrollToSection('shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Biometric Systems
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Corporate Gifts');
                      scrollToSection('shop');
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Corporate Gifts
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Business */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-3">
                Business
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection('bulk')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Bulk Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('corporate')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Corporate Procurement
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('corporate')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Custom Branding
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('joining')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    Joining Kits
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('bulk')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    GST Billing
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-white mb-3">
                Contact
              </h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>
                  <a href="tel:+916363565865" className="hover:text-white transition-colors">
                    +91 63635 65865
                  </a>
                </li>
                <li>
                  <a href="tel:+917795362779" className="hover:text-white transition-colors">
                    +91 77953 62779
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@rrgroupofbusinesssolutions.in"
                    className="hover:text-white transition-colors block truncate"
                  >
                    info@rrgroupofbusinesssolutions.in
                  </a>
                </li>
                <li>Shivamogga, Karnataka, India</li>
                <li>
                  <span className="text-[#d71920] font-semibold">
                    Pan-India Business Supply
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#292929] pt-5 text-center text-xs text-gray-500">
            © 2019–2026 RR Group of Business Solutions. RRGBS Business Store. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* -------------------- 12. CART OVERLAY & SLIDE-OVER DRAWER -------------------- */}
      {cartDrawerOpen && (
        <div
          onClick={() => setCartDrawerOpen(false)}
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs transition-opacity"
        />
      )}

      <div
        className={`fixed right-0 top-0 w-[420px] max-w-[94%] h-full bg-white z-50 transition-transform duration-300 shadow-2xl flex flex-col ${
          cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Cart Drawer Header */}
        <div className="p-5 border-b border-[#e5e5e5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#d71920]" />
            <h2 className="text-lg font-bold text-gray-900">
              Your Cart ({totalCartCount})
            </h2>
          </div>
          <button
            onClick={() => setCartDrawerOpen(false)}
            className="p-1 rounded-md text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Drawer Items */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p className="text-sm font-medium">Your cart is currently empty.</p>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  scrollToSection('shop');
                }}
                className="mt-4 text-xs font-bold text-[#d71920] hover:underline"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-3.5 flex items-start gap-3">
                <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                  {item.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button
                        onClick={() => handleChangeQty(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => handleChangeQty(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-[11px] text-[#d71920] hover:underline ml-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-xs font-bold text-gray-900 shrink-0">
                  ₹{(item.price * item.qty).toLocaleString('en-IN')}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#e5e5e5] bg-gray-50">
            <div className="flex items-center justify-between text-base font-bold text-gray-900 mb-4">
              <span>Estimated Subtotal</span>
              <span className="text-[#d71920] text-xl font-black">
                ₹{totalCartAmount.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => {
                setCartDrawerOpen(false);
                setCheckoutModalOpen(true);
              }}
              className="w-full bg-[#d71920] hover:bg-[#a90000] text-white py-3.5 rounded-lg font-bold text-sm tracking-wider uppercase transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* -------------------- 13. CHECKOUT ENQUIRY MODAL -------------------- */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute right-5 top-5 p-1 rounded-md text-gray-400 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-1">
              Order / Business Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-5">
              Submit your cart requirement through WhatsApp. RRGBS will confirm availability, wholesale discounts and delivery.
            </p>

            {/* Cart Summary Snippet */}
            <div className="bg-gray-50 rounded-xl p-3 mb-5 border border-gray-100 text-xs">
              <div className="font-bold text-gray-700 mb-1">
                Order Items ({totalCartCount}):
              </div>
              <div className="max-h-24 overflow-y-auto divide-y divide-gray-200">
                {cart.map((c) => (
                  <div key={c.id} className="py-1 flex justify-between text-gray-600">
                    <span>
                      {c.name} × {c.qty}
                    </span>
                    <span className="font-bold text-gray-900">
                      ₹{(c.price * c.qty).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 mt-1 border-t border-gray-200 flex justify-between font-bold text-gray-900 text-sm">
                <span>Total:</span>
                <span className="text-[#d71920]">₹{totalCartAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Name / Company *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your Name or Enterprise Name"
                  className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg text-sm outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Location
                </label>
                <input
                  type="text"
                  value={customerLocation}
                  onChange={(e) => setCustomerLocation(e.target.value)}
                  placeholder="City, State, Pincode"
                  className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg text-sm outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Additional Requirement
                </label>
                <textarea
                  rows={3}
                  value={customerMessage}
                  onChange={(e) => setCustomerMessage(e.target.value)}
                  placeholder="GST details, customization, branding logo, delivery date, etc."
                  className="w-full p-3 border border-[#ddd] focus:border-[#d71920] rounded-lg text-sm outline-none transition-colors resize-vertical"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#20a464] hover:bg-[#188c52] text-white py-3.5 rounded-lg font-bold text-sm tracking-wide transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Order Enquiry on WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- 14. FLOATING QUICK ACTION BUTTONS -------------------- */}
      <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-2.5">
        {showBackTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-[#111111] hover:bg-[#d71920] text-white flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href="tel:+916363565865"
          className="w-12 h-12 rounded-full bg-[#d71920] hover:bg-[#a90000] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
          aria-label="Call RRGBS Store"
          title="Call RRGBS (+91 63635 65865)"
        >
          <Phone className="w-5 h-5" />
        </a>

        <a
          href="https://wa.me/916363565865?text=Hello%20RRGBS,%20I%20need%20business%20supplies."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25d366] hover:bg-[#1fb355] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
          aria-label="WhatsApp RRGBS Store"
          title="WhatsApp RRGBS"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
