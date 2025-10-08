import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">ELEGANZA</h3>
            <p className="text-sm text-navy-foreground/80 mb-4">
              Your destination for premium fashion and timeless style.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-navy-foreground hover:text-blush">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-navy-foreground hover:text-blush">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-navy-foreground hover:text-blush">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">Shop</Link></li>
              <li><Link to="/blog" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">Shipping Info</Link></li>
              <li><Link to="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">Returns</Link></li>
              <li><Link to="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">Size Guide</Link></li>
              <li><Link to="#" className="text-navy-foreground/80 hover:text-navy-foreground transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-navy-foreground/80 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-navy-foreground/10 border-navy-foreground/20 text-navy-foreground placeholder:text-navy-foreground/50"
              />
              <Button variant="secondary" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-foreground/20 pt-6 text-center text-sm text-navy-foreground/60">
          <p>&copy; {new Date().getFullYear()} Eleganza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
