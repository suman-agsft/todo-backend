const { Sequelize } = require('sequelize');
const database = new Sequelize('todo_app', 'agsuser', 'Tilak100', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = database;

// inside new Sequelize (database_name, username, password,{}) is the order

// pool is used to handles the database connection in nodejs application (when we connect to the database by using library like Sequelize)
// It is used to imporove performance 
// where max is the maximum number of connections in the pool
// min is the minimum number of connections
// acquire is the maximum time (in milliseconds) to acquire the connection before throwing an error
// idle is the maximum time (in milliseconds) a  connection is exists inside the pool before destroying