docker network create --driver bridge tcc-net

docker-compose -f start-postgres.yml up -d
sleep 10

cd server
docker build -t tcc-server .
cd ..

docker-compose -f start-server.yml up -d