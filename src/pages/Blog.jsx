import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; // optional styling

// Import all markdown posts as raw strings
const posts = import.meta.glob('../data/blog/*.md', { eager: true, as: 'raw' });

export default function Blog() {
    // Convert the imported modules into an array of {slug, content}
    const postEntries = Object.entries(posts).map(([path, content]) => {
        const slug = path.split('/').pop().replace('.md', '');
        // First line is the title (e.g., "# Title")
        const lines = content.split('\n');
        const titleLine = lines[0] || '';
        const title = titleLine.replace(/^#\s*/, '').trim();
        const body = lines.slice(1).join('\n');
        return { slug, title, body };
    });

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Blog – Tips & Tricks for Typing Master</h1>
            {postEntries.map(post => (
                <section key={post.slug} className="mb-8 border-b pb-4">
                    <h2 className="text-2xl font-semibold mb-2">
                        <Link to={`/blog/${post.slug}`} className="hover:underline text-cyan-400">
                            {post.title}
                        </Link>
                    </h2>
                    <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br/>') }} />
                </section>
            ))}
        </div>
    );
}
