import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import springTrends from '@/assets/blog/spring-trends.jpg';

const BlogDetail = () => {
  const { id } = useParams();

  // Mock blog post data
  const post = {
    id: id || '1',
    title: 'Spring Fashion Trends 2025',
    image: springTrends,
    author: 'Emma Wilson',
    date: 'March 15, 2025',
    category: 'Trends',
    content: `
      <p>Spring is just around the corner, and with it comes a fresh wave of fashion trends that promise to redefine style this season. From bold colors to innovative silhouettes, 2025's spring collection is all about making a statement while embracing comfort and sustainability.</p>

      <h2>Vibrant Color Palettes</h2>
      <p>This spring, expect to see a burst of vibrant hues dominating the fashion scene. Emerald green, coral pink, and electric blue are leading the charge, offering a refreshing departure from neutral tones. These colors can be incorporated through statement pieces or subtle accessories to add a pop of personality to any outfit.</p>

      <h2>Sustainable Fashion Forward</h2>
      <p>Sustainability continues to be at the forefront of fashion innovation. Brands are increasingly using eco-friendly materials like organic cotton, recycled polyester, and innovative plant-based fabrics. This trend not only benefits the environment but also ensures that your wardrobe choices align with conscious consumer values.</p>

      <h2>Oversized Silhouettes</h2>
      <p>Comfort meets style with the continued popularity of oversized silhouettes. From flowing blazers to relaxed-fit trousers, this trend offers both ease of movement and a sophisticated aesthetic. Pair oversized tops with fitted bottoms for a balanced, modern look.</p>

      <h2>Statement Accessories</h2>
      <p>Accessories are taking center stage this spring. Chunky jewelry, bold sunglasses, and statement bags are essential for elevating any outfit. These pieces allow you to express your personal style while keeping your wardrobe fresh and exciting.</p>

      <h2>How to Incorporate These Trends</h2>
      <p>Start by selecting one or two trends that resonate with your personal style. Mix these new pieces with classic wardrobe staples to create a balanced, contemporary look. Remember, fashion is about self-expression, so don't be afraid to experiment and make these trends your own.</p>
    `,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-navy text-navy-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] mb-12 rounded-lg overflow-hidden bg-muted">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
