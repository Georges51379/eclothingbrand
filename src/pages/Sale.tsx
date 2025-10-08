import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Clock } from 'lucide-react';
import { products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sale = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  // Countdown timer (3 days from now)
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const saleProducts = products.filter(p => p.sale);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
    });
  };

  const handleWishlistToggle = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-accent to-blush py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-4 text-foreground">
            End Season Sale
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">
            Up to 40% off on selected items
          </p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <div key={index} className="bg-card text-card-foreground rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                <div className="text-xs text-muted-foreground uppercase">{item.label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/70">
            <Clock className="h-4 w-4" />
            <span>Limited time offer - Shop before it's gone!</span>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover-lift animate-fade-in border-border cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link to={`/products/${product.id}`}>
                <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                  <img
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                    -{Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}%
                  </div>
                </div>
                </Link>
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className="absolute top-4 left-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart 
                      className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-primary'}`}
                    />
                  </button>
                <Link to={`/products/${product.id}`}>
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {product.subcategory}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
                </Link>
                  <div className="flex items-center justify-between px-4 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-accent text-lg">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="bg-navy text-navy-foreground hover:bg-navy/90"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
              </Card>
            ))}
          </div>

          {saleProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No sale items available at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Sale;
