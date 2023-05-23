const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

//Database Connection
const db = require('./src/config/database');
db.authenticate().then(() => {
    console.log('Connected to Database');
}).catch(err => {
    console.log('Error: ' + err);
})

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));


const todoController = require('./src/controllers/todoController');
app.post('/todos', todoController.createTodo);
app.get('/todos', todoController.getAllTodos);
app.get('/todos/:id', todoController.getTodoById);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);


const PORT = process.env.PORT || 5000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Connected to ${PORT}`));
}).catch(err => console.log("Error" + err));