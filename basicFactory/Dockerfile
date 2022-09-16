FROM openjdk:11-jre
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY Wallet_JongHyuk /home/Wallet_JongHyuk
ENTRYPOINT ["java","-jar", "/app.jar"]