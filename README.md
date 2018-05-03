# CMPE 138 Arcade Database Project
## About
Project for CMPE 138 (Databases) that emulates a management system for an arcade-like business.
Main requirement is to use a relational database management system (RDBMS) with the application.
## Dependencies
- Node
- Express (for routing + MySQL database)
- [React.js](https://github.com/facebook/create-react-app)
- react-modal
- react-validation
- popper.js
- Bootstrap
- CORS (for cross port referencing)
- MySQL

## Info
- Root folder hosts the Express portion of the application with MySQL database routing
- `routes` folder contain database access files
- `client` folder hosts the React.js portion of the app to display the database data
- `sql-scripts` include scripts to create tables for the database and sample queries
## Running the App (localhost)
1. Open one terminal instance and run `port=3001 node bin/www` in root to start the Express portion of the app
2. Open another terminal instance, open this folder and `cd client` and run `npm start` to start the React.js portion

## TODO
- Special operations
