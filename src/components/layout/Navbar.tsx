import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState, useEffect, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const currencies: Currency[] = ['USD', 'AED', 'SAR', 'EUR'];

  const isActive = (path: string) => location.pathname === path;

  const categories = [
    {
      title: "Men's Fashion",
      items: ['Shirts', 'Pants', 'Jackets', 'Shoes', 'Accessories']
    },
    {
      title: "Women's Fashion",
      items: ['Dresses', 'Tops', 'Skirts', 'Shoes', 'Accessories']
    },
    {
      title: "Collections",
      items: ['New Arrivals', 'Best Sellers', 'Sale Items', 'Premium']
    }
  ];

  // Click outside to close mega menu (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMegaMenuOpen && megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMegaMenuOpen]);

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-navy text-navy-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <p>Free shipping on orders over $100</p>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-navy-foreground hover:text-navy-foreground/80 h-auto py-1">
                  {currency} <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover z-[100]">
                {currencies.map((curr) => (
                  <DropdownMenuItem key={curr} onClick={() => setCurrency(curr)}>
                    {curr}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-playfair text-2xl font-bold text-primary">
            ELEGANZA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
              Home
            </Link>
            
            <div className="relative" ref={megaMenuRef}>
              <button
                onClick={handleProductsClick}
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${isActive('/products') ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Products <ChevronDown className={`h-4 w-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-popover border border-border rounded-lg shadow-lg p-6 z-[60]">
                  <div className="grid grid-cols-3 gap-6">
                    {categories.map((category, idx) => (
                      <div key={idx}>
                        <h3 className="font-playfair font-semibold mb-3 text-sm">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link 
                                to="/products" 
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMegaMenuOpen(false)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/blog" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/blog') ? 'text-primary' : 'text-muted-foreground'}`}>
              Blog
            </Link>
            <Link to="/sale" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/sale') ? 'text-primary' : 'text-muted-foreground'}`}>
              End Season Sale
            </Link>
            <Link to="/about" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/about') ? 'text-primary' : 'text-muted-foreground'}`}>
              About Us
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/contact') ? 'text-primary' : 'text-muted-foreground'}`}>
              Contact
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sheet Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="font-playfair text-2xl">Menu</SheetTitle>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-8rem)] mt-8">
            <nav className="flex flex-col gap-4 pr-4">
              <Link 
                to="/" 
                className={`py-2 text-base font-medium transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Products Collapsible */}
              <Collapsible open={isProductsOpen} onOpenChange={setIsProductsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-base font-medium hover:text-primary transition-colors">
                  Products <ChevronDown className={`h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 ml-4 space-y-4">
                  {categories.map((category, idx) => (
                    <div key={idx} className="space-y-2">
                      <p className="font-semibold text-sm text-muted-foreground">{category.title}</p>
                      <ul className="ml-4 space-y-2">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link 
                              to="/products" 
                              className="text-sm text-foreground hover:text-primary transition-colors block py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
              <Link 
                to="/blog" 
                className={`py-2 text-base font-medium transition-colors ${isActive('/blog') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/sale" 
                className={`py-2 text-base font-medium transition-colors ${isActive('/sale') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                End Season Sale
              </Link>
              <Link 
                to="/about" 
                className={`py-2 text-base font-medium transition-colors ${isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className={`py-2 text-base font-medium transition-colors ${isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
