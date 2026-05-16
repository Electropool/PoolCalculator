import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import './blog.css';

const posts = [
  {
    id: 'what-resistor-for-led',
    title: 'What Resistor Should I Use for My LED? (Complete Guide)',
    excerpt: 'Step-by-step formula, common LED colors and forward voltages, E24 standard values explained, solved examples for 5V/9V/12V.',
    date: 'May 15, 2026',
    author: 'Admin',
    image: '/images/calculator_resistorforled.png'
  },
  {
    id: 'how-to-read-resistor-color-codes',
    title: 'How to Read Resistor Color Codes: Complete Beginner Guide',
    excerpt: 'Full color-by-color table, memory tricks (ROY G BIV), common values, and practice examples for 4-band and 5-band resistors.',
    date: 'May 10, 2026',
    author: 'Admin',
    image: '/images/calculator_resistor.png'
  },
  {
    id: 'eia-96-smd-resistor-code-guide',
    title: 'Understanding EIA-96 SMD Resistor Codes: Complete Reference',
    excerpt: 'Complete EIA-96 table, multiplier letter meanings, and comparison with 3-digit and 4-digit systems.',
    date: 'May 5, 2026',
    author: 'Admin',
    image: '/images/calculator_descrip_resistor.png'
  }
];

export default function BlogIndex() {
  return (
    <>
      <SEOHead
        title="Electronics Engineering Blog – Tips, Tutorials & Guides | PoolCalc"
        description="Learn about resistor color codes, LED circuit design, SMD components, and more. Practical electronics engineering guides for students and hobbyists."
        keywords="electronics blog, resistor guide, LED tutorial, SMD code reference, electronics engineering"
        canonical="/blog"
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>Electronics Engineering Blog</h1>
            <p>Practical guides and tutorials to help you master electronics fundamentals.</p>
          </div>

          <div className="blog-grid">
            {posts.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">{post.date} • {post.author}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <span className="read-more">Read Full Article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
