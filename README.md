# InnoHub - Innovation Hub Platform

A full-stack web application for sharing and collaborating on innovative ideas.

## 🚀 Features

### Core Functionality
- **User Authentication**: Register and login with email and password
- **Dashboard**: View statistics and recent ideas
- **Idea Management**: Create, view, edit, and delete ideas
- **Messaging System**: Send and receive messages about ideas
- **Profile Management**: Update personal information and expertise

### Technical Stack

#### Backend
- **Node.js** with Express.js
- **MySQL** database
- **bcrypt** for password hashing
- RESTful API architecture

#### Frontend
- **React** with Vite
- **React Router** for navigation
- **Axios** for API calls
- Clean admin-style UI with fixed sidebar

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Database Setup

First, create the MySQL database:

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
mysql -u root -p < backend/database.sql
```

Or manually run the SQL commands from `backend/database.sql`.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=innohub
# PORT=5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend Application

```bash
cd frontend
npm run dev
```

The frontend application will run on `http://localhost:3000`

## 📁 Project Structure

```
innohub/
├── backend/
│   ├── config/
│   │   └── database.js          # Database connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── ideasController.js   # Ideas CRUD operations
│   │   ├── messagesController.js # Messaging logic
│   │   └── usersController.js   # User profile management
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── ideasRoutes.js
│   │   ├── messagesRoutes.js
│   │   └── usersRoutes.js
│   ├── app.js                   # Express app configuration
│   ├── server.js                # Server entry point
│   ├── database.sql             # Database schema
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx       # Main layout wrapper
    │   │   └── Sidebar.jsx      # Navigation sidebar
    │   ├── pages/
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── PostIdea.jsx
    │   │   ├── ViewIdeas.jsx
    │   │   ├── MyIdeas.jsx
    │   │   ├── Messages.jsx
    │   │   └── Profile.jsx
    │   ├── api.js               # API configuration
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Ideas
- `POST /api/ideas` - Create new idea
- `GET /api/ideas` - Get all ideas
- `GET /api/ideas/user/:userId` - Get ideas by user
- `GET /api/ideas/:id` - Get single idea
- `PUT /api/ideas/:id` - Update idea
- `DELETE /api/ideas/:id` - Delete idea
- `GET /api/ideas/dashboard/:userId` - Get dashboard statistics

### Messages
- `POST /api/messages` - Send message
- `GET /api/messages/inbox/:userId` - Get inbox messages
- `GET /api/messages/sent/:userId` - Get sent messages
- `GET /api/messages/idea/:ideaId` - Get messages by idea

### Users
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt before storing
3. On login, credentials are verified
4. User ID is stored in localStorage
5. Subsequent requests use the stored user ID for authentication
6. No JWT tokens are used (as per requirements)

## 💬 Messaging Flow

1. User views all ideas on "View Ideas" page
2. Each idea displays the user_id of the owner
3. User clicks "Message" button on an idea
4. Redirects to `/messages?user=<owner_id>&idea=<idea_id>`
5. Message form pre-fills receiver and idea information
6. Messages are stored with sender_id, receiver_id, and idea_id
7. Users can view inbox and sent messages

## 🎨 UI Features

- Fixed left sidebar navigation
- Card-based layouts
- Responsive design
- Clean admin-style interface
- Color-coded status indicators
- Interactive forms with validation

## 🗄️ Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- display_name
- domain
- bio
- created_at

### Ideas Table
- id (Primary Key)
- user_id (Foreign Key → users.id)
- title
- domain
- problem
- solution
- stage (Idea/MVP/Revenue)
- funding_amount
- created_at
- updated_at

### Messages Table
- id (Primary Key)
- sender_id (Foreign Key → users.id)
- receiver_id (Foreign Key → users.id)
- idea_id (Foreign Key → ideas.id)
- message
- created_at

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=innohub
PORT=5000
```

### Frontend API Configuration
The API base URL is configured in `frontend/src/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 🚨 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check credentials in `.env` file
- Verify database exists: `SHOW DATABASES;`

### CORS Issues
- Backend includes CORS middleware
- Ensure frontend runs on port 3000
- Check browser console for errors

### Port Already in Use
- Change PORT in backend `.env`
- Change port in frontend `vite.config.js`

## 📝 Usage Guide

1. **Register**: Create a new account with email and password
2. **Login**: Access your account
3. **Dashboard**: View your statistics and recent ideas
4. **Post Idea**: Create a new innovative idea
5. **View Ideas**: Browse all ideas from the community
6. **My Ideas**: Manage your posted ideas (edit/delete)
7. **Messages**: Send and receive messages about ideas
8. **Profile**: Update your personal information

## 🎓 Academic Project Notes

This application is designed as a comprehensive academic project demonstrating:
- Full-stack web development
- RESTful API design
- Database relationships
- User authentication
- CRUD operations
- Modern React patterns
- Clean code architecture

## 📄 License

This project is created for academic purposes.

## 👥 Support

For issues or questions, please refer to the documentation or contact the development team.
