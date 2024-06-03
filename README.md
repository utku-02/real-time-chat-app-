# Real-Time Chat Application

## Overview

This document provides an overview of the interface between the frontend and backend of the Real-Time Chat Application. It describes the various endpoints, updated functionality, and integration details of the application.

## Table of Contents

1. [API Gateway Endpoints](#api-gateway-endpoints)
2. [User Service Endpoints](#user-service-endpoints)
3. [Chat Service Endpoints](#chat-service-endpoints)
4. [Message Service Endpoints](#message-service-endpoints)
5. [Auth Service Endpoints](#auth-service-endpoints)
6. [Frontend Integration](#frontend-integration)
7. [Environment Variables](#environment-variables)
8. [Kubernetes Ingress Configuration](#kubernetes-ingress-configuration)

## API Gateway Endpoints

The API Gateway routes incoming API requests from the frontend to the appropriate service endpoints.

### Auth Routes

- **Login**
  - **Endpoint**: `/api/auth/login`
  - **Method**: `POST`
  - **Description**: Authenticates a user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

- **Register**
  - **Endpoint**: `/api/auth/register`
  - **Method**: `POST`
  - **Description**: Registers a new user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "username": "username",
      "password": "password"
    }
    ```

- **Forgot Password**
  - **Endpoint**: `/api/auth/forgot-password`
  - **Method**: `POST`
  - **Description**: Initiates the password reset process.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com"
    }
    ```

- **Reset Password**
  - **Endpoint**: `/api/auth/reset-password/:token`
  - **Method**: `POST`
  - **Description**: Resets the user's password using the provided token.
  - **Request Body**:
    ```json
    {
      "password": "newpassword"
    }
    ```

### User Routes

- **Get Users**
  - **Endpoint**: `/api/users`
  - **Method**: `GET`
  - **Description**: Retrieves a list of users.

- **Get User**
  - **Endpoint**: `/api/users/:userId`
  - **Method**: `GET`
  - **Description**: Retrieves a user by ID.

- **Update User**
  - **Endpoint**: `/api/users/:userId`
  - **Method**: `PUT`
  - **Description**: Updates an existing user.
  - **Request Body**:
    ```json
    {
      "email": "new-email@example.com",
      "username": "new-username"
    }
    ```

### Chat Routes

- **Create Chat Room**
  - **Endpoint**: `/api/chats`
  - **Method**: `POST`
  - **Description**: Creates a new chat room.
  - **Request Body**:
    ```json
    {
      "name": "Chat Room Name"
    }
    ```

- **Get Chat Rooms**
  - **Endpoint**: `/api/chats`
  - **Method**: `GET`
  - **Description**: Retrieves a list of chat rooms.

- **Get Chat Room**
  - **Endpoint**: `/api/chats/:chatId`
  - **Method**: `GET`
  - **Description**: Retrieves a chat room by ID.

- **Update Chat Room**
  - **Endpoint**: `/api/chats/:chatId`
  - **Method**: `PUT`
  - **Description**: Updates an existing chat room.
  - **Request Body**:
    ```json
    {
      "name": "New Chat Room Name"
    }
    ```

- **Delete Chat Room**
  - **Endpoint**: `/api/chats/:chatId`
  - **Method**: `DELETE`
  - **Description**: Deletes a chat room by ID.

- **Invite Users to Chat Room**
  - **Endpoint**: `/api/chats/:chatId/invite`
  - **Method**: `POST`
  - **Description**: Invites users to a chat room.
  - **Request Body**:
    ```json
    {
      "users": ["user-id-1", "user-id-2"]
    }
    ```

### Message Routes

- **Create Message**
  - **Endpoint**: `/api/messages`
  - **Method**: `POST`
  - **Description**: Creates a new message.
  - **Request Body**:
    ```json
    {
      "content": "Message content",
      "senderId": "user-id",
      "chatRoomId": "chat-room-id"
    }
    ```

- **Get Messages by Chat Room ID**
  - **Endpoint**: `/api/messages/:chatId`
  - **Method**: `GET`
  - **Description**: Retrieves messages by chat room ID.

### Profile Routes

- **Get Profile**
  - **Endpoint**: `/api/profile`
  - **Method**: `GET`
  - **Description**: Retrieves the profile of the authenticated user.

- **Update Profile**
  - **Endpoint**: `/api/profile`
  - **Method**: `PUT`
  - **Description**: Updates the profile of the authenticated user.
  - **Request Body**:
    ```json
    {
      "email": "new-email@example.com",
      "username": "new-username"
    }
    ```

### Settings Routes

- **Get Settings**
  - **Endpoint**: `/api/settings`
  - **Method**: `GET`
  - **Description**: Retrieves the settings of the authenticated user.

- **Update Settings**
  - **Endpoint**: `/api/settings`
  - **Method**: `PUT`
  - **Description**: Updates the settings of the authenticated user.
  - **Request Body**:
    ```json
    {
      "notifications": true,
      "privacy": "private",
      "theme": "dark"
    }
    ```

## Frontend Integration

The frontend interacts with the backend through the API Gateway endpoints described above. The frontend is built using React and provides the following pages and functionality:

1. **Login Page**: Allows users to log in to the application.
2. **Registration Page**: Allows users to register a new account.
3. **Dashboard**: Displays a list of chat rooms the user is a part of and allows creating new chat rooms.
4. **Chat Room Page**: Displays the messages in a chat room and allows sending new messages.
5. **User Settings Page**: Allows users to view and update their settings.
6. **User Profile Page**: Displays user profile information and allows updating it.

The `Ingress` configuration routes HTTP requests to the appropriate backend services based on the URL path. This setup allows the frontend to make API requests to a single host (`swwao.courses.orbit.au.dk`) with different path prefixes (`/grp-6/auth`, `/grp-6/user`, `/grp-6/chat`, `/grp-6/message`, `/grp-6/frontend`, `/grp-6/graphql`), which are then directed to the corresponding services.

## Environment Variables

The application uses Kubernetes ConfigMaps and Secrets to manage environment variables. Below are the environment variables used:

### ConfigMap

- `GRAPHQL_URL`: The URL of the GraphQL server.
- `RABBITMQ_HOST`: The hostname of the RabbitMQ server.
- `RABBITMQ_PORT`: The port of the RabbitMQ server.
- `FRONTEND_URL`: The URL of the frontend application.

### Secrets

- `JWT_SECRET`: The secret key used for JWT authentication.
- `RABBITMQ_DEFAULT_USER`: The default RabbitMQ username (base64 encoded).
- `RABBITMQ_DEFAULT_PASS`: The default RabbitMQ password (base64 encoded).
- `EMAIL_USER`: The email user for sending emails (base64 encoded).
- `EMAIL_PASS`: The email password for sending emails (base64 encoded).

### Deployment Example

Here's an example of a Kubernetes deployment for a service using environment variables from ConfigMap and Secrets:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-service
  namespace: real-time-chat-app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: example-service
  template:
    metadata:
      labels:
        app: example-service
    spec:
      containers:
      - name: example-service
        image: example-service:latest
        ports:
        - containerPort: 3000
        envFrom:
        - configMapRef:
            name: real-time-chat-config
        env:
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: real-time-chat-secrets
              key: JWT_SECRET
        - name: RABBITMQ_DEFAULT_USER
          valueFrom:
            secretKeyRef:
              name: real-time-chat-secrets
              key: RABBITMQ_DEFAULT_USER
        - name: RABBITMQ_DEFAULT_PASS
          valueFrom:
            secretKeyRef:
              name: real-time-chat-secrets
              key: RABBITMQ_DEFAULT_PASS
        - name: RABBITMQ_URL
          value: "amqp://$(RABBITMQ_DEFAULT_USER):$(RABBITMQ_DEFAULT_PASS)@$(RABBITMQ_HOST):$(RABBITMQ_PORT)"
        - name: GRAPHQL_URL
          valueFrom:
            configMapKeyRef:
              name: real-time-chat-config
              key: GRAPHQL_URL
        - name: FRONTEND_URL
          valueFrom:
            configMapKeyRef:
              name: real-time-chat-config
              key: FRONTEND_URL
        - name: EMAIL_USER
          valueFrom:
            secretKeyRef:
              name: real-time-chat-secrets
              key: EMAIL_USER
        - name: EMAIL_PASS
          valueFrom:
            secretKeyRef:
              name: real-time-chat-secrets
              key: EMAIL_PASS
