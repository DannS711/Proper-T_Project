# API Documentation
## Agent Registration
- ### Endpoint: /register
- ### Method: POST
### Description: Registers a new agent.
## Request Body:
- `username (string, required): The username of the agent.`
- `email (string, required): The email address of the agent.`
- `password (string, required): The password of the agent.`
- `phoneNumber (string): The phone number of the agent.`
- `Success Response:`
- `Status Code: 201 (Created)`
## Response Body:
```json
{
    "statusCode": 201,
    "message": {
        "id": 6,
        "username": "test",
        "email": "test@mail.com",
        "password": "$2a$10$GyS74.Mq88HQftbDCsKFo.jakvbVUVYUBDAxvajhvVAuiycvK",
        "phoneNumber": "000000000000",
        "isMember": "true",
        "updatedAt": "2023-06-08T03:34:17.495Z",
        "createdAt": "2023-06-08T03:34:17.495Z"
    }
}
```
## Error Response:
- Status Code: 400 (Bad Request)
## Response Body:
```json
{
    "statusCode": 400,
    "message": [
        "Username is Required",
        "Email is Required",
        "Password is Required",
        "Phone number is Required"
    ]
}
```
## Agent Login
- ### Endpoint: /login
- ### Method: POST
### Description: Logs in an agent.
## Request Body:
- `email (string, required): The email address of the agent.`
- `password (string, required): The password of the agent.`
## Success Response:
- Status Code: 200 (OK)
## Response Body:
```json
{
    "id": 7,
    "email": "danns@mail.com",
    "isMember": "Active",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJkYW5uc0BtYWlsLmNvbSIsImlhdCI6MTY4NjE5NTk5MH0.SgaXAzVM0htUpgGUJi5WzJfR3r_m7i0DbKWIz9MCcrU"
}
```
## Error Response:
- Status Code: 400 (Bad request) or 401 (Unauthorized) 
## Response Body:
```json
{
    "statusCode": 400,
    "message": "Email is required"
}
```
```json
{
    "statusCode": 400,
    "message": "Password is required"
}
```
```json
{
  "statusCode": 401,
  "message": "Invalid email/password"
}
```

## Global Error Response: 
- Status Code: 500 (Internal Server Error)
```json
{
    "statusCode": 500,
    "message": "Internal Server Error"
}