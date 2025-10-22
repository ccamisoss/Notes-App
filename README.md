# Notes Application - Full Stack Implementation

A simple web application that allows you to take notes, tag, and filter them. This project consists of a React frontend and a Node.js/Express backend with PostgreSQL database.

## 🚀 Quick Start

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: v20.11.0 or higher
- **npm**: v10.2.4 or higher  
- **PostgreSQL**: v12 or higher

### PostgreSQL Setup

Make sure PostgreSQL is installed and running on your system. The setup script will ask you for:
- **Username**: Your PostgreSQL username (default: `postgres`)
- **Password**: Your PostgreSQL password
- **Port**: Your PostgreSQL port (default: `5432`)
- **Database name**: `notes_db` (will be created automatically)

The script will test your credentials before proceeding, so you don't need to worry about configuration issues.

### Running the Application

#### Option 1: Using the Setup Script (Recommended)

**For Linux/macOS:**
```bash
./run.sh
```

**For Windows:**
```cmd
run.bat
```

The script will automatically:
- Check prerequisites (Node.js, npm, PostgreSQL)
- **Ask for your PostgreSQL credentials interactively**
- Test the database connection
- Create necessary environment files with your credentials
- Install all dependencies
- Set up the database
- Start both frontend and backend servers

**Note**: The script will prompt you to enter your PostgreSQL username, password, and port. It will test the connection before proceeding.

#### Interactive Setup Process

When you run the setup script, it will:

1. **Check prerequisites** - Verifies Node.js, npm, and PostgreSQL are installed
2. **Ask for PostgreSQL credentials**:
   ```
   📝 Setting up PostgreSQL connection...
   Please enter your PostgreSQL credentials:
   PostgreSQL username [postgres]: 
   PostgreSQL password: 
   PostgreSQL port [5432]: 
   ```
3. **Test the connection** - Validates your credentials work
4. **Create environment files** - Sets up `.env` files with your credentials
5. **Install dependencies** - Installs all required packages
6. **Set up database** - Creates the `notes_db` database
7. **Start servers** - Launches both frontend and backend

#### Option 2: Manual Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd challenge
   ```

2. **Set up the database:**
   ```bash
   # Create PostgreSQL database
   sudo -u postgres psql -c "CREATE DATABASE notes_db;"
   ```

3. **Configure environment variables:**
   
   Create `backend/.env`:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/notes_db?schema=public"
   PORT=3000
   ```
   
   **⚠️ Important**: Update the PostgreSQL credentials in the `DATABASE_URL` to match your local PostgreSQL setup:
   - Replace `postgres` with your PostgreSQL username
   - Replace `password` with your PostgreSQL password
   - If you're using a different port, update `5432` accordingly
   
   Create `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Install and setup backend:**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma migrate deploy
   npm run dev
   ```

5. **Install and setup frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📋 Application URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js v20.11.0
- **Framework**: Express.js v5.1.0
- **Database**: PostgreSQL with Prisma ORM v6.17.1
- **Package Manager**: npm v10.2.4

### Frontend
- **Framework**: React v19.1.1
- **Build Tool**: Vite v5.4.10
- **Styling**: Tailwind CSS v3.4.13
- **Routing**: React Router DOM v7.9.4
- **Package Manager**: npm v10.2.4

## 📁 Project Structure

```
challenge/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── app.js         # Main application file
│   ├── prisma/
│   │   ├── migrations/     # Database migrations
│   │   └── schema.prisma   # Database schema
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── assets/        # Static assets
│   └── package.json
├── run.sh                 # Linux/macOS setup script
├── run.bat               # Windows setup script
└── README.md
```

## 🎯 Features

### Phase 1 (Core Features)
- ✅ Create, edit, and delete notes
- ✅ Archive/unarchive notes
- ✅ List active notes
- ✅ List archived notes

### Phase 2 (Advanced Features)
- ✅ Add/remove tags to notes
- ✅ Filter notes by tags
- ✅ Tag management

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Note**: Contains title, content, archived status, and timestamps
- **Tag**: Contains tag name
- **NoteTag**: Junction table for many-to-many relationship between notes and tags

## 🔧 API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/archived` - Get archived notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `PATCH /api/notes/:id/archive` - Archive/unarchive a note

### Tags
- `GET /api/tags` - Get all tags
- `POST /api/tags` - Create a new tag
- `DELETE /api/tags/:id` - Delete a tag

## 🚨 Troubleshooting

### Common Issues

1. **PostgreSQL connection error:**
   - Ensure PostgreSQL is installed and running
   - Check if the database `notes_db` exists
   - Verify the connection string in `backend/.env`
   - **If using the setup script**: The script will test your credentials and show helpful error messages
   - **If setting up manually**: Update the username and password in `DATABASE_URL` to match your PostgreSQL credentials

2. **Port already in use:**
   - Backend runs on port 3000, frontend on port 5173
   - Kill existing processes or change ports in environment files

3. **Prisma migration errors:**
   - Run `npx prisma migrate reset` to reset the database
   - Then run `npx prisma migrate deploy` again

### Database Reset
If you need to reset the database:
```bash
cd backend
npx prisma migrate reset
```

## 📝 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

### Database Management
```bash
cd backend
npx prisma studio  # Opens Prisma Studio for database management
```

## 🔒 Security Notes

- The application uses CORS for cross-origin requests
- Database credentials should be properly secured in production
- Consider implementing authentication for production use

## 📄 License

This project is part of a technical challenge and is for demonstration purposes.

---

**Note**: This application is designed to run locally for development and testing purposes. For production deployment, additional security measures and environment configurations would be required.
