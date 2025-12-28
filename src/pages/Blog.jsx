import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, User, Tag } from 'lucide-react';
import './Blog.css';

// Import all markdown posts as raw strings
const posts = import.meta.glob('../data/blog/*.md', { eager: true, query: '?raw', import: 'default' });

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
    // Normalize line endings (Windows CRLF to LF)
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        // Fallback for posts without frontmatter
        const lines = content.split('\n');
        const titleLine = lines[0] || '';
        const title = titleLine.replace(/^#\s*/, '').trim();
        return {
            title,
            excerpt: lines.slice(1, 4).join(' ').trim().substring(0, 150) + '...',
            category: 'General',
            date: new Date().toISOString().split('T')[0],
            readTime: '5 min read',
            featured: false,
            author: 'TypeMaster Pro Team',
            body: lines.slice(1).join('\n')
        };
    }

    const [, frontmatter, body] = match;
    const metadata = {};

    frontmatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            // Convert boolean strings
            if (value === 'true') value = true;
            if (value === 'false') value = false;
            metadata[key] = value;
        }
    });

    return { ...metadata, body };
}

export default function Blog() {
    // Convert the imported modules into an array of parsed posts
    const postEntries = Object.entries(posts)
        .map(([path, content]) => {
            const slug = path.split('/').pop().replace('.md', '');
            const parsed = parseFrontmatter(content);
            return { slug, ...parsed };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Separate featured post from regular posts
    const featuredPost = postEntries.find(post => post.featured);
    const regularPosts = postEntries.filter(post => !post.featured);

    // Category colors
    const categoryColors = {
        'Productivity': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        'Tutorial': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        'Health': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        'Development': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        'Improvement': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
        'Motivation': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        'General': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="blog-container">
            {/* Hero Section */}
            <header className="blog-header">
                <h1 className="blog-title">
                    The TypeMaster Blog
                </h1>
                <p className="blog-subtitle">
                    Insights, guides, and research-backed tips to help you become a faster,
                    more accurate typist. Master the keyboard and boost your productivity.
                </p>
            </header>

            {/* Featured Post */}
            {featuredPost && (
                <section className="featured-section">
                    <Link to={`/blog/${featuredPost.slug}`} className="featured-card">
                        <div className="featured-badge">
                            <span>Featured Article</span>
                        </div>
                        <div className="featured-content">
                            <div className="featured-meta">
                                <span className={`category-badge ${categoryColors[featuredPost.category] || categoryColors['General']}`}>
                                    <Tag className="w-3 h-3" />
                                    {featuredPost.category}
                                </span>
                                <span className="meta-item">
                                    <Clock className="w-4 h-4" />
                                    {featuredPost.readTime}
                                </span>
                                <span className="meta-item">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(featuredPost.date)}
                                </span>
                            </div>
                            <h2 className="featured-title">{featuredPost.title}</h2>
                            <p className="featured-excerpt">{featuredPost.excerpt}</p>
                            <div className="featured-cta">
                                <span>Read Article</span>
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Posts Grid */}
            <section className="posts-section">
                <h2 className="section-title">Latest Articles</h2>
                <div className="posts-grid">
                    {regularPosts.map(post => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="post-card"
                        >
                            <div className="post-card-header">
                                <span className={`category-badge ${categoryColors[post.category] || categoryColors['General']}`}>
                                    <Tag className="w-3 h-3" />
                                    {post.category}
                                </span>
                            </div>
                            <h3 className="post-card-title">{post.title}</h3>
                            <p className="post-card-excerpt">{post.excerpt}</p>
                            <div className="post-card-footer">
                                <div className="post-card-meta">
                                    <span className="meta-item">
                                        <Clock className="w-4 h-4" />
                                        {post.readTime}
                                    </span>
                                    <span className="meta-item">
                                        <Calendar className="w-4 h-4" />
                                        {formatDate(post.date)}
                                    </span>
                                </div>
                                <span className="read-more">
                                    Read More
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="newsletter-section">
                <div className="newsletter-content">
                    <h2 className="newsletter-title">Improve Your Typing Skills</h2>
                    <p className="newsletter-text">
                        Ready to put these tips into practice? Start a typing lesson now and track your progress.
                    </p>
                    <Link to="/lessons" className="newsletter-cta">
                        Start Practicing
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
