import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const Products = () => {
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'men', label: "Men's Fashion" },
    { id: 'women', label: "Women's Fashion" },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Our Collection
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore our carefully curated selection of premium fashion
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? 'bg-navy text-navy-foreground' : ''}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
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
                {product.sale && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Sale
                  </div>
                )}
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
                {product.colors && (
                  <div className="flex gap-1 mb-3">
                    {product.colors.slice(0, 3).map((color, idx) => (
                      <div 
                        key={idx}
                        className="w-5 h-5 rounded-full border border-border"
                        style={{ 
                          backgroundColor: color.toLowerCase() === 'white' ? '#fff' : 
                                         color.toLowerCase() === 'black' ? '#000' : 
                                         color.toLowerCase() === 'navy' ? '#1e3a5f' : 
                                         color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#888' :
                                         color.toLowerCase() === 'blue' ? '#3b82f6' :
                                         color.toLowerCase() === 'khaki' ? '#c3b091' :
                                         color.toLowerCase()
                        }}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
              </Link>
                <div className="flex items-center justify-between px-4 pb-4">
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
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
