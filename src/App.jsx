import React, { useState } from 'react';
import { useToast } from './Toasty';

const categories = {
    'Smileys & Emotion': ['0x1f600-0x1f64f'],
    'People & Body': [
        '0x1F385',
        '0x1F3C2',
        '0x1F3C3',
        '0x1F3C4',
        '0x1F3C7',
        '0x1F3CA',
        '0x1F3CB',
        '0x1F3CC',
        '0x1F574-0x1F575',
        '0x1F57A',
        '0x1F590',
        '0x1F595-0x1F596',
        '0x1F645-0x1F647',
        '0x1F64B-0x1F64F',
        '0x1F6A3',
        '0x1F6B4-0x1F6B6',
        '0x1F6C0',
        '0x1F6CC',
        '0x1F918-0x1F91F',
        '0x1F926-0x1F927',
        '0x1F930-0x1F939',
        '0x1F93C-0x1F93E',
        '0x1F977-0x1F979',
        '0x1F97B',
        '0x1F9B5-0x1F9B6',
        '0x1F9B8-0x1F9B9',
        '0x1F9BB',
        '0x1F9CD-0x1F9CF',
        '0x1F9D1-0x1F9DD',
    ],
    'Animals & Nature': [
        '0x1F400-0x1F43F',
        '0x1F54A',
        '0x1F577-0x1F579',
        '0x1F58C-0x1F58D',
        '0x1F98A-0x1F9A2',
    ],
    'Food & Drink': ['0x1F32D-0x1F32F', '0x1F330-0x1F37F'],
    'Travel & Places': [
        '0x1F3D4-0x1F3DF',
        '0x1F3E0-0x1F3F0',
        '0x1F680-0x1F6FF',
    ],
    Activities: ['0x1F3A0-0x1F3C3', '0x1F3C5-0x1F3D3', '0x1F3F8-0x1F3FA'],
    Objects: ['0x1F4A0-0x1F4FF', '0x1F5E1-0x1F5FF', '0x1F6E0-0x1F6E5'],
    Symbols: [
        '0x1F191-0x1F251',
        '0x1F300-0x1F321',
        '0x1F524',
        '0x1F52E-0x1F53D',
    ],
    Flags: ['0x1F1E6-0x1F1FF'],
    'Miscellaneous Symbols and Pictographs': ['0x1f300-0x1f5ff'],
    'Transport and Map Symbols': ['0x1f680-0x1f6ff'],
    'Supplemental Symbols and Pictographs': ['0x1f900-0x1f9ff'],
    'Symbols and Pictographs Extended-A': ['0x1fa70-0x1faff'],
    'Miscellaneous Symbols': ['0x2600-0x26ff'],
    Dingbats: ['0x2700-0x27bf'],
    'Miscellaneous Technical': ['0x2300-0x23ff'],
    'Enclosed Alphanumeric Supplement': ['0x1f100-0x1f1ff'],
    'Enclosed Ideographic Supplement': ['0x1f200-0x1f2ff'],
    'Geometric Shapes': ['0x25a0-0x25ff'],
    Flags: ['0x1f1e6-0x1f1ff'],
    'Playing Cards': ['0x1f0a0-0x1f0ff'],
    'Mahjong Tiles': ['0x1f004-0x1f004'],
    'Skin Tone Modifiers': ['0x1f3fb-0x1f3ff'],
    'Keycap Characters': ['0x20e3-0x20e3'],
};

function App() {
    const [activeCategory, setActiveCategory] = useState(
        Object.keys(categories)[0]
    );
    const { addToast } = useToast();

    function mapCodePoint(codePoint) {
        const symbol = String.fromCodePoint(codePoint);
        const hex = codePoint.toString(16).toUpperCase();
        return { symbol, hex };
    }

    function processEmojiCodePoints(emojiCodePoints) {
        return emojiCodePoints
            .flatMap((value) => {
                if (value.includes('-')) {
                    const [start, end] = value
                        .split('-')
                        .map((hex) => parseInt(hex, 16));
                    return Array.from(
                        { length: end - start + 1 },
                        (_, i) => `0x${(start + i).toString(16).toUpperCase()}`
                    );
                }
                return value;
            })
            .map(mapCodePoint);
    }

    const handleCopy = (emoji) => {
        navigator.clipboard.writeText(emoji);
        addToast(emoji, 'copied to clipboard', 10000);
    };

    const displayItemsMap = Object.entries(categories).reduce(
        (prev, [name, value]) => {
            // Remove spaces
            const key = name.replace(/\s/g, '');
            prev[key] = {
                name,
                key,
                items: processEmojiCodePoints(value),
            };
            return prev;
        },
        {}
    );

    const displayItems = Object.values(displayItemsMap);

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
                    {Object.keys(categories).map((category) => (
                        <a
                            href={`#${category.replace(/\s/g, '')}`}
                            key={category}
                        >
                            <button
                                key={category}
                                className={
                                    category === activeCategory ? 'active' : ''
                                }
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        </a>
                    ))}
                </div>
            </nav>
            <div className="main-content scroll">
                {displayItems.map((category) => (
                    <div key={category.key} className="emoji-category">
                        <h2 id={category.key}>{category.name}</h2>
                        <div className="emoji-items">
                            {Object.values(category.items).map((emoji) => (
                                <div
                                    key={emoji.symbol}
                                    className="emoji-item"
                                    onClick={() => handleCopy(emoji.symbol)}
                                >
                                    <span className="emoji-symbol">
                                        {emoji.symbol}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
