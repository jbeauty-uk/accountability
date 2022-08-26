FROM eclipse-temurin:17-jre
COPY ./build/libs/accountability.jar app.jar

ENV SPRING_PROFILES_ACTIVE=prod

ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
