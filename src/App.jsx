import React, { useState } from 'react';

    const categories = {
      "Smileys & Emotion": [0x1F600, 0x1F64F],
      "People & Body": [0x1F466, 0x1F487],
      "Animals & Nature": [0x1F400, 0x1F43E],
      "Food & Drink": [0x1F34E, 0x1F37F],
      "Activities": [0x1F3A0, 0x1F3C4],
      "Travel & Places": [0x1F680, 0x1F6C0],
      "Objects": [0x1F4A0, 0x1F4FF],
      "Symbols": [0x1F300, 0x1F5FF],
      "Flags": [0x1F1E6, 0x1F1FF]
    };

    function App() {
      const [search, setSearch] = useState('');
      const [activeCategory, setActiveCategory] = useState(Object.keys(categories)[0]);

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

      const filteredEmojis = generateEmojis(...categories[activeCategory]).filter(emoji =>
        emoji.hex.includes(search.toUpperCase())
      );

      return (
        <div className="app-container">
          <nav className="side-nav">
            {Object.keys(categories).map(category => (
              <button
                key={category}
                className={category === activeCategory ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </nav>
          <div className="main-content">
            <h1>Emoji Picker</h1>
            <input
              type="text"
              placeholder="Search by hex..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="emoji-grid">
              {filteredEmojis.map((emoji) => (
                <div
                  key={emoji.symbol}
                  className="emoji-item"
                  onClick={() => handleCopy(emoji.symbol)}
                >
                  <span className="emoji-symbol">{emoji.symbol}</span>
                  <p>Hex: {emoji.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    export default App;
