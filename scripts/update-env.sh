#!/bin/bash

# ============================================
# Auto-Update .env File Script (Linux/Mac)
# ============================================

ENV_FILE=".env"
EXAMPLE_FILE=".env.example"

show_help() {
    echo "============================================"
    echo "Solana Wallet - .env Manager"
    echo "============================================"
    echo ""
    echo "Usage:"
    echo "  ./scripts/update-env.sh KEY VALUE"
    echo "  ./scripts/update-env.sh list"
    echo "  ./scripts/update-env.sh help"
    echo ""
    echo "Examples:"
    echo "  ./scripts/update-env.sh BIRDEYE_API_KEY 'abc123'"
    echo "  ./scripts/update-env.sh JWT_SECRET \$(openssl rand -base64 32)"
    echo ""
}

update_key() {
    local key=$1
    local value=$2
    
    if [ ! -f "$ENV_FILE" ]; then
        echo "Creating .env file from .env.example..."
        cp "$EXAMPLE_FILE" "$ENV_FILE"
    fi
    
    if grep -q "^${key}=" "$ENV_FILE"; then
        # Update existing key
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s|^${key}=.*|${key}=\"${value}\"|" "$ENV_FILE"
        else
            # Linux
            sed -i "s|^${key}=.*|${key}=\"${value}\"|" "$ENV_FILE"
        fi
        echo "✅ Updated $key"
    else
        # Add new key
        echo "${key}=\"${value}\"" >> "$ENV_FILE"
        echo "✅ Added $key"
    fi
}

list_keys() {
    if [ -f "$ENV_FILE" ]; then
        echo "Current .env keys:"
        echo "=================="
        grep -E '^[A-Z_]+=' "$ENV_FILE" | while IFS='=' read -r key value; do
            value=$(echo "$value" | sed 's/"//g')
            if [ ${#value} -gt 20 ]; then
                value="${value:0:20}..."
            fi
            echo "$key = $value"
        done
    else
        echo "⚠️  .env file not found. Create it from .env.example"
    fi
}

case "$1" in
    help|--help|-h)
        show_help
        ;;
    list)
        list_keys
        ;;
    "")
        echo "❌ Error: Key and value required"
        show_help
        exit 1
        ;;
    *)
        if [ -z "$2" ]; then
            echo "❌ Error: Value required for key $1"
            show_help
            exit 1
        fi
        update_key "$1" "$2"
        ;;
esac

