NAME := $(lastword $(subst /, ,$(CURDIR)))

bindir := $(shell yarn bin)
AVA := $(bindir)/ava
NYC := $(bindir)/nyc
UI := $(shell pwd)/../ui

.PHONY: install-production
install-production: compile
	yarn install --production --no-lockfile

.PHONY: install
install:
	NODE_ENV=development yarn install --no-lockfile

.PHONY: clean
clean:
	@rm -rf node_modules

ui:
ifeq ($(BUILD),production)
else
	$(MAKE) compile -C $(UI)
endif

.PHONY: test
test: ui
	NODE_ENV=test BABEL_DISABLE_CACHE=1 CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/**/*.js $(TEST_ARGS)

XUNIT_DIR := ${CIRCLE_TEST_REPORTS}/tap-xunit
XUNIT := $(bindir)/tap-xunit
XUNIT_OUTPUT := >> ${CIRCLE_TEST_REPORTS}/tap-xunit/xunit-$(NAME)
.PHONY: test-ci
test-ci: ui
	mkdir -p $(XUNIT_DIR)
	BABEL_DISABLE_CACHE=1 NODE_ENV=test CONFIG=$(shell pwd)/webpack/index.js $(NYC) $(AVA) test/**/*.js -t | $(XUNIT) $(XUNIT_OUTPUT).xml

.PHONY: compile
compile: ui install
ifeq ($(BUILD),production)
	NODE_ENV=production $(bindir)/webpack --config webpack/index.js
else
	$(bindir)/webpack --config webpack/index.js
endif

.PHONY: build
build:
	docker build -t quay.io/yldio/joyent-dashboard-$(NAME) .

.PHONY: push
push:
	docker push quay.io/yldio/joyent-dashboard-$(NAME)

.PHONY: start
start:
	node server

.PHONY: lint
lint:
	$(bindir)/eslint .
#	$(bindir)/stylelint './src/**/*.js'

.PHONY: lint-ci
lint-ci:
	mkdir -p $(XUNIT_DIR)
	-$(bindir)/eslint . --format tap | $(XUNIT) $(XUNIT_OUTPUT)-lint.xml

.PHONY: licence-check
licence-check:
	../node_modules/.bin/license-to-fail ../licence.js
