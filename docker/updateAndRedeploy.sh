#!/bin/bash

bash ../buildJar.sh
docker-compose -f docker-compose-prod.yml up -d --build