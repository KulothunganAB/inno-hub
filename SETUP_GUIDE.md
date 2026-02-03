# InnoHub - Step-by-Step Setup Guide

This guide will walk you through setting up the InnoHub application from scratch.

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Node.js installed (v14 or higher)
- [ ] MySQL installed (v5.7 or higher)
- [ ] A code editor (VS Code recommended)
- [ ] Terminal/Command Prompt access

## Step 1: Download and Extract Project

1. Download the InnoHub project files
2. Extract to your desired location
3. Open terminal/command prompt in the project root directory

## Step 2: MySQL Database Setup

### Option A: Using MySQL Command Line

1. Open MySQL:
```bash
mysql -u root -p
```

2. Enter your MySQL password when prompted

3. Create and use the database:
```sql
CREATE DATABASE innohub;
USE innohub;
```

4. Run the schema from terminal:
```bash
mysql -u root -p innohub < backend/database.sql
```

### Option B: Manual Table Creation

If the above doesn't work, copy and paste each table creation from `backend/database.sql` into MySQL Workbench or command line.

### Verify Database Setup

```sql
USE innohub;
SHOW TABLES;
```

You should see:
- users
- ideas
- messages

## Step 3: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

This will install:
- express
- mysql2
- cors
- bcrypt
- dotenv

3. Create environment file:

**On Windows:**
```bash
copy .env.example .env
```

**On Mac/Linux:**
```bash
cp .env.example .env
```

4. Edit `.env` file with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=innohub
PORT=5000
```

5. Test backend server:
```bash
npm start
```

You should see:
```
✅ Database connected successfully
🚀 InnoHub API server running on port 5000
🔗 http://localhost:5000
```

6. Test API health (open in browser):
```
http://localhost:5000/api/health
```

Should return: `{"status":"OK","message":"InnoHub API is running"}`

7. Keep this terminal running (backend server)

## Step 4: Frontend Setup

1. Open a NEW terminal/command prompt

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- vite

4. Start development server:
```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

5. Open browser and go to:
```
http://localhost:3000
```

## Step 5: Test the Application

### Test User Registration

1. Go to http://localhost:3000
2. Click "Register here"
3. Fill in the form:
   - Display Name: Test User
   - Email: test@example.com
   - Password: test123
   - Confirm Password: test123
4. Click "Register"
5. You should see success message

### Test Login

1. Go to login page
2. Enter credentials:
   - Email: test@example.com
   - Password: test123
3. Click "Login"
4. Should redirect to Dashboard

### Test Creating an Idea

1. Click "Post Idea" in sidebar
2. Fill in form:
   - Title: Test Idea
   - Domain: Technology
   - Problem: Testing the application
   - Solution: Complete setup guide
   - Stage: Idea
   - Funding: 10000
3. Click "Post Idea"
4. Check "My Ideas" to see it listed

### Test Messaging

1. Go to "View Ideas"
2. Click "Message" on any idea
3. You'll be redirected to Messages page
4. Compose and send a test message
5. Check Inbox and Sent tabs

## Troubleshooting

### Backend Issues

**Problem: "Cannot connect to database"**
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env` file
- Ensure database exists: `SHOW DATABASES;`

**Problem: "Port 5000 already in use"**
- Change PORT in `.env` to 5001 or other available port
- Update frontend API URL in `frontend/src/api.js`

**Problem: "Module not found"**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Frontend Issues

**Problem: "CORS error"**
- Ensure backend is running on port 5000
- Check API_BASE_URL in `frontend/src/api.js`
- Verify CORS is enabled in backend

**Problem: "Cannot GET /api/..."**
- Ensure backend server is running
- Check network tab in browser dev tools
- Verify API endpoint URL

**Problem: "Module not found"**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

### Database Issues

**Problem: "Table doesn't exist"**
- Run database.sql again
- Verify table creation: `SHOW TABLES;`
- Check for any SQL errors

**Problem: "Foreign key constraint fails"**
- Drop all tables and recreate
- Ensure proper order in schema

## Development Workflow

### Running in Development Mode

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
Uses nodemon for auto-reload on file changes

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
Vite will auto-reload on file changes

### Making Changes

1. Edit files in your code editor
2. Save changes
3. Check terminal for any errors
4. Refresh browser to see changes (Vite auto-reloads)

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Common Commands Reference

### MySQL
```bash
# Start MySQL
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use database
USE innohub;

# Show tables
SHOW TABLES;

# View table structure
DESCRIBE users;

# View data
SELECT * FROM users;
```

### NPM
```bash
# Install dependencies
npm install

# Start server
npm start

# Development mode
npm run dev

# Build for production
npm run build
```

## Project Structure Overview

```
innohub/
├── backend/               # Node.js backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Business logic
│   ├── routes/          # API routes
│   ├── app.js           # Express setup
│   ├── server.js        # Server entry point
│   └── database.sql     # Database schema
│
└── frontend/             # React frontend
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── api.js       # API configuration
    │   └── index.css    # Global styles
    └── index.html       # HTML entry point
```

## Next Steps

After successful setup:
1. Read the README.md for feature overview
2. Check API_DOCUMENTATION.md for API details
3. Explore the codebase
4. Customize for your needs

## Getting Help

If you encounter issues:
1. Check this guide's Troubleshooting section
2. Verify all prerequisites are met
3. Check terminal output for error messages
4. Review browser console for frontend errors
5. Check MySQL logs for database issues

## Tips for Success

- Keep both terminal windows open while developing
- Check browser console (F12) for errors
- Use MySQL Workbench for easier database management
- Test each feature after making changes
- Commit your changes regularly if using Git

---

**Congratulations!** You've successfully set up InnoHub. Happy coding! 🚀
