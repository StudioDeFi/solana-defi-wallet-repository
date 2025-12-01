#!/bin/sh
# ============================================
# Docker Entrypoint Script
# Handles database initialization and app startup
# ============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        if echo "SELECT 1" | npx prisma db execute --stdin 2>/dev/null; then
            log_info "Database is ready!"
            return 0
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
