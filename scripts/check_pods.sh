#!/bin/bash

# List all pods
echo "Listing all pods:"
kubectl get pods

# Describe all pods and show their logs
echo "Describing all pods and showing their logs:"
for pod in $(kubectl get pods -o custom-columns=:metadata.name); do
    echo "----------------------------"
    echo "Describing pod: $pod"
    kubectl describe pod $pod
    echo "Logs for pod: $pod"
    kubectl logs $pod
done
