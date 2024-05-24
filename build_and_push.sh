#!/bin/sh

services=("user-service" "chat-service" "message-service" "auth-service")
for service in "${services[@]}"; do
    docker build -t grejs420/$service:latest ./$service
    docker push grejs420/$service:latest
done