import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '10K+', label: 'Happy Customers' },
    { icon: Award, value: '10+', label: 'Years Experience' },
    { icon: Globe, value: '50+', label: 'Countries Served' },
    { icon: Heart, value: '99%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            About Eleganza
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in">
            Founded with a passion for timeless style, Eleganza has been crafting premium fashion 
            experiences for discerning customers worldwide. Our commitment to quality, sustainability, 
            and exceptional service sets us apart.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <stat.icon className="h-10 w-10 mx-auto mb-4 text-navy" />
                <div className="font-playfair text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <h2 className="font-playfair text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Eleganza began with a simple vision: to make premium fashion accessible to everyone 
                who appreciates quality and timeless design. What started as a small boutique has 
                grown into a global fashion destination.
              </p>
              <p>
                Our curators travel the world to bring you the finest materials and latest trends, 
                ensuring each piece in our collection meets our exacting standards. We believe that 
                true style is eternal, and every garment should be an investment in your confidence.
              </p>
              <p>
                Today, we're proud to serve customers in over 50 countries, but our commitment 
                remains unchanged: exceptional quality, timeless design, and service that exceeds 
                expectations.
              </p>
            </div>
          </div>
          <div className="bg-muted aspect-square rounded-lg animate-fade-in" />
        </div>

        {/* Values */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on the quality of our materials or craftsmanship.'
              },
              {
                title: 'Sustainability',
                description: 'Committed to ethical sourcing and environmentally conscious practices.'
              },
              {
                title: 'Customer Care',
                description: 'Your satisfaction is our priority, from browsing to delivery and beyond.'
              }
            ].map((value, index) => (
              <Card 
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
