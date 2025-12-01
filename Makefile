# ============================================
# Solana DeFi Wallet - Makefile
# Docker deployment management commands
# ============================================

# Default shell
SHELL := /bin/bash

# Docker compose command (supports both v1 and v2)
DOCKER_COMPOSE := docker compose

# Project name
PROJECT_NAME := solana-wallet

# Colors for output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m

# ==========================================
# Help Target
# ==========================================
.PHONY: help
help: ## Show this help message
	@echo ""
	@echo "Solana DeFi Wallet - Docker Management"
	@echo "======================================="
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""

# ==========================================
# Service Management
# ==========================================
.PHONY: up
up: ## Start all services in detached mode
	@echo "$(GREEN)Starting all services...$(NC)"
	$(DOCKER_COMPOSE) up -d
	@echo "$(GREEN)Services started successfully!$(NC)"
	@echo "Application: http://localhost:80"

.PHONY: up-build
up-build: ## Build and start all services
	@echo "$(GREEN)Building and starting all services...$(NC)"
	$(DOCKER_COMPOSE) up -d --build
	@echo "$(GREEN)Services started successfully!$(NC)"

.PHONY: down
down: ## Stop and remove all services
	@echo "$(YELLOW)Stopping all services...$(NC)"
	$(DOCKER_COMPOSE) down
	@echo "$(GREEN)Services stopped successfully!$(NC)"

.PHONY: restart
restart: ## Restart all services
	@echo "$(YELLOW)Restarting all services...$(NC)"
	$(DOCKER_COMPOSE) restart
	@echo "$(GREEN)Services restarted successfully!$(NC)"

.PHONY: stop
stop: ## Stop all services without removing
	@echo "$(YELLOW)Stopping all services...$(NC)"
	$(DOCKER_COMPOSE) stop
	@echo "$(GREEN)Services stopped!$(NC)"

.PHONY: start
start: ## Start existing containers
	@echo "$(GREEN)Starting existing containers...$(NC)"
	$(DOCKER_COMPOSE) start

# ==========================================
# Build Commands
# ==========================================
.PHONY: build
build: ## Build Docker images
	@echo "$(GREEN)Building Docker images...$(NC)"
	$(DOCKER_COMPOSE) build
	@echo "$(GREEN)Build completed!$(NC)"

.PHONY: rebuild
rebuild: ## Rebuild images from scratch (no cache)
	@echo "$(GREEN)Rebuilding Docker images (no cache)...$(NC)"
	$(DOCKER_COMPOSE) build --no-cache
	@echo "$(GREEN)Rebuild completed!$(NC)"

.PHONY: pull
pull: ## Pull latest images
	@echo "$(GREEN)Pulling latest images...$(NC)"
	$(DOCKER_COMPOSE) pull

# ==========================================
# Logs
# ==========================================
.PHONY: logs
logs: ## View logs from all services (follow mode)
	$(DOCKER_COMPOSE) logs -f

.PHONY: logs-app
logs-app: ## View application logs
	$(DOCKER_COMPOSE) logs -f app

.PHONY: logs-db
logs-db: ## View database logs
	$(DOCKER_COMPOSE) logs -f postgres

.PHONY: logs-nginx
logs-nginx: ## View nginx logs
	$(DOCKER_COMPOSE) logs -f nginx

# ==========================================
# Database Operations
# ==========================================
.PHONY: migrate
migrate: ## Run database migrations
	@echo "$(GREEN)Running database migrations...$(NC)"
	$(DOCKER_COMPOSE) exec app sh -c "npx prisma migrate deploy"
	@echo "$(GREEN)Migrations completed!$(NC)"

.PHONY: migrate-status
migrate-status: ## Check migration status
	@echo "$(GREEN)Checking migration status...$(NC)"
	$(DOCKER_COMPOSE) exec app sh -c "npx prisma migrate status"

.PHONY: seed
seed: ## Run database seeding
	@echo "$(GREEN)Seeding database...$(NC)"
	$(DOCKER_COMPOSE) exec app sh -c "npx prisma db seed" || echo "$(YELLOW)No seed script configured$(NC)"
	@echo "$(GREEN)Seeding completed!$(NC)"

.PHONY: prisma-generate
prisma-generate: ## Generate Prisma client
	@echo "$(GREEN)Generating Prisma client...$(NC)"
	$(DOCKER_COMPOSE) exec app sh -c "npx prisma generate"
	@echo "$(GREEN)Prisma client generated!$(NC)"

.PHONY: prisma-studio
prisma-studio: ## Open Prisma Studio (database GUI)
	@echo "$(GREEN)Opening Prisma Studio...$(NC)"
	@echo "$(YELLOW)Note: This will run locally, not in Docker$(NC)"
	npx prisma studio

# ==========================================
# Shell Access
# ==========================================
.PHONY: shell-app
shell-app: ## Open shell in app container
	$(DOCKER_COMPOSE) exec app sh

.PHONY: shell-db
shell-db: ## Open psql shell in database
	$(DOCKER_COMPOSE) exec postgres psql -U $${POSTGRES_USER:-solana_user} -d $${POSTGRES_DB:-solana_wallet}

.PHONY: shell-nginx
shell-nginx: ## Open shell in nginx container
	$(DOCKER_COMPOSE) exec nginx sh

# ==========================================
# Status and Monitoring
# ==========================================
.PHONY: status
status: ## Show status of all services
	@echo "$(GREEN)Service Status:$(NC)"
	@echo ""
	$(DOCKER_COMPOSE) ps
	@echo ""
	@echo "$(GREEN)Health Status:$(NC)"
	@$(DOCKER_COMPOSE) ps --format "table {{.Name}}\t{{.Status}}" | tail -n +2

.PHONY: health
health: ## Check health of all services
	@echo "$(GREEN)Checking service health...$(NC)"
	@echo ""
	@echo "PostgreSQL:"
	@$(DOCKER_COMPOSE) exec postgres pg_isready -U $${POSTGRES_USER:-solana_user} -d $${POSTGRES_DB:-solana_wallet} || echo "$(RED)Not healthy$(NC)"
	@echo ""
	@echo "Application:"
	@curl -s http://localhost:3000/api/health 2>/dev/null || curl -s http://localhost/api/health 2>/dev/null || echo "$(RED)Not healthy$(NC)"
	@echo ""
	@echo "Nginx:"
	@curl -s http://localhost/nginx-health 2>/dev/null || echo "$(RED)Not healthy$(NC)"
	@echo ""

.PHONY: stats
stats: ## Show resource usage statistics
	@echo "$(GREEN)Container Resource Usage:$(NC)"
	docker stats --no-stream $(shell $(DOCKER_COMPOSE) ps -q)

# ==========================================
# Cleanup
# ==========================================
.PHONY: clean
clean: ## Remove containers, volumes, and clean up
	@echo "$(RED)WARNING: This will remove all containers and volumes!$(NC)"
	@read -p "Are you sure? [y/N] " confirm && [ $${confirm:-N} = y ] || exit 1
	@echo "$(YELLOW)Cleaning up...$(NC)"
	$(DOCKER_COMPOSE) down -v --remove-orphans
	@echo "$(GREEN)Cleanup completed!$(NC)"

.PHONY: clean-images
clean-images: ## Remove all project images
	@echo "$(YELLOW)Removing project images...$(NC)"
	docker images | grep $(PROJECT_NAME) | awk '{print $$3}' | xargs -r docker rmi -f
	@echo "$(GREEN)Images removed!$(NC)"

.PHONY: clean-all
clean-all: clean clean-images ## Remove everything (containers, volumes, images)
	@echo "$(GREEN)Full cleanup completed!$(NC)"

.PHONY: prune
prune: ## Remove unused Docker resources
	@echo "$(YELLOW)Pruning unused Docker resources...$(NC)"
	docker system prune -f
	@echo "$(GREEN)Prune completed!$(NC)"

# ==========================================
# Development
# ==========================================
.PHONY: dev
dev: ## Start services in development mode
	@echo "$(GREEN)Starting in development mode...$(NC)"
	$(DOCKER_COMPOSE) up

.PHONY: dev-app
dev-app: ## Run app in development mode (requires local Node.js)
	@echo "$(GREEN)Starting development server...$(NC)"
	npm run dev

# ==========================================
# Backup and Restore
# ==========================================
.PHONY: backup-db
backup-db: ## Backup database to ./backups directory
	@echo "$(GREEN)Creating database backup...$(NC)"
	@mkdir -p ./backups
	@$(DOCKER_COMPOSE) exec -T postgres pg_dump -U $${POSTGRES_USER:-solana_user} $${POSTGRES_DB:-solana_wallet} > ./backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created in ./backups/$(NC)"

.PHONY: restore-db
restore-db: ## Restore database from backup (usage: make restore-db BACKUP=filename.sql)
	@if [ -z "$(BACKUP)" ]; then \
		echo "$(RED)Error: Please specify backup file$(NC)"; \
		echo "Usage: make restore-db BACKUP=backups/backup_file.sql"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Restoring database from $(BACKUP)...$(NC)"
	@cat $(BACKUP) | $(DOCKER_COMPOSE) exec -T postgres psql -U $${POSTGRES_USER:-solana_user} $${POSTGRES_DB:-solana_wallet}
	@echo "$(GREEN)Database restored!$(NC)"

# ==========================================
# Quick Commands
# ==========================================
.PHONY: fresh
fresh: down clean up-build migrate ## Fresh start: clean, build, and start everything
	@echo "$(GREEN)Fresh deployment completed!$(NC)"

.PHONY: init
init: ## Initialize project for first run
	@echo "$(GREEN)Initializing project...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)Creating .env file from .env.example...$(NC)"; \
		cp .env.example .env; \
		echo "$(GREEN).env file created. Please update with your configuration.$(NC)"; \
	else \
		echo "$(YELLOW).env file already exists$(NC)"; \
	fi
	@echo ""
	@echo "$(GREEN)Initialization completed!$(NC)"
	@echo "Next steps:"
	@echo "  1. Edit .env with your configuration"
	@echo "  2. Run 'make up-build' to start services"
	@echo "  3. Run 'make migrate' to run database migrations"

# Default target
.DEFAULT_GOAL := help
