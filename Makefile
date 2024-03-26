.PHONY: help start stop build sh run docker-build

.DEFAULT_GOAL := help
APP_NAME = deciphergame 

RUN_ARGS :=

ifeq (run,$(firstword $(MAKECMDGOALS)))
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(RUN_ARGS):;@:)
endif

docker-build: ## Clean build (remove volumes and rebuild)
	@docker-compose down -v --remove-orphans
	@docker-compose build --no-cache

start: ## Start development environment
	@docker-compose up -d --force-recreate

build: ## Build dist package + .tgz package for publishing
	@rm -rf $(PWD)/dist
	@mkdir $(PWD)/dist
	@docker-compose run --rm -v $(PWD)/dist:/opt/app/dist ${APP_NAME} sh -c "pnpm run build && pnpm pack --pack-destination /opt/app/dist"
	@rm -rf $(PWD)/app/dist

stop: ## Stop all services and remove orphaned containers
	@docker-compose down --remove-orphans

sh: ## Get a shell inside the app container
	@docker-compose exec ${APP_NAME} sh

run: ## Start service with arguments passed to npm run (e.g., make run start or make run build)
	@docker-compose run --rm --service-ports ${APP_NAME} sh -c "npm run $(RUN_ARGS)"

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
