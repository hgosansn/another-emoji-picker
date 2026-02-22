import React, { useState, useMemo, useRef } from 'react';
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

    const inputRef = useRef(null);

    const clearSearch = () => {
        setSearchQuery('');
        inputRef.current?.focus();
    };

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return null;
        const results = [];
        for (const [, emojis] of Object.entries(emojiData)) {
            for (const item of emojis.emojis) {
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

    const categories = Object.values(emojiData);

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
                    {categories.map((category) => {
                        const id = category.name.replace(/\s/g, '');
                        return (
                        <a href={`#${id}`} key={category.name}>
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
                                {category.name}
                            </button>
                        </a>
                        );
                    })}
                </div>
            </nav>
            <div className="main-content scroll">
                <div className="search-bar">
                    <div className="search-input-wrapper">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search emojis by name..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            aria-label="Search emojis"
                        />
                        {searchQuery && (
                            <button
                                className="clear-btn"
                                onClick={clearSearch}
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>
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
                    Object.entries(emojiData).map(([group, emojis]) => {
                        const id = emojis.name.replace(/\s/g, '');
                        return (
                        <div
                            key={emojis.name}
                            id={id}
                            className="emoji-category"
                        >
                            <h2>{emojis.name}</h2>
                            <div className="emoji-items">
                                {emojis.emojis.map((item) => (
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
                    )})
                )}
            </div>
        </div>
    );
}

export default App;
