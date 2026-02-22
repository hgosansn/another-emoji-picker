import React, { useState, useMemo } from 'react';
import { useToast } from './Toasty';
import emojiData from 'unicode-emoji-json/data-by-group.json';

function App() {
    const [activeCategory, setActiveCategory] = useState(
        Object.keys(emojiData)[0]
    );
    const [searchQuery, setSearchQuery] = useState('');
    const { addToast } = useToast();

    const handleCopy = (emoji) => {
        navigator.clipboard.writeText(emoji);
        addToast(emoji, 'copied to clipboard', 10000);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return null;
        const results = [];
        for (const [, emojis] of Object.entries(emojiData)) {
            for (const item of emojis) {
                if (
                    item.name.toLowerCase().includes(query) ||
                    item.slug.replace(/_/g, ' ').includes(query)
                ) {
                    results.push(item);
                }
            }
        }
        return results;
    }, [searchQuery]);

    const categories = Object.keys(emojiData);

    return (
        <div className="app-container">
            <nav className="side-nav">
                <div className="header">
                    <a
                        aria-label="repository"
                        href="https://github.com/hgosansn/another-emoji-picker"
                        target="_blank"
                    >
                        <h1>⚡ Emoji Picker</h1>
                    </a>
                </div>
                <div className="scroll category-nav">
                    {categories.map((category) => (
                        <a
                            href={`#${category.replace(/\s/g, '')}`}
                            key={category}
                        >
                            <button
                                className={
                                    !searchQuery && category === activeCategory
                                        ? 'active'
                                        : ''
                                }
                                onClick={() => {
                                    setActiveCategory(category);
                                    setSearchQuery('');
                                }}
                            >
                                {category}
                            </button>
                        </a>
                    ))}
                </div>
            </nav>
            <div className="main-content scroll">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search emojis by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        aria-label="Search emojis"
                    />
                </div>

                {searchResults !== null ? (
                    <div className="emoji-category">
                        <h2>
                            {searchResults.length > 0
                                ? `Results for "${searchQuery}" (${searchResults.length})`
                                : `No results for "${searchQuery}"`}
                        </h2>
                        <div className="emoji-items">
                            {searchResults.map((item) => (
                                <div
                                    key={item.emoji}
                                    className="emoji-item"
                                    onClick={() => handleCopy(item.emoji)}
                                    title={item.name}
                                >
                                    <span className="emoji-symbol">
                                        {item.emoji}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    Object.entries(emojiData).map(([group, emojis]) => (
                        <div
                            key={group}
                            id={group.replace(/\s/g, '')}
                            className="emoji-category"
                        >
                            <h2>{group}</h2>
                            <div className="emoji-items">
                                {emojis.map((item) => (
                                    <div
                                        key={item.emoji}
                                        className="emoji-item"
                                        onClick={() => handleCopy(item.emoji)}
                                        title={item.name}
                                    >
                                        <span className="emoji-symbol">
                                            {item.emoji}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default App;
