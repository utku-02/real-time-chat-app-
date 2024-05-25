#!/bin/bash

# Restart the deployments to pull the latest images
kubectl rollout restart deployment api-gateway
kubectl rollout restart deployment auth-service
kubectl rollout restart deployment chat-service
kubectl rollout restart deployment message-service
kubectl rollout restart deployment user-service
kubectl rollout restart deployment frontend
