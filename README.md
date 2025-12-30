# 🦈 Sharkie

A thrilling underwater adventure game where you control Sharkie, a brave shark on a quest to collect treasures and defeat enemies in the deep ocean!

[![Live Demo](https://sharkie.david-hckh.com)](https://sharkie.david-hckh.com)

## Gameplay

Navigate through treacherous waters, battle various sea creatures, and face off against a powerful boss in this side-scrolling adventure game.

### Controls

- **Arrow Keys** or **WASD**: Move left/right
- **Space** or **↑**: Jump
- **X**: Shoot bubble
- **Y**: Fin slap attack

### Objective

- **Navigate** through the underwater world
- **Collect coins** (20 total) for points
- **Gather poison bottles** to unlock poisonous bubbles
- **Defeat enemies** using bubble attacks and fin slaps
- **Face the boss** and emerge victorious!

## 🚀 Quick Start

### Prerequisites

- Modern web browser with JavaScript enabled

### Installation & Running

1. **Clone the repository**

   ```bash
   git clone https://github.com/davidhckh/sharkie-game
   cd sharkie-game
   ```

2. **Start a local server**

   ```bash
   python3 -m http.server 8000
   ```

3. **Open your browser** and navigate to `http://localhost:8000`

## ✨ Features

- **Smooth Character Movement**: Fluid swimming and jumping mechanics
- **Combat System**: Bubble projectiles and fin slap attacks
- **Enemy Variety**: Jellyfish (regular & electric), pufferfish, and boss
- **Collectibles**: Coins and poison bottles with special abilities
- **Progressive Gameplay**: Unlock poisonous bubbles to defeat the boss
- **Sound & Music**: Immersive audio with toggle controls
- **Parallax Scrolling**: Beautiful layered underwater backgrounds

## Technical Details

### Technologies

- **Vanilla JavaScript (ES6+)**: No frameworks, pure JavaScript implementation
- **HTML5 Canvas**: Hardware-accelerated 2D rendering
- **GSAP**: Animation library for smooth transitions

### Project Structure

```
sharkie-game/
├── index.html          # Main HTML structure and UI
├── script.js           # Game initialization
├── style.css           # Styling and responsive design
├── game/               # Core game logic
│   ├── game.class.js   # Main game controller
│   ├── entities/       # Game entities (character, enemies, items)
│   └── utils/          # Utility classes (drawing, sounds, events)
└── assets/             # Game assets (images, sounds)
```

## Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## License

This project is licensed under the MIT License.

---

**Enjoy the game!** 🦈