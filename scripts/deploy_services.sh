#!/bin/bash

# Deploy all services
echo "Deploying all services:"
kubectl apply -f k8s/api-gateway-deployment.yml
kubectl apply -f k8s/auth-service-deployment.yml
kubectl apply -f k8s/auth-service-secret.yml
kubectl apply -f k8s/chat-service-deployment.yml
kubectl apply -f k8s/frontend-deployment.yml
kubectl apply -f k8s/frontend-service.yaml
kubectl apply -f k8s/ingress.yml
kubectl apply -f k8s/message-service-deployment.yml
kubectl apply -f k8s/mongo-deployment.yml
kubectl apply -f k8s/user-service-deployment.yml
