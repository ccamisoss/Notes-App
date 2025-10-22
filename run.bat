@echo off
setlocal enabledelayedexpansion

echo 🚀 Starting Notes Application Setup...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 20.11.0 or higher.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm 10.2.4 or higher.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Create .env file for backend if it doesn't exist
if not exist "backend\.env" (
    echo 📝 Setting up PostgreSQL connection...
    echo Please enter your PostgreSQL credentials:
    
    set /p PG_USER="PostgreSQL username [postgres]: "
    if "%PG_USER%"=="" set PG_USER=postgres
    
    set /p PG_PASSWORD="PostgreSQL password: "
    
    set /p PG_PORT="PostgreSQL port [5432]: "
    if "%PG_PORT%"=="" set PG_PORT=5432
    
    echo 🔍 Testing PostgreSQL connection...
    set PGPASSWORD=%PG_PASSWORD%
    psql -h localhost -U %PG_USER% -p %PG_PORT% -d postgres -c "SELECT 1;" >nul 2>&1
    if errorlevel 1 (
        echo ❌ Cannot connect to PostgreSQL with provided credentials.
        echo Please check your PostgreSQL installation and credentials.
        echo Common issues:
        echo   • PostgreSQL service not running
        echo   • Wrong username/password
        echo   • Wrong port
        echo   • PostgreSQL not installed
        pause
        exit /b 1
    )
    
    echo ✅ PostgreSQL connection successful!
    
    (
        echo DATABASE_URL="postgresql://%PG_USER%:%PG_PASSWORD%@localhost:%PG_PORT%/notes_db?schema=public"
        echo PORT=3000
    ) > backend\.env
    echo ✅ .env file created with your credentials
) else (
    echo ✅ .env file already exists
)

REM Create .env file for frontend if it doesn't exist
if not exist "frontend\.env" (
    echo 📝 Creating .env file for frontend...
    echo VITE_API_URL=http://localhost:3000/api > frontend\.env
    echo ✅ Frontend .env file created
) else (
    echo ✅ Frontend .env file already exists
)

REM Create database if it doesn't exist
echo 🗄️  Setting up database...
set PGPASSWORD=%PG_PASSWORD%
psql -h localhost -U %PG_USER% -p %PG_PORT% -d postgres -c "CREATE DATABASE notes_db;" >nul 2>&1
if errorlevel 1 (
    echo ✅ Database already exists
) else (
    echo ✅ Database created successfully
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install

REM Generate Prisma client
echo 🔧 Generating Prisma client...
call npx prisma generate

REM Run database migrations
echo 🔄 Running database migrations...
call npx prisma migrate deploy

cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ All dependencies installed successfully

REM Start the application
echo 🚀 Starting the application...

REM Start backend server
echo 🔧 Starting backend server...
cd backend
start "Backend Server" cmd /k "npm run dev"
cd ..

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server
echo 🎨 Starting frontend server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo 🎉 Application is running!
echo 📱 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:3000
echo 💡 Close the terminal windows to stop the servers

pause
