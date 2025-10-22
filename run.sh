#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Notes Application Setup...${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 20.11.0 or higher.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm 10.2.4 or higher.${NC}"
    exit 1
fi

# Check if PostgreSQL is installed and running
if ! command_exists psql; then
    echo -e "${RED}❌ PostgreSQL is not installed. Please install PostgreSQL.${NC}"
    echo -e "${YELLOW}💡 You can install it with:${NC}"
    echo -e "   - Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
    echo -e "   - macOS: brew install postgresql"
    echo -e "   - Windows: Download from https://www.postgresql.org/download/"
    exit 1
fi

# Check if PostgreSQL service is running
if ! pg_isready -q; then
    echo -e "${YELLOW}⚠️  PostgreSQL service is not running. Starting it...${NC}"
    if command_exists systemctl; then
        sudo systemctl start postgresql
    elif command_exists brew; then
        brew services start postgresql
    else
        echo -e "${RED}❌ Please start PostgreSQL service manually.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Create .env file for backend if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}📝 Setting up PostgreSQL connection...${NC}"
    echo -e "${BLUE}Please enter your PostgreSQL credentials:${NC}"
    
    # Get PostgreSQL credentials interactively
    read -p "PostgreSQL username [postgres]: " input_user
    PG_USER=${input_user:-postgres}
    
    read -s -p "PostgreSQL password: " input_password
    echo
    PG_PASSWORD=${input_password}
    
    read -p "PostgreSQL port [5432]: " input_port
    PG_PORT=${input_port:-5432}
    
    # Test the provided credentials
    echo -e "${YELLOW}🔍 Testing PostgreSQL connection...${NC}"
    if ! PGPASSWORD="$PG_PASSWORD" psql -h localhost -U "$PG_USER" -p "$PG_PORT" -d postgres -c "SELECT 1;" >/dev/null 2>&1; then
        echo -e "${RED}❌ Cannot connect to PostgreSQL with provided credentials.${NC}"
        echo -e "${YELLOW}Please check your PostgreSQL installation and credentials.${NC}"
        echo -e "${BLUE}Common issues:${NC}"
        echo -e "  • PostgreSQL service not running"
        echo -e "  • Wrong username/password"
        echo -e "  • Wrong port"
        echo -e "  • PostgreSQL not installed"
        exit 1
    fi
    
    echo -e "${GREEN}✅ PostgreSQL connection successful!${NC}"
    
    cat > backend/.env << EOF
DATABASE_URL="postgresql://$PG_USER:$PG_PASSWORD@localhost:$PG_PORT/notes_db?schema=public"
PORT=3000
EOF
    echo -e "${GREEN}✅ .env file created with your credentials${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Create .env file for frontend if it doesn't exist
if [ ! -f "frontend/.env" ]; then
    echo -e "${YELLOW}📝 Creating .env file for frontend...${NC}"
    cat > frontend/.env << EOF
VITE_API_URL=http://localhost:3000/api
EOF
    echo -e "${GREEN}✅ Frontend .env file created${NC}"
else
    echo -e "${GREEN}✅ Frontend .env file already exists${NC}"
fi

# Create database if it doesn't exist
echo -e "${YELLOW}🗄️  Setting up database...${NC}"
if [ "$PG_USER" = "postgres" ]; then
    # Use sudo for default postgres user
    sudo -u postgres psql -c "CREATE DATABASE notes_db;" 2>/dev/null || echo -e "${GREEN}✅ Database already exists${NC}"
else
    # Use detected credentials
    PGPASSWORD="$PG_PASSWORD" psql -h localhost -U "$PG_USER" -p "$PG_PORT" -d postgres -c "CREATE DATABASE notes_db;" 2>/dev/null || echo -e "${GREEN}✅ Database already exists${NC}"
fi

# Install backend dependencies
echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
cd backend
npm install

# Generate Prisma client
echo -e "${YELLOW}🔧 Generating Prisma client...${NC}"
npx prisma generate

# Run database migrations
echo -e "${YELLOW}🔄 Running database migrations...${NC}"
npx prisma migrate deploy

cd ..

# Install frontend dependencies
echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
cd ..

echo -e "${GREEN}✅ All dependencies installed successfully${NC}"

# Start the application
echo -e "${BLUE}🚀 Starting the application...${NC}"

# Function to cleanup background processes on exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start backend server
echo -e "${YELLOW}🔧 Starting backend server...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo -e "${YELLOW}🎨 Starting frontend server...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}🎉 Application is running!${NC}"
echo -e "${BLUE}📱 Frontend: http://localhost:5173${NC}"
echo -e "${BLUE}🔧 Backend API: http://localhost:3000${NC}"
echo -e "${YELLOW}💡 Press Ctrl+C to stop the servers${NC}"

# Wait for background processes
wait
