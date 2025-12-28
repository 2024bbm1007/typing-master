import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Tag } from 'lucide-react';
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
            if ((value.startsWith('"') && value.endsWith('"')) ||
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            if (value === 'true') value = true;
            if (value === 'false') value = false;
            metadata[key] = value;
        }
    });

    return { ...metadata, body };
}

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
    let html = markdown;

    // Code blocks (must be processed before inline code)
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');

    // Tables
    html = html.replace(/^\|(.+)\|$/gm, (match, content) => {
        const cells = content.split('|').map(cell => cell.trim());
        const isHeader = cells.every(cell => /^-+$/.test(cell));
        if (isHeader) return ''; // Skip separator rows
        const tag = 'td';
        const row = cells.map(cell => `<${tag}>${cell}</${tag}>`).join('');
        return `<tr>${row}</tr>`;
    });

    // Wrap tables
    html = html.replace(/(<tr>[\s\S]*?<\/tr>)(\s*<tr>[\s\S]*?<\/tr>)+/g, (match) => {
        // Convert first row to header
        const rows = match.split('</tr>').filter(r => r.trim());
        if (rows.length > 0) {
            rows[0] = rows[0].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>');
        }
        return `<table>${rows.join('</tr>')}${rows.length > 0 ? '</tr>' : ''}</table>`;
    });

    // Unordered lists
    html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');
    html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

    // Paragraphs
    html = html.split('\n\n').map(block => {
        block = block.trim();
        if (!block) return '';
        if (block.startsWith('<')) return block;
        return `<p>${block.replace(/\n/g, '<br>')}</p>`;
    }).join('\n\n');

    return html;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

export default function BlogPost() {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Get all posts for related posts section
    const allPosts = Object.entries(posts)
        .map(([path, content]) => {
            const postSlug = path.split('/').pop().replace('.md', '');
            const parsed = parseFrontmatter(content);
            return { slug: postSlug, ...parsed };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    // Find current post
    const currentPost = allPosts.find(p => p.slug === slug);

    if (!currentPost) {
        return (
            <div className="blog-post-container">
                <Link to="/blog" className="blog-post-back">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
                    <p className="text-gray-400">The article you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    // Get related posts (different category or random)
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug)
        .slice(0, 2);

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

    const htmlContent = markdownToHtml(currentPost.body);

    return (
        <div className="blog-post-container">
            <Link to="/blog" className="blog-post-back">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
            </Link>

            <article>
                <header className="blog-post-header">
                    <div className="blog-post-meta">
                        <span className={`category-badge ${categoryColors[currentPost.category] || categoryColors['General']}`}>
                            <Tag className="w-3 h-3" />
                            {currentPost.category}
                        </span>
                        <span className="meta-item">
                            <Clock className="w-4 h-4" />
                            {currentPost.readTime}
                        </span>
                        <span className="meta-item">
                            <Calendar className="w-4 h-4" />
                            {formatDate(currentPost.date)}
                        </span>
                        <span className="meta-item">
                            <User className="w-4 h-4" />
                            {currentPost.author}
                        </span>
                    </div>
                    <h1 className="blog-post-title">{currentPost.title}</h1>
                    <p className="blog-post-excerpt">{currentPost.excerpt}</p>
                </header>

                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="related-posts">
                    <h2 className="related-posts-title">Continue Reading</h2>
                    <div className="related-posts-grid">
                        {relatedPosts.map(post => (
                            <Link
                                key={post.slug}
                                to={`/blog/${post.slug}`}
                                className="related-post-card"
                            >
                                <h3 className="related-post-title">{post.title}</h3>
                                <div className="related-post-meta">
                                    {post.readTime} · {formatDate(post.date)}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
