# Stallr

## Table of Contents

- [Overview](#overview)
- [Team](#team)
- [How To Run](#how-to-run)
- [Dependencies](#dependencies)

## Overview

A web application to share toilet reviews. It can be an awful experience to have to go to a public restroom you haven’t been to before, and see that it is very unsanitary. By having this web application, it is possible to plan out where to go when you need to go during your time out in public.

As a user of this application, you can create reviews for toilets you have been to and you can leave comments on other users reviews. You can sign up through google or you can sign up through the web application. You can change your bio and update your profile picture once you're logged in. Additionally you can add friends from the explore page and then they will show up in your profile! You can also edit and delete your posts. Get toileting!

## Team

>[Tyler Lafond](https://github.com/Tyler-Lafond), [Westin Montano](https://github.com/westinm01), [Diane Shan](https://github.com/dianeshan)

## How To Run

### Running BOTH Server and Client

1. Open a new terminal and go into the client directory.
    - `cd client`
2. Install the necessary packages needed to run the client.
    - `npm install`
3. Change directory to the server directory.
    - `cd ../server`
4. Install the necessary packages needed to run the server.
    - `npm install`
5. Stay in the server directory and run the script
    - `npm dev`
6. If your browser doesn't automatically open, you can access the application at `http://localhost:3001`.

### Starting ONLY the server

1. Open a new terminal and go into the server directory.
    - `cd server`
2. Install the necessary packages needed to run the server.
    - `npm install`
3. Start the backend.
    - `node server.js`
4. You should get confirmation messages
    - `Server is running on port 3000.`
    - `Successfully connected to MongoDB.`

### Starting ONLY the client

1. Open a new terminal and go into the client directory from the project base.
    - `cd client`
2. Install the necessary packages needed to run the client.
    - `npm install`
3. Start the client. If your browser doesn't automatically open, you can access the application at `http://localhost:3001`.
    - `npm start`

## Dependencies

Install Node Package Manager (npm). [Helpful Documentation](https://www.npmjs.com/get-npm)

### Database

- MongoDB

### Server

- Node.JS
- Express.JS
- Concurrently
- Bcrypt
- Multer
- JSONWebToken

### Client

- React
- React Bootstrap
- React Router
- Font Awesome Icons
- React Google Login
- React Validation
