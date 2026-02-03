# InnoHub - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Extract Files
```bash
tar -xzf innohub-complete.tar.gz
cd innohub
```

### Step 2: Setup Database
```bash
# Login to MySQL
mysql -u root -p

# Create database and run schema
mysql -u root -p < backend/database.sql
```

### Step 3: Configure Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MySQL password
```

### Step 4: Configure Frontend
```bash
cd ../frontend
npm install
```

### Step 5: Run Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Step 6: Access Application
Open browser: **http://localhost:3000**

## 📚 Documentation Files

- **README.md** - Complete project overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **API_DOCUMENTATION.md** - API endpoint reference
- **PROJECT_OVERVIEW.md** - Architecture and design details

## 🎯 Test the Application

1. Register a new user
2. Login with credentials
3. Post an idea on "Post Idea"
4. View all ideas on "View Ideas"
5. Click "Message" to send a message
6. Check inbox in "Messages"
7. Edit profile in "Profile"

## 📂 Project Structure

```
innohub/
├── backend/          # Node.js + Express API
│   ├── controllers/  # Business logic
│   ├── routes/       # API endpoints
│   ├── config/       # Database config
│   └── server.js     # Entry point
│
└── frontend/         # React + Vite UI
    └── src/
        ├── pages/    # Page components
        ├── components/ # Reusable components
        └── api.js    # API client
```

## ⚙️ Default Configuration

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000
- **Database**: innohub (MySQL)

## 🔧 Common Issues

**Database connection failed?**
→ Check MySQL credentials in `backend/.env`

**Port already in use?**
→ Change PORT in `backend/.env`

**CORS error?**
→ Ensure backend runs on port 5000

## 📞 Need Help?

Refer to **SETUP_GUIDE.md** for detailed troubleshooting.

---

**Happy Coding! 🎉**
