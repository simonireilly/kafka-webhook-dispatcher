#
# This is a make file for running commands in this application
#
COMPOSE=docker-compose -f dev.yml -f dispatcher.yml
COMPOSE_DISPACTH=docker-compose -f dispatcher.yml

init: ## Initialise the project
	make build dev-up create-topics

build: ## Build all required services
	${COMPOSE} build

up: ## Start the application
	${COMPOSE} up --d

%-up: ## Boot only the given compose
	docker-compose -f $*.yml up --d

stop: ## Stop the application
	${COMPOSE} stop

down: ## Remoe all containers and volumes
	$(COMPOSE) down

restart: ## Restart all the containers
	make stop
	make up

tail: ## Tail the application logs
	${COMPOSE} logs --tail="100" -f

produce: ## Produce some messages so that we can test
	${COMPOSE_DISPACTH} run nodejs npm run produce

create-topics: ## Produce some messages so that we can test
	${COMPOSE_DISPACTH} run nodejs npm run setup

integration-test: ## Run the integration tests
	make build dev-up
	${COMPOSE_DISPACTH} run nodejs npm run test:integration
