ifneq (,$(wildcard ./ .env))
	include .env
	export
	ENV_FILE_PARAM = --env-file .env
endif

#Dev
build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build-dev


run-dev:
	docker-compose -f docker-compose.yml down -v
	docker-compose -f docker-compose.yml up

##Local
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build-dev
	cd socket && $(MAKE) build-dev

run-local:
	docker-compose -f docker-compose.yml up


##Production

build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build-production
	cd socket && $(MAKE) build-production

run-production:
	docker-compose -f docker-compose.yml down -v
	docker-compose -f docker-compose.yml up

SSH_STRING:=root@137.184.115.87

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/