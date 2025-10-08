import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const getRelatedProducts = () => {
    let related = products.filter(p => 
      p.id !== product.id && 
      p.subcategory === product.subcategory
    );
    
    if (related.length < 4) {
      const additionalProducts = products.filter(p => 
        p.id !== product.id && 
        p.category === product.category &&
        !related.includes(p)
      );
      related = [...related, ...additionalProducts];
    }
    
    return related.slice(0, 8);
  };

  const relatedProducts = getRelatedProducts();

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.colors && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        price: product.sale ? product.salePrice! : product.price,
      });
    }
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const handleWishlistToggle = () => {
    const inWishlist = isInWishlist(product.id);
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const displayPrice = product.sale ? product.salePrice! : product.price;
  const inWishlist = isInWishlist(product.id);

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Product Section */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Left: Image */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge variant="secondary" className="text-xs uppercase">
                {product.category}
              </Badge>
              
              <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold">
                {product.name}
              </h1>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-primary text-primary" 
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(128 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {formatPrice(displayPrice)}
                </span>
                {product.sale && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
                {product.sale && (
                  <Badge variant="destructive">
                    Save {Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                  </Badge>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}. Crafted with attention to detail and premium materials, 
              this piece combines timeless elegance with modern comfort. Perfect for any occasion.
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="space-y-3">
                <label className="text-sm font-semibold">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[60px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && (
              <div className="space-y-3">
                <label className="text-sm font-semibold">Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[80px]"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-semibold">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="flex-1"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant={inWishlist ? 'default' : 'outline'}
                size="lg"
                onClick={handleWishlistToggle}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="w-full pt-4">
              <AccordionItem value="materials">
                <AccordionTrigger>Materials & Care</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Premium quality fabric blend</li>
                    <li>• Machine wash cold with like colors</li>
                    <li>• Tumble dry low or hang to dry</li>
                    <li>• Iron on low heat if needed</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Free shipping on orders over $100</li>
                    <li>• Standard delivery: 5-7 business days</li>
                    <li>• Express delivery available at checkout</li>
                    <li>• 30-day return policy for unworn items</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="size-guide">
                <AccordionTrigger>Size Guide</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground mb-3">
                    Our products follow standard sizing. If you're between sizes, we recommend sizing up for a more comfortable fit.
                  </p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• XS: Chest 32-34"</li>
                    <li>• S: Chest 34-36"</li>
                    <li>• M: Chest 36-38"</li>
                    <li>• L: Chest 38-40"</li>
                    <li>• XL: Chest 40-42"</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">
              You May Also Like
            </h2>
            
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {relatedProducts.map((relatedProduct) => {
                  const relatedInWishlist = isInWishlist(relatedProduct.id);
                  const relatedDisplayPrice = relatedProduct.sale ? relatedProduct.salePrice! : relatedProduct.price;
                  
                  return (
                    <CarouselItem key={relatedProduct.id} className="pl-2 md:pl-4 basis-full sm:basis-4/5 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <Card className="overflow-hidden group cursor-pointer" onClick={() => navigate(`/products/${relatedProduct.id}`)}>
                        <CardContent className="p-0">
                          <div className="relative aspect-[3/4] overflow-hidden">
                            <img
                              src={relatedProduct.image}
                              alt={relatedProduct.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {relatedProduct.sale && (
                              <Badge variant="destructive" className="absolute top-4 right-4">
                                Sale
                              </Badge>
                            )}
                            <Button
                              variant="outline"
                              size="icon"
                              className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (relatedInWishlist) {
                                  removeFromWishlist(relatedProduct.id);
                                  toast.success('Removed from wishlist');
                                } else {
                                  addToWishlist(relatedProduct);
                                  toast.success('Added to wishlist');
                                }
                              }}
                            >
                              <Heart className={`w-4 h-4 ${relatedInWishlist ? 'fill-current' : ''}`} />
                            </Button>
                          </div>
                          
                          <div className="p-4 space-y-2">
                            <h3 className="font-semibold text-lg line-clamp-1">
                              {relatedProduct.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {relatedProduct.description}
                            </p>
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg">
                                  {formatPrice(relatedDisplayPrice)}
                                </span>
                                {relatedProduct.sale && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(relatedProduct.price)}
                                  </span>
                                )}
                              </div>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart({
                                    ...relatedProduct,
                                    price: relatedDisplayPrice,
                                  });
                                  toast.success('Added to cart');
                                }}
                              >
                                <ShoppingCart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
