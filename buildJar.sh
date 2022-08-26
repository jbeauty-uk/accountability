#!/bin/bash

bash ./gradlew bootJar
mv ./build/libs/accountability.jar ./docker/app.jar

