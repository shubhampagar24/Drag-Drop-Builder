# Drag and Drop Website Builder

## Overview
This project is a **Drag and Drop Website Builder** built using **React** with **react-router-dom** for routing and **@hello-pangea/dnd** for drag-and-drop functionality. Users can drag elements (Text, Image, Button) onto a canvas, customize them, and save their layout.

## Features
- Drag and drop elements onto a canvas
- Edit text and button labels
- Upload images for preview
- Save layout to local storage
- Delete elements
- View image previews

## Tech Stack
- **Frontend:** React.js, React Router, @hello-pangea/dnd
- **Styling:** CSS
- **State Management:** useState, useEffect

## Installation
### Prerequisites
- Node.js (>=14.x)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/shubhampagar24/drag-drop-builder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd drag-drop-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the project in the browser:
   ```
   http://localhost:3000
   ```

## File Structure
```
📂 drag-drop-builder
├── 📂 src
│   ├── 📄 App.jsx
│   ├── 📄 ImagePreview.jsx
│   ├── 📄 App.css
│   ├── 📄 ImagePreview.css
│   ├── 📂 assets (if needed for images)
├── 📄 package.json
├── 📄 README.md
└── 📄 .gitignore
```

## Usage
1. Drag elements from the sidebar to the canvas.
2. Click on an element to edit text or upload an image.
3. Click **Save Layout** to store the configuration in local storage.
4. Click **Delete** to remove an element from the canvas.
5. Click on an uploaded image to preview it in a new route.

## Deployment
You can deploy this project on platforms like **Vercel**, **Netlify**, or **GitHub Pages**.

### Deploy on Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run the deploy command:
   ```bash
   vercel
   ```

## License
This project is licensed under the MIT License.

## Contact
For any issues or improvements, feel free to create a pull request or open an issue!

---
Happy Coding! 🚀

