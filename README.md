# User Management REST API with Node.js, Express.js, and MongoDB

This is a simple Node.js application that provides a RESTful API for managing users in a MongoDB database. It allows you to perform CRUD (Create, Read, Update, Delete) operations on user resources.

## Features

- Create a new user with a POST request.
- Retrieve a list of all users with a GET request.
- Retrieve a user by their ID with a GET request.
- Update a user by their ID with a PUT request.
- Delete a user by their ID with a DELETE request.

## How It Works

### MongoDB Database

The application uses MongoDB as its database to store user information. Mongoose, an ODM (Object Data Modeling) library for MongoDB, is used to define the user schema and interact with the database.

Here's how the user schema is defined in code:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
```

### Express.js Server

The core of the application is built using Express.js, a web framework for Node.js. Express handles routing, request handling, and middleware integration.

Here's how the server is created and started in code:

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### REST API Endpoints

The application defines the following REST API endpoints to manage users:

- `GET /users`: Retrieve a list of all users.
- `GET /users/:id`: Retrieve a user by their ID.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user by their ID.
- `DELETE /users/:id`: Delete a user by their ID.

Here's an example of how the GET endpoint to retrieve all users is defined:

```javascript
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find();
  
    // Send the list of users as JSON response
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
```

### Testing with Postman

You can use a tool like Postman to test the API endpoints by sending HTTP requests and verifying the responses.

## Getting Started

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up your MongoDB database and update the connection URL in the code.
4. Start the application using `npm start`.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests if you have any suggestions or improvements.

## License

This project is licensed under the MIT License.