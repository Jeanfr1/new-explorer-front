News Explorer

News Explorer is a web application for searching and storing news articles from around the world on any topic, pulled from well-known news sources.

The site uses NewsAPI to fetch news dynamically, allowing users to save and manage their favorite articles after registration and login.

Features

Global News Search: Users can search for articles on any topic from well-known global news sources.
Authentication and Authorization: Users can register and log in to save articles to their personal account.
Secure Article Storage: After logging in, users can securely save and access their favorite articles at any time.
Responsive Design: The layout adapts to different devices, from desktop computers to smartphones.
Social Media Integration: Links to the creator's social profiles are available in the interface.
Technologies Used

React: Built using functional components and React Hooks like useState, useEffect, and useContext for state management and component lifecycle.
React Router DOM: For client-side navigation.
External APIs:
NewsAPI: To fetch real-time news articles.
MainAPI: Custom API for handling user registration, login, and managing saved articles.
JWT (JSON Web Tokens): Used for authentication and authorization, with tokens securely stored in localStorage.
CSS Flexbox and Grid Layout: For building flexible, adaptive layouts.
Media Queries: To ensure the app is responsive across different screen sizes.
ESLint: To maintain code quality and catch issues during development.
NPM (Node Package Manager): For managing project packages and dependencies.
How to Run the Project

Prerequisites
Ensure Node.js and npm are installed on your machine.
Obtain a valid API key from NewsAPI.
Steps to run:
Clone this repository:
bash
Copier le code
git clone https://github.com/your-username/news-explorer.git
Navigate to the project directory:
bash
Copier le code
cd news-explorer
Install the dependencies:
bash
Copier le code
npm install
Set up your API key:
Create a .env file in the root of the project with the following content:
bash
Copier le code
REACT_APP_NEWS_API_KEY=YOUR_API_KEY
Run the project in development mode:
bash
Copier le code
npm start
The application will start on http://localhost:3000.
Build for production (optional):
To create a production build, run:

bash
Copier le code
npm run build
This will create a build folder with the optimized version of the app.
Project Structure

public/: Contains static files and the index.html.
src/: Contains the source code, including:
components/: Reusable UI components.
utils/: Utility files, including API request classes.
pages/: Different pages of the application.
App.js: The main file for the React app.
Authentication Management

User authentication is handled using JWT (JSON Web Tokens). After logging in, the JWT is stored in localStorage, allowing users to save and retrieve their favorite articles. All protected API requests use JWT for authentication.

Responsive Design

The layout is designed using CSS Flexbox and Grid to ensure that the interface adapts to different devices, from large desktop screens to mobile phones. Media queries are used to apply different styles based on screen width.

Best Practices

Clean and Modular Code: React components are reusable and maintainable.
Code Quality: ESLint is used to ensure code quality and catch potential issues.
Security: JWT is used for secure authentication and authorization.
