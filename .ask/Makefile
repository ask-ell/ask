ASK_VERSION := "0.0.5"

DOCKER_SWARM_STACK_NAME := $(shell cat .ask/NAME)

MAKEFILE_PATH := ".ask/Makefile"


.PHONY: help
# Show help
help:
	@cat $(MAKEFILE_LIST) | docker run --rm -i xanders/make-help

.PHONY: reload-makefile
# Reload Makefile from latest Ask version
reload-makefile:
	curl -o $(MAKEFILE_PATH) https://raw.githubusercontent.com/ask-ell/ask/refs/heads/release/types/node/Makefile

.PHONY: requirements-get
# Get requirements
requirements-get:
	@echo "Requirements"
	@echo "Make : https://www.gnu.org/software/make/manual/make.html"
	@echo "Node : https://nodejs.org/"
	@echo "NPM : https://www.npmjs.com/"
	@echo "Docker : https://docker.com/"

.ask/secrets.json:
	cp -r .ask/secrets.sample.json .ask/secrets.json


# TODO: https://ask-ell.atlassian.net/browse/FACTORY-97
packageManager := npm
packageManagerRun := $(packageManager) run

.PHONY: install
# Install dependencies
install:
	$(packageManager) install
	date > node_modules/last_install

node_modules/last_install:
	@make -f $(MAKEFILE_PATH) install

.PHONY: build
# Build project
build: node_modules/last_install
	$(packageManagerRun) build
	mkdir -p .ask/build
	date > .ask/build/last_build

.ask/build/last_build:
	@make -f $(MAKEFILE_PATH) build

.PHONY: serve
# Run services in development mode
serve: .ask/secrets.json node_modules/last_install
	$(packageManagerRun) start:dev

.PHONY: format
# Format project
format:
	$(packageManagerRun) format

.PHONY: lint
# Format project
lint:
	$(packageManagerRun) lint

.PHONY: test
# Run tests
test: node_modules/last_install
	$(packageManagerRun) test

.PHONY: test-watch
# Run tests in watch mode
test-watch: node_modules/last_install
	$(packageManagerRun) test:watch

.PHONY: clean
# Stop and clean services
clean:
	$(packageManagerRun) nx reset

.PHONY: deploy
# Deploy services in Docker Swarm
deploy: .ask/secrets.json
	docker stack deploy -c .ask/swarm.yml --with-registry-auth --resolve-image always $(DOCKER_SWARM_STACK_NAME)

.PHONY: undeploy
# Undeploy services in Docker Swarm
undeploy: .ask/secrets.json
	docker stack rm $(DOCKER_SWARM_STACK_NAME)