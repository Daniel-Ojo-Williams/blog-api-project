# Blog API Documentation

## Description

This API documentation outlines endpoints and functionalities for a Blog API.

## Server Information

- **Production Server:** https://blog-api-apfd.onrender.com/api/v1

## Paths

### /auth/register [POST]

- **Summary:** Creates a new user account
- **Request Body:**
  - Required Fields: `fname`, `lname`, `email`, `password`
- **Responses:**
  - `201`: Created, returns a User object in the response body
  - `400`: Bad Request
  - `500`: Internal Server Error

### /auth/login [POST]

- **Summary:** Authenticate user, provides email and password, returns name and token
- **Request Body:**
  - Required Fields: `email`, `password`
- **Responses:**
  - `200`: OK, returns a User object in the response body
  - `400`: Bad Request
  - `500`: Internal Server Error

### /posts/all [GET]

- **Summary:** Get posts
- **Responses:**
  - `200`: OK, returns an array of posts with details
  - `204`: No Content
  - `500`: Internal Server Error

### /posts [GET, POST]

- **Summary:** Get all user's posts / Create a new post
- **Responses:**
  - `200`: OK, returns a Posts object in the response body
  - `400`: Bad Request
  - `401`: Unauthorized
  - `500`: Internal Server Error

### /posts/{postId} [GET, PATCH, DELETE]

- **Summary:** Get a post by ID / Update a post with the provided ID / Delete post with the provided ID
- **Responses:**
  - `200`: OK, returns the post with provided ID / Updated Post object / Success message
  - `204`: No Content
  - `400`: Bad Request
  - `404`: Not Found
  - `500`: Internal Server Error

### /post/{userId} [DELETE]

- **Summary:** Delete account and all posts attached
- **Responses:**
  - `200`: OK, returns a success message
  - `404`: Not Found
  - `500`: Internal Server Error

## Security

- **Authentication Type:** Bearer Token (JWT)
