import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import springTrends from '@/assets/blog/spring-trends.jpg';
import capsuleWardrobe from '@/assets/blog/capsule-wardrobe.jpg';
import sustainableFashion from '@/assets/blog/sustainable-fashion.jpg';
import accessories from '@/assets/blog/accessories.jpg';
import fabricCare from '@/assets/blog/fabric-care.jpg';

const Blog = () => {
  const posts = [
    {
      id: '1',
      title: 'Spring Fashion Trends 2025',
      excerpt: 'Discover the hottest trends for the upcoming spring season and how to incorporate them into your wardrobe.',
      image: springTrends,
      author: 'Emma Wilson',
      date: 'March 15, 2025',
      category: 'Trends',
    },
    {
      id: '2',
      title: 'Building a Capsule Wardrobe',
      excerpt: 'Learn how to create a versatile wardrobe with essential pieces that never go out of style.',
      image: capsuleWardrobe,
      author: 'James Anderson',
      date: 'March 10, 2025',
      category: 'Style Guide',
    },
    {
      id: '3',
      title: 'Sustainable Fashion Choices',
      excerpt: 'Making eco-friendly fashion choices without compromising on style or quality.',
      image: sustainableFashion,
      author: 'Sarah Martinez',
      date: 'March 5, 2025',
      category: 'Sustainability',
    },
    {
      id: '4',
      title: 'The Art of Accessorizing',
      excerpt: 'Master the art of accessorizing to elevate any outfit from simple to stunning.',
      image: accessories,
      author: 'Michael Brown',
      date: 'February 28, 2025',
      category: 'Tips',
    },
    {
      id: '5',
      title: 'Caring for Premium Fabrics',
      excerpt: 'Essential tips for maintaining and caring for your luxury garments to ensure longevity.',
      image: fabricCare,
      author: 'Emma Wilson',
      date: 'February 20, 2025',
      category: 'Care Guide',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Fashion Journal
          </h1>
          <p className="text-muted-foreground text-lg">
            Style tips, trends, and insights from our fashion experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card 
              key={post.id}
              className="group overflow-hidden hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[16/10] bg-muted">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-navy text-navy-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </div>
                </div>
                <h2 className="font-playfair text-xl font-bold mb-3 group-hover:text-navy transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="link" className="p-0 h-auto font-semibold text-navy">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
