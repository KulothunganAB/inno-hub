# InnoHub API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require the user ID to be sent in the request body. The user ID is obtained after login and stored in localStorage on the frontend.

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "display_name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

**Error Responses:**
- 400: Email and password required / User already exists
- 500: Internal server error

---

### Login User
**POST** `/auth/login`

Authenticate user and get user information.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "display_name": "John Doe"
  }
}
```

**Error Responses:**
- 400: Email and password required
- 401: Invalid credentials
- 500: Internal server error

---

## Ideas Endpoints

### Create Idea
**POST** `/ideas`

Create a new innovation idea.

**Request Body:**
```json
{
  "user_id": 1,
  "title": "AI-Powered Healthcare App",
  "domain": "HealthTech",
  "problem": "Long waiting times at hospitals",
  "solution": "AI-based appointment scheduling system",
  "stage": "Idea",
  "funding_amount": 50000
}
```

**Response (201):**
```json
{
  "message": "Idea created successfully",
  "ideaId": 1
}
```

**Error Responses:**
- 400: Missing required fields
- 500: Internal server error

---

### Get All Ideas
**GET** `/ideas`

Retrieve all ideas from all users.

**Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "AI-Powered Healthcare App",
    "domain": "HealthTech",
    "problem": "Long waiting times at hospitals",
    "solution": "AI-based appointment scheduling system",
    "stage": "Idea",
    "funding_amount": 50000,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "display_name": "John Doe",
    "email": "user@example.com"
  }
]
```

---

### Get Ideas by User
**GET** `/ideas/user/:userId`

Retrieve all ideas posted by a specific user.

**Parameters:**
- `userId` (path): User ID

**Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "AI-Powered Healthcare App",
    "domain": "HealthTech",
    "problem": "Long waiting times at hospitals",
    "solution": "AI-based appointment scheduling system",
    "stage": "MVP",
    "funding_amount": 50000,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z",
    "display_name": "John Doe",
    "email": "user@example.com"
  }
]
```

---

### Get Single Idea
**GET** `/ideas/:id`

Retrieve details of a specific idea.

**Parameters:**
- `id` (path): Idea ID

**Response (200):**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "AI-Powered Healthcare App",
  "domain": "HealthTech",
  "problem": "Long waiting times at hospitals",
  "solution": "AI-based appointment scheduling system",
  "stage": "MVP",
  "funding_amount": 50000,
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z",
  "display_name": "John Doe",
  "email": "user@example.com"
}
```

**Error Responses:**
- 404: Idea not found
- 500: Internal server error

---

### Update Idea
**PUT** `/ideas/:id`

Update an existing idea (only by owner).

**Parameters:**
- `id` (path): Idea ID

**Request Body:**
```json
{
  "user_id": 1,
  "title": "AI-Powered Healthcare Platform",
  "domain": "HealthTech",
  "problem": "Long waiting times at hospitals",
  "solution": "AI-based appointment and resource management",
  "stage": "MVP",
  "funding_amount": 75000
}
```

**Response (200):**
```json
{
  "message": "Idea updated successfully"
}
```

**Error Responses:**
- 403: Not authorized to update
- 404: Idea not found
- 500: Internal server error

---

### Delete Idea
**DELETE** `/ideas/:id`

Delete an idea (only by owner).

**Parameters:**
- `id` (path): Idea ID

**Request Body:**
```json
{
  "user_id": 1
}
```

**Response (200):**
```json
{
  "message": "Idea deleted successfully"
}
```

**Error Responses:**
- 403: Not authorized to delete
- 404: Idea not found
- 500: Internal server error

---

### Get Dashboard Statistics
**GET** `/ideas/dashboard/:userId`

Get statistics for user dashboard.

**Parameters:**
- `userId` (path): User ID

**Response (200):**
```json
{
  "totalIdeas": 5,
  "totalMessages": 12,
  "recentIdeas": [
    {
      "id": 1,
      "title": "AI-Powered Healthcare App",
      "domain": "HealthTech",
      "problem": "Long waiting times",
      "stage": "MVP",
      "funding_amount": 50000,
      "created_at": "2024-01-15T10:30:00.000Z",
      "display_name": "John Doe"
    }
  ]
}
```

---

## Messages Endpoints

### Send Message
**POST** `/messages`

Send a message about an idea.

**Request Body:**
```json
{
  "sender_id": 1,
  "receiver_id": 2,
  "idea_id": 5,
  "message": "I'm interested in collaborating on your idea!"
}
```

**Response (201):**
```json
{
  "message": "Message sent successfully",
  "messageId": 1
}
```

**Error Responses:**
- 400: Missing required fields
- 500: Internal server error

---

### Get Inbox Messages
**GET** `/messages/inbox/:userId`

Get all messages received by a user.

**Parameters:**
- `userId` (path): User ID

**Response (200):**
```json
[
  {
    "id": 1,
    "sender_id": 2,
    "receiver_id": 1,
    "idea_id": 5,
    "message": "I'm interested in collaborating!",
    "created_at": "2024-01-15T11:00:00.000Z",
    "sender_name": "Jane Smith",
    "sender_email": "jane@example.com",
    "idea_title": "AI-Powered Healthcare App",
    "idea_domain": "HealthTech"
  }
]
```

---

### Get Sent Messages
**GET** `/messages/sent/:userId`

Get all messages sent by a user.

**Parameters:**
- `userId` (path): User ID

**Response (200):**
```json
[
  {
    "id": 2,
    "sender_id": 1,
    "receiver_id": 3,
    "idea_id": 7,
    "message": "Great idea! Would love to discuss further.",
    "created_at": "2024-01-15T12:00:00.000Z",
    "receiver_name": "Bob Johnson",
    "receiver_email": "bob@example.com",
    "idea_title": "EdTech Platform",
    "idea_domain": "Education"
  }
]
```

---

### Get Messages by Idea
**GET** `/messages/idea/:ideaId?userId=<userId>`

Get all messages related to a specific idea for a user.

**Parameters:**
- `ideaId` (path): Idea ID
- `userId` (query): User ID

**Response (200):**
```json
[
  {
    "id": 1,
    "sender_id": 1,
    "receiver_id": 2,
    "idea_id": 5,
    "message": "Interested in your idea!",
    "created_at": "2024-01-15T11:00:00.000Z",
    "sender_name": "John Doe",
    "receiver_name": "Jane Smith",
    "idea_title": "AI Healthcare App"
  }
]
```

---

## Users Endpoints

### Get User Profile
**GET** `/users/:userId`

Get user profile information.

**Parameters:**
- `userId` (path): User ID

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "display_name": "John Doe",
  "domain": "Full Stack Developer",
  "bio": "Passionate about innovation and technology",
  "created_at": "2024-01-10T09:00:00.000Z"
}
```

**Error Responses:**
- 404: User not found
- 500: Internal server error

---

### Update User Profile
**PUT** `/users/:userId`

Update user profile information.

**Parameters:**
- `userId` (path): User ID

**Request Body:**
```json
{
  "display_name": "John Doe Jr.",
  "domain": "Full Stack Developer & AI Enthusiast",
  "bio": "Building innovative solutions for real-world problems"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully"
}
```

**Error Responses:**
- 500: Internal server error

---

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP Status Codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized
- **403**: Forbidden
- **404**: Not Found
- **500**: Internal Server Error

---

## Data Validation

### Idea Stage Values
- `Idea`: Initial concept phase
- `MVP`: Minimum Viable Product developed
- `Revenue`: Generating revenue

### Required Fields by Endpoint

**Register:**
- email (valid email format)
- password (minimum 6 characters)

**Create Idea:**
- user_id
- title
- domain
- problem
- solution
- stage

**Send Message:**
- sender_id
- receiver_id
- idea_id
- message

---

## Rate Limiting
Currently, no rate limiting is implemented. For production use, consider implementing rate limiting to prevent abuse.

## CORS Configuration
The API accepts requests from `http://localhost:3000` (frontend development server). Update CORS settings for production deployment.
