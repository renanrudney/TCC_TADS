docker-compose -f start-postgres.yml up -d
sleep 5

docker-compose -f start-server.yml up -d