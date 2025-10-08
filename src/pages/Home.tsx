import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, ShoppingBag, Heart } from 'lucide-react';
import { products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import heroBanner from '@/assets/hero-banner.jpg';

const Home = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Absolutely love the quality and style! The fit is perfect and the fabric feels premium.',
    },
    {
      name: 'Michael Chen',
      rating: 5,
      text: 'Best online shopping experience. Fast delivery and beautiful packaging.',
    },
    {
      name: 'Emma Williams',
      rating: 5,
      text: 'The customer service is outstanding. Will definitely shop here again!',
    },
  ];

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
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-white mb-6">
              Timeless Elegance
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover premium fashion that defines your style
            </p>
            <Link to="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              About Eleganza
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We curate premium fashion pieces that blend timeless elegance with contemporary style. 
              Each item is carefully selected to ensure the highest quality and craftsmanship, 
              helping you build a wardrobe that stands the test of time.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground text-lg">
              Handpicked pieces for the discerning shopper
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover-lift animate-fade-in border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.sale && (
                      <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                        Sale
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(product);
                      }}
                      className="absolute top-4 left-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart 
                        className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-primary'}`}
                      />
                    </button>
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                      {product.description}
                    </p>
                  </Link>
                  <div className="flex items-center justify-between">
                    <div>
                      {product.sale && product.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-accent">
                            {formatPrice(product.salePrice)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-bold">{formatPrice(product.price)}</span>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleAddToCart(product)}
                      className="bg-navy text-navy-foreground hover:bg-navy/90"
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline" className="font-semibold">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-20 bg-navy text-navy-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            End Season Sale
          </h2>
          <p className="text-xl mb-8 text-navy-foreground/90">
            Up to 40% off on selected items
          </p>
          <Link to="/sale">
            <Button size="lg" variant="secondary" className="font-semibold">
              Shop Sale <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Real feedback from our satisfied shoppers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
