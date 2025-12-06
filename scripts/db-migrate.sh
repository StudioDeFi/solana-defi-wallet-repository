#!/bin/sh
# ============================================
# Database Migration Script
# Standalone script for running Prisma migrations
# Can be executed manually or in CI/CD
# ============================================

set -e

# Colors for output (disable if NO_COLOR is set or not in a terminal)
if [ -n "$NO_COLOR" ] || [ ! -t 1 ]; then
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    NC=''
else
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
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

log_step() {
    echo "${BLUE}[STEP]${NC} $1"
}

# ==========================================
# Check Prerequisites
# ==========================================
check_prerequisites() {
    log_step "Checking prerequisites..."
    
    # Check if DATABASE_URL is set
    if [ -z "$DATABASE_URL" ]; then
        log_error "DATABASE_URL environment variable is not set"
        log_info "Please set DATABASE_URL in your environment or .env file"
        log_info "Example: DATABASE_URL=postgresql://user:password@localhost:5432/database"
        exit 1
    fi
    
    # Check if Prisma is available
    if ! command -v npx >/dev/null 2>&1; then
        log_error "npx is not available. Please install Node.js and npm."
        exit 1
    fi
    
    log_info "Prerequisites check passed"
}

# ==========================================
# Wait for Database
# ==========================================
wait_for_db() {
    log_step "Waiting for database connection..."
    
    MAX_RETRIES=${MAX_RETRIES:-30}
    RETRY_COUNT=0
    RETRY_DELAY=${RETRY_DELAY:-2}
    
    # Extract host and port from DATABASE_URL for pg_isready
    DB_HOST=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:/]*\).*|\1|p')
    DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*:\([0-9]*\)/.*|\1|p')
    DB_HOST=${DB_HOST:-localhost}
    DB_PORT=${DB_PORT:-5432}
    
    while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
        # Use pg_isready if available, otherwise try prisma
        if command -v pg_isready >/dev/null 2>&1; then
            if pg_isready -h "$DB_HOST" -p "$DB_PORT" >/dev/null 2>&1; then
                log_info "Database connection established"
                return 0
            fi
        else
            # Fallback: try running a simple prisma command
            if npx prisma db execute --stdin >/dev/null 2>&1 <<EOF
SELECT 1;
EOF
            then
                log_info "Database connection established"
                return 0
            fi
        fi
        
        RETRY_COUNT=$((RETRY_COUNT + 1))
        log_warn "Database not ready. Attempt $RETRY_COUNT/$MAX_RETRIES. Retrying in ${RETRY_DELAY}s..."
        sleep $RETRY_DELAY
    done
    
    log_error "Failed to connect to database after $MAX_RETRIES attempts"
    return 1
}

# ==========================================
# Generate Prisma Client
# ==========================================
generate_client() {
    log_step "Generating Prisma client..."
    
    if npx prisma generate; then
        log_info "Prisma client generated successfully"
        return 0
    else
        log_error "Failed to generate Prisma client"
        return 1
    fi
}

# ==========================================
# Run Migrations
# ==========================================
run_migrations() {
    log_step "Running database migrations..."
    
    # Use migrate deploy for production (applies pending migrations)
    if npx prisma migrate deploy; then
        log_info "Migrations applied successfully"
        return 0
    else
        log_error "Failed to apply migrations"
        return 1
    fi
}

# ==========================================
# Show Migration Status
# ==========================================
show_status() {
    log_step "Checking migration status..."
    
    npx prisma migrate status || true
}

# ==========================================
# Main Execution
# ==========================================
main() {
    echo ""
    echo "============================================"
    echo " Solana DeFi Wallet - Database Migration"
    echo "============================================"
    echo ""
    
    # Parse command line arguments
    SKIP_WAIT=${SKIP_WAIT:-false}
    SHOW_STATUS=${SHOW_STATUS:-false}
    
    while [ "$#" -gt 0 ]; do
        case "$1" in
            --skip-wait)
                SKIP_WAIT=true
                shift
                ;;
            --status)
                SHOW_STATUS=true
                shift
                ;;
            --help|-h)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --skip-wait    Skip waiting for database"
                echo "  --status       Show migration status only"
                echo "  --help, -h     Show this help message"
                echo ""
                echo "Environment variables:"
                echo "  DATABASE_URL   PostgreSQL connection string (required)"
                echo "  MAX_RETRIES    Maximum connection attempts (default: 30)"
                echo "  RETRY_DELAY    Delay between retries in seconds (default: 2)"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    # Check prerequisites
    check_prerequisites
    
    # Wait for database unless skipped
    if [ "$SKIP_WAIT" != "true" ]; then
        if ! wait_for_db; then
            exit 1
        fi
    fi
    
    # Show status only if requested
    if [ "$SHOW_STATUS" = "true" ]; then
        show_status
        exit 0
    fi
    
    # Generate Prisma client
    if ! generate_client; then
        exit 1
    fi
    
    # Run migrations
    if ! run_migrations; then
        exit 1
    fi
    
    # Show final status
    show_status
    
    echo ""
    log_info "Database migration completed successfully!"
    echo ""
}

# Run main function with all arguments
main "$@"
