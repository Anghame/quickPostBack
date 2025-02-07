# Mini Social Network - Backend (Node.js, Express, MongoDB)

## Description
This is the backend of a mini social network application where users can create posts, like posts, and add comments. The backend is built using Node.js, Express, and MongoDB.

## Features
- User authentication (signup, login, JWT-based authentication)
- CRUD operations for posts
- Adding and removing likes on posts
- Commenting on posts
- Secure API with authentication middleware

## Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) for authentication
- bcryptjs for password hashing
- dotenv for environment variable management
- CORS for cross-origin requests

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mini-social-network-backend.git
   cd mini-social-network-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get a token

### Posts
- `POST /api/posts` - Create a new post (Authenticated)
- `GET /api/posts` - Get all posts

### Likes
- `POST /api/posts/like` - Like a post (Authenticated)


### Comments
- `POST /api/posts/comments` - Add a comment (Authenticated)


## Tools for Testing
- Postman for API testing
- MongoDB Compass for database visualization



