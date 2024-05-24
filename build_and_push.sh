#!/bin/bash

# Variables
DOCKER_USER="grejs420"
SERVICES=("user-service" "chat-service" "message-service" "auth-service")

# Build, tag, and push each service
for SERVICE in "${SERVICES[@]}"; do
  echo "Building $SERVICE..."
  docker-compose build $SERVICE

  echo "Tagging $SERVICE..."
  docker tag ${SERVICE} ${DOCKER_USER}/${SERVICE}:latest

  echo "Pushing $SERVICE to Docker Hub..."
  docker push ${DOCKER_USER}/${SERVICE}:latest
done
