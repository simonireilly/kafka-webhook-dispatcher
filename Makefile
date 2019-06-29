#
# This is a make file for running commands in this application
#
COMPOSE=-f dev.yml -f dispatcher.yml

%-restart: ## Restart the app
	docker-compose -f $*.yml stop

build: ## Build all required services
	docker-compose ${COMPOSE} build

up: ## Start the application
	docker-compose ${COMPOSE} up --d

stop: ## Stop the application
	docker-compose ${COMPOSE} stop

tail: ## Tail the application logs
	docker-compose ${COMPOSE} logs --tail="100" -f

