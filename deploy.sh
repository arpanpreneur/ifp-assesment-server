#!/bin/bash

npm i
cd client
npm i
npm run build
cd ..
sudo docker-compose up -d
