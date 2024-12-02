docker network create --driver bridge tcc-net

cd server
docker build -t tcc-server .
cd ..

docker-compose -f start-server.yml up -d