import React, { useState } from 'react';

const categories = {
    'Smileys & Emotion': [0x1f600, 0x1f64f],
    'Miscellaneous Symbols and Pictographs': [0x1f300, 0x1f5ff],
    'Transport and Map Symbols': [0x1f680, 0x1f6ff],
    'Supplemental Symbols and Pictographs': [0x1f900, 0x1f9ff],
    'Symbols and Pictographs Extended-A': [0x1fa70, 0x1faff],
    'Miscellaneous Symbols': [0x2600, 0x26ff],
    Dingbats: [0x2700, 0x27bf],
    'Miscellaneous Technical': [0x2300, 0x23ff],
    'Enclosed Alphanumeric Supplement': [0x1f100, 0x1f1ff],
    'Enclosed Ideographic Supplement': [0x1f200, 0x1f2ff],
    'Geometric Shapes': [0x25a0, 0x25ff],
    Flags: [0x1f1e6, 0x1f1ff],
    'Playing Cards': [0x1f0a0, 0x1f0ff],
    'Mahjong Tiles': [0x1f004, 0x1f004],
    'Skin Tone Modifiers': [0x1f3fb, 0x1f3ff],
    'Keycap Characters': [0x20e3, 0x20e3],
    'Variation Selectors': [0xfe00, 0xfe0f],
    'Tag Characters': [0xe0020, 0xe007f],
};

function App() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(
        Object.keys(categories)[0]
    );

    const generateEmojis = (start, end) => {
        const emojis = [];
        for (let codePoint = start; codePoint <= end; codePoint++) {
            const symbol = String.fromCodePoint(codePoint);
            const hex = codePoint.toString(16).toUpperCase();
            emojis.push({ symbol, hex });
        }
        return emojis;
    };

    const handleCopy = (emoji) => {
        navigator.clipboard.writeText(emoji);
        alert(`Copied ${emoji} to clipboard!`);
    };
    const filteredEmojis = generateEmojis(...categories[activeCategory]).filter(
        (emoji) => emoji.hex.includes(search.toUpperCase())
    );

    return (
        <div className="app-container">
            <nav className="side-nav scroll">
                {Object.keys(categories).map((category) => (
                    <button
                        key={category}
                        className={category === activeCategory ? 'active' : ''}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </nav>
            <div className="main-content scroll">
                <h1>⚡ Emoji Picker</h1>
                {/* <input
              type="text"
              placeholder="Search by hex..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            /> */}
                <div className="emoji-grid">
                    {filteredEmojis.map((emoji) => (
                        <div
                            key={emoji.symbol}
                            className="emoji-item"
                            onClick={() => handleCopy(emoji.symbol)}
                        >
                            <span className="emoji-symbol">{emoji.symbol}</span>
                            <div className="emoji-hex">Hex: {emoji.hex}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
