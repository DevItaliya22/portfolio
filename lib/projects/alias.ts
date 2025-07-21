import { Project } from '../info';

export const alias: Project = {
  id: 'alias',
  category: 'side-project',
  title: 'Terminal Aliases & Productivity Tools',
  github: 'https://github.com/DevItaliya22/Alias',
  description:
    'Collection of useful terminal aliases and shell functions for Git, npm, and daily development tasks. Cross-platform setup for Mac and Windows.',
  longDescription: `A practical collection of **terminal aliases** and **shell functions** designed to speed up daily development workflow and improve productivity.

## What This Repository Offers:
Ready-to-use terminal configurations that make common development tasks faster and more efficient.

## Key Features:

### Git Shortcuts
- **Quick Git Commands**: Simplified aliases for common git operations
  - \`add\` → \`git add .\`
  - \`br\` → \`git branch -a\`
  - \`pushc\` → Push to current branch
  - \`glog\` → Pretty git log with graph
  - \`f\` & \`m\` → Fetch and merge shortcuts

### Development Aliases
- **npm Shortcuts**: Quick commands for Node.js development
  - \`nd\` → \`npm run dev\`
  - \`st\` → \`npm run start\`
  - \`bl\` → \`npm run build\`
- **Editor Access**: \`cursor\` command to open Cursor IDE

### Custom Functions
- **Smart File Compression**: \`zipthis()\` function with exclude patterns for node_modules, .next, dist
- **Branch Management**: \`cbr()\` function to checkout or create branches
- **Repository Navigation**: \`glink()\` function to open GitHub repo in browser
- **Simplified Git Operations**: Custom \`commit()\`, \`gcc()\`, and \`push()\` functions

### Terminal Enhancement
- **Auto-completion**: Enhanced zsh completions and case-insensitive matching
- **Syntax Highlighting**: Integration with zsh-syntax-highlighting
- **Custom Prompt**: Clean, minimal terminal prompt design
- **Directory Navigation**: Smart cd behavior for development workflow

## Cross-Platform Support:
Configurations optimized for both **Mac** and **Windows** development environments.

## Perfect For:
- Developers looking to speed up their terminal workflow
- Anyone tired of typing long git commands repeatedly
- Teams wanting to standardize development aliases
- Personal productivity optimization

## Easy Setup:
Simple configuration files that can be quickly integrated into existing shell setups.`,
  tags: ['Terminal', 'Productivity', 'Git', 'Shell', 'Developer Tools'],
  features: [
    'Comprehensive Git command shortcuts and aliases',
    'npm and Node.js development shortcuts',
    'Smart file compression with exclusion patterns',
    'Branch management and GitHub integration functions',
    'Enhanced zsh completions and syntax highlighting',
    'Cross-platform compatibility (Mac/Windows)',
    'Custom terminal prompt and navigation setup',
  ],
  techStack: ['Zsh', 'Bash', 'Git', 'Shell Scripting', 'Terminal'],
  views: 0,
  date: 'Jul 21, 2025',
  repoCount: 1,
};
