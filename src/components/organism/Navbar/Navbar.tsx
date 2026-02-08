import Link from 'next/link';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation, useLanguageQuery, LanguageSwitcher } from 'next-export-i18n';
import CartContext from '@/context/CartContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';

export default function Navbar() {
  const router = useRouter();
  const { cartState } = useContext(CartContext);
  const { currency, setCurrency } = useCurrency();
  const { t } = useTranslation();
  const [query] = useLanguageQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const itemCount = cartState.totalItems;

  const currentLang = query?.lang || 'en';

  const navLinks = [
    { href: '/', label: t('navbar.home'), isActive: router.pathname === '/' },
    {
      href: '/service',
      label: t('navbar.service'),
      isActive: router.pathname.startsWith('/service'),
    },
    {
      href: '/products',
      label: t('navbar.products'),
      isActive: router.pathname.startsWith('/products'),
    },
    {
      href: '/ActivityHighlights',
      label: t('navbar.highlights'),
      isActive: router.pathname === '/ActivityHighlights',
    },
    {
      href: '/aboutMe',
      label: t('navbar.aboutMe'),
      isActive: router.pathname === '/aboutMe',
    },
  ];

  return (
    <div
      className={`sticky top-0 z-50 w-full flex flex-col bg-white/95 backdrop-blur-sm shadow-md transition-all ${
        isMenuOpen ? 'h-screen md:h-auto' : ''
      }`}
    >
        {/* Title Bar */}
        <div className="w-full px-4 md:px-8 py-2 md:py-4 flex items-center justify-between border-b border-gray-100">
          <div>
            <Link
              href="/"
              className="text-xl md:text-3xl font-extrabold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
            >
              {t('navbar.brand')}
            </Link>
          </div>
          <div>
            <div className="flex items-center gap-3 md:gap-8">
              {/* Cart Icon with Badge */}
              <Link
                href="/cart"
                className="relative group hover:text-blue-600 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">
                    🛒
                  </span>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] md:text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center animate-bounce">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Desktop Language Dropdown */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => {
                    setShowLanguageDropdown(!showLanguageDropdown);
                    setShowCurrencyDropdown(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center text-xl"
                  aria-label="Language"
                  title="Language"
                >
                  🌐
                </button>
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 px-4 z-[100]">
                    <div className="flex gap-4">
                      <LanguageSwitcher lang="en">
                        <span
                          onClick={() => setShowLanguageDropdown(false)}
                          className={`text-sm whitespace-nowrap cursor-pointer ${currentLang === 'en' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                          EN
                        </span>
                      </LanguageSwitcher>
                      <span className="text-gray-200">|</span>
                      <LanguageSwitcher lang="zh">
                        <span
                          onClick={() => setShowLanguageDropdown(false)}
                          className={`text-sm whitespace-nowrap cursor-pointer ${currentLang === 'zh' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                        >
                          繁中
                        </span>
                      </LanguageSwitcher>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Currency Dropdown */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => {
                    setShowCurrencyDropdown(!showCurrencyDropdown);
                    setShowLanguageDropdown(false);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center text-xl"
                  aria-label="Currency"
                  title="Currency"
                >
                  💲
                </button>
                {showCurrencyDropdown && (
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-3 px-4 z-[100]">
                    <div className="flex gap-2">
                      {(['TWD', 'USD', 'CNY'] as CurrencyCode[]).map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setCurrency(code);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`text-xs px-2 py-1 rounded-md transition-all ${
                            currency === code
                              ? 'bg-black text-white'
                              : 'bg-gray-50 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={'/signIn'}
                className="hidden md:block text-xs md:text-sm font-semibold uppercase tracking-wide hover:text-blue-600 transition-colors"
              >
                {t('navbar.signIn')}
              </Link>
              <Link
                href={'/signUp'}
                className="hidden md:block text-xs md:text-sm font-semibold uppercase tracking-wide px-3 md:px-4 py-1.5 md:py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all hover:shadow-lg"
              >
                {t('navbar.signUp')}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center font-bold text-lg"
                aria-label="Menu"
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Bar */}
        <div className="hidden md:flex w-full px-8 py-3 items-center gap-10 justify-center bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base hover:text-black hover:underline underline-offset-4 transition-all uppercase tracking-wider whitespace-nowrap ${
                link.isActive
                  ? 'font-semibold text-black'
                  : 'font-medium text-gray-600'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Full-Screen Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex-1 bg-white flex flex-col overflow-y-auto">
          {/* Navigation Links */}
          <div className="flex flex-col border-b border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-4 text-lg uppercase tracking-wide border-b border-gray-50 transition-colors ${
                  link.isActive
                    ? 'font-semibold text-black bg-gray-50'
                    : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sign In/Up */}
          <div className="px-6 py-6 border-b border-gray-100">
            <div className="flex gap-4">
              <Link
                href="/signIn"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 py-3 text-center text-sm font-semibold uppercase tracking-wide border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                {t('navbar.signIn')}
              </Link>
              <Link
                href="/signUp"
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 py-3 text-center text-sm font-semibold uppercase tracking-wide bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                {t('navbar.signUp')}
              </Link>
            </div>
          </div>

          {/* Language Section */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🌐</span>
              <div className="flex gap-4">
                <LanguageSwitcher lang="en">
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base cursor-pointer ${currentLang === 'en' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    EN
                  </span>
                </LanguageSwitcher>
                <span className="text-gray-200">|</span>
                <LanguageSwitcher lang="zh">
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base cursor-pointer ${currentLang === 'zh' ? 'font-bold text-black' : 'text-gray-500 hover:text-black'}`}
                  >
                    繁中
                  </span>
                </LanguageSwitcher>
              </div>
            </div>
          </div>

          {/* Currency Section */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">💲</span>
              <div className="flex flex-wrap gap-3">
                {(['TWD', 'USD', 'CNY'] as CurrencyCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setIsMenuOpen(false);
                    }}
                    className={`text-sm px-4 py-2 rounded-full transition-all ${
                      currency === code
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
    </div>
  );
}
