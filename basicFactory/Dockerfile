FROM openjdk:11-jre
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY Wallet_quiz /home/wallet_quiz
ENTRYPOINT ["java","-jar", "/app.jar"]