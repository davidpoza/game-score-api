build:
	docker-compose build --no-cache
start:
	docker-compose down || true && docker-compose up -d && docker stop game-score-api_api_1