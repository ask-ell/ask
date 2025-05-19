ASK_VERSION := "0.0.4"

.PHONY: reload-makefile
# Reload Makefile from latest Ask version
reload-makefile:
	curl -o Makefile https://raw.githubusercontent.com/ask-ell/ask/refs/heads/release/types/node/Makefile

.PHONY: help
# Show help
help:
	@cat $(MAKEFILE_LIST) | docker run --rm -i xanders/make-help

.env:
	cp .env.sample .env

.PHONY: install
# Install dependencies
install:
	npm install
	date > node_modules/last_install

node_modules/last_install:
	@make install

.PHONY: build
# Build project
build:
	npm run build
	mkdir -p build
	date > build/last_build

build/last_build:
	@make build

.PHONY: serve
# Run project in development mode
serve: .env node_modules/last_install
	npm run start:dev

.PHONY: format
# Format project
format:
	npm run format

.PHONY: lint
# Format project
lint:
	npm run lint

.PHONY: test
# Run tests
test: node_modules/last_install
	npm run test

.PHONY: test-watch
# Run tests in watch mode
test-watch: node_modules/last_install
	npm run test:watch
