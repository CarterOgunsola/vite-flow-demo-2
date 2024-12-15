# Vite-Webflow Starter

A modern development toolkit that bridges professional JavaScript workflows with Webflow projects. Built with Vite, this starter enables developers to use contemporary development practices while leveraging Webflow's visual design capabilities.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Development Guide](#development-guide)
5. [Build System](#build-system)
6. [Deployment Options](#deployment-options)
7. [Customization](#customization)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)
11. [License](#license)

## Features

### Core Features

- **Modern Development Environment**
  - ES6+ JavaScript support
  - npm for dependency management
  - Hot Module Replacement (HMR)
  - Vite's fast build process

### Build Features

- **Optimized Output**
  - Single minified JavaScript file
  - Automated semantic versioning
  - Version history management
  - Easy rollback capabilities

### Architecture

- **Modular Design**
  - Component-based architecture
  - Page-specific routing
  - Global script management
  - Utility functions library

### Development Features

- **Developer Experience**
  - Fast refresh during development
  - Organized project structure
  - Flexible customization options
  - Multiple deployment strategies

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url> vite-webflow-starter
cd vite-webflow-starter
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

## Project Structure

```plaintext
vite-webflow-starter/
├── dist/                    # Build output
│   ├── latest/             # Most recent build
│   │   └── index.js
│   └── versions/           # Historical builds
│       ├── v1.0.0/
│       └── v1.0.1/
├── src/
│   ├── js/
│   │   ├── components/     # Reusable components
│   │   │   ├── exampleComponent.js
│   │   │   └── index.js
│   │   ├── global/        # Global scripts
│   │   │   ├── globalInit.js
│   │   │   └── navigation.js
│   │   ├── pages/         # Page-specific code
│   │   │   ├── home.js
│   │   │   └── index.js
│   │   ├── utils/         # Utility functions
│   │   │   ├── dom.js
│   │   │   └── index.js
│   │   └── index.js       # Main entry point
│   └── styles/            # Optional CSS (dev only)
├── scripts/               # Build scripts
├── .env.template         # Environment variables template
├── .gitignore           # Git ignore configuration
└── vite.config.js       # Vite configuration
```

## Development Guide

### Page Routing

1. Add route attribute to Webflow pages:

```html
<body data-route="home">
  <!-- Webflow content -->
</body>
```

2. Create page-specific JavaScript:

```javascript
// src/js/pages/home.js
export default function homeInit() {
  console.log("Home page initialized");
}
```

3. Register in router:

```javascript
// src/js/pages/index.js
import homeInit from "./home";

export default function PageRouter() {
  const route = document.body.dataset.route;

  switch (route) {
    case "home":
      homeInit();
      break;
    default:
      console.log(`No handler for route: ${route}`);
  }
}
```

### Components

1. Create component:

```javascript
// src/js/components/exampleComponent.js
export const exampleComponent = () => {
  // Component logic
};
```

2. Register component:

```javascript
// src/js/components/index.js
import { exampleComponent } from "./exampleComponent";

export const initializeComponents = () => {
  exampleComponent();
};
```

### Global Scripts

```javascript
// src/js/global/globalInit.js
import navigation from "./navigation";

export default function globalInit() {
  navigation();
  // Other global initializations
}
```

### Utilities

```javascript
// src/js/utils/dom.js
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
```

## Build System

### Build Commands

```bash
npm run build           # Patch update (v1.0.0 → v1.0.1)
npm run build:minor    # Minor update (v1.0.0 → v1.1.0)
npm run build:major    # Major update (v1.0.0 → v2.0.0)
```

### Version Management

- Builds are automatically versioned
- Latest build stored in `/dist/latest/`
- Version history in `/dist/versions/`
- Easy rollback capability

## Deployment Options

### 1. GitHub + jsDelivr Method

```html
<!-- After pushing to public GitHub repository -->
<script src="https://cdn.jsdelivr.net/gh/username/repo@version/dist/latest/index.js"></script>
```

### 2. Webflow Asset Hosting

1. Rename `index.js` to `index.js.txt`
2. Upload to Webflow Assets
3. Use provided Webflow URL

### 3. Custom CDN

- Upload to preferred CDN service
- Use provided CDN URL

### Integration

Add to your project:

```html
<script type="text/javascript" src="https://your-hosted-file-url.js"></script>
```

## Customization

### Project Structure

- Modify routing system as needed
- Add/remove utility modules
- Customize component architecture
- Adjust global scripts organization

### CSS Handling

- `styles` directory for development only
- Manage production CSS through Webflow
- Allows CSS changes without JS rebuilds

### Environment Variables

1. Environment Files:

```plaintext
.env              # Default variables
.env.local        # Local overrides (git-ignored)
.env.template     # Template file
```

2. Usage:

```javascript
const apiKey = process.env.API_KEY;
```

## Best Practices

### Code Organization

1. **Components**

   - Keep components focused
   - Use meaningful names
   - Document APIs

2. **Page Management**

   - Use descriptive routes
   - Isolate page-specific logic
   - Share common functionality

3. **Build Process**
   - Use semantic versioning
   - Document version changes
   - Test before deployment

### Security

1. **Environment Variables**

   - Never commit sensitive data
   - Use `.env` for configuration
   - Follow security best practices

2. **Git Security**
   - Maintain comprehensive `.gitignore`
   - Review commits for sensitive data
   - Use security scanning tools

## Troubleshooting

### Common Issues

1. **Build Failures**

   - Check syntax errors
   - Verify dependencies
   - Review vite.config.js

2. **Script Loading**

   - Verify script integration
   - Check browser console
   - Confirm route attributes

3. **Development Server**
   - Verify port availability
   - Check file permissions
   - Clear cache if needed

## Contributing

1. Fork repository
2. Create feature branch
3. Submit pull request with:
   - Clear description
   - Test coverage
   - Documentation updates

## License

MIT License - See LICENSE file for details.

---

For more information and updates, visit the repository or submit issues through GitHub.
