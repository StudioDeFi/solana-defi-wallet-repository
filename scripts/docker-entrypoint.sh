#!/bin/sh
# ============================================
# Docker Entrypoint Script
# Handles database initialization and app startup
# ============================================

set -e

# Colors for output (disable if NO_COLOR is set or not in a terminal)
if [ -n "$NO_COLOR" ] || [ ! -t 1 ]; then
    RED=''
    GREEN=''
    YELLOW=''
    NC=''
else
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    NC='\033[0m' # No Color
fi

log_info() {
    echo "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo "${RED}[ERROR]${NC} $1"
}

# ==========================================
# Wait for Database
# ==========================================
wait_for_db() {
    log_info "Waiting for database to be ready..."
    
    MAX_RETRIES=30
    RETRY_COUNT=0
    
    # Extract host and port from DATABASE_URL for pg_isready
    DB_HOST=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:/]*\).*|\1|p')
    DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
    DB_HOST=${DB_HOST:-postgres}
    DB_PORT=${DB_PORT:-5432}
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        # Use pg_isready if available, otherwise try prisma
        if command -v pg_isready >/dev/null 2>&1; then
            if pg_isready -h "$DB_HOST" -p "$DB_PORT" >/dev/null 2>&1; then
                log_info "Database is ready!"
                return 0
            fi
        else
            # Fallback: try running a simple prisma command
            if npx prisma db execute --stdin >/dev/null 2>&1 <<EOF
SELECT 1;
EOF
            then
                log_info "Database is ready!"
                return 0
            fi
        fi
        
        RETRY_COUNT=$((RETRY_COUNT + 1))
        log_warn "Database not ready. Retry $RETRY_COUNT/$MAX_RETRIES..."
        sleep 2
    done
    
    log_error "Database did not become ready in time"
    return 1
}

# ==========================================
# Run Prisma Migrations
# ==========================================
run_migrations() {
    log_info "Running Prisma migrations..."
    
    # Generate Prisma Client (should already be generated, but ensure it's up to date)
    if npx prisma generate; then
        log_info "Prisma client generated successfully"
    else
        log_warn "Prisma generate had issues, but continuing..."
    fi
    
    # Run database migrations
    if npx prisma migrate deploy; then
        log_info "Database migrations completed successfully"
    else
        log_error "Database migrations failed"
        return 1
    fi
}

# ==========================================
# Main Execution
# ==========================================
main() {
    log_info "Starting Solana DeFi Wallet Application..."
    log_info "Environment: ${NODE_ENV:-production}"
    
    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        log_error "DATABASE_URL environment variable is not set"
        exit 1
    fi
    
    # Wait for database to be ready
    if ! wait_for_db; then
        log_error "Failed to connect to database"
        exit 1
    fi
    
    # Run migrations
    if ! run_migrations; then
        log_error "Migration failed"
        exit 1
    fi
    
    log_info "Starting application server..."
    
    # Start the Next.js server
    # Use node directly for standalone builds
    if [ -f "server.js" ]; then
        exec node server.js
    else
        # Fallback to npm start if standalone is not available
        exec npm start
    fi
}

# Run main function
main "$@"
