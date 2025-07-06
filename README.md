# Simple Social Media App

## Project Overview

This is a full-stack web application built as a learning project to create a simple social media platform. Users can sign up, log in, create text-based posts, view a feed of all posts, and like posts. The app is designed to help beginners learn modern web development with **Next.js**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**.

### Core Features
- **User Authentication**: Sign up with email, username, and password; log in and log out using JSON Web Tokens (JWT).
- **Create Posts**: Write and submit posts (up to 280 characters) with username and timestamp.
- **Feed**: Display all posts in reverse chronological order, showing content, username, and timestamp.
- **Like Posts**: Like or unlike posts, with a display of the total number of likes.
- **Responsive UI**: Clean, mobile-friendly design using Tailwind CSS.

### Optional Features (Future Enhancements)
- Commenting on posts.
- User profiles with bio and profile picture.
- Follow/unfollow functionality to filter the feed.

### Technologies Used
- **Frontend**:
  - **Next.js**: React framework for building the user interface with file-based routing and TypeScript support.
  - **TypeScript**: Adds type safety to JavaScript for robust code.
  - **Tailwind CSS**: Utility-first CSS framework for responsive styling.
  - **Axios**: For making API requests to the backend.
- **Backend**:
  - **Node.js/Express**: Server-side JavaScript runtime and framework for building REST APIs.
  - **MongoDB**: NoSQL database (via MongoDB Atlas) for storing users and posts.
  - **Mongoose**: ODM for MongoDB to define schemas and interact with the database.
  - **bcryptjs**: For secure password hashing.
  - **jsonwebtoken**: For JWT-based authentication.
  - **cors**: Enables cross-origin requests between frontend and backend.
- **Other**:
  - **Git/GitHub**: Version control and repository hosting.
  - **Vercel/Render**: Deployment platforms for frontend and backend (planned).

### Learning Outcomes
- **Frontend**: Master React components, hooks, and Next.js pages; use TypeScript for type-safe code; handle API calls with Axios.
- **Backend**: Build REST APIs with Express; manage MongoDB data with Mongoose; implement JWT authentication.
- **Full-Stack**: Connect frontend and backend via REST APIs; debug across the stack; deploy a full-stack app.
- **TypeScript**: Define interfaces for users and posts to catch errors early.

### Project Goals
This project aims to provide hands-on experience in full-stack web development while learning Next.js and TypeScript. It’s designed to be challenging yet achievable for beginners, with a focus on practical skills like API integration, state management, and responsive design.

### Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/social-media-app.git