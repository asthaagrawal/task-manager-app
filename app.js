const express = require('express');
const app = express();
const {db, Todos, notes} = require('./db');

app.use(express.json());

// let todo = [
//     {task : 'Learn Node JS', done : false, due : '2020-04-05'},
//     {task : 'Learn SQL', done : true, due : '2020-03-05'},
//     {task : 'Learn Java', done : true, due : '2020-02-05'},
// ]

app.use('/', express.static(__dirname + '/public'));

app.set( 'port', ( process.env.PORT || 5000 ));

db.sync().then(
    () => app.listen(app.get( 'port' ))
    ).catch(
      (err) => console.error(err)
    );


app.get('/todo/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(parseInt(req.params.id))){
        req.status(404).send({
            error : 'invalid todo id'
        });
        return;
    }
    Todos.findOne({
        attributes : ['id', 'title', 'description', 'due', 'status', 'priority'],
        where : {
            'id' : id
        }
    }).then((data) => {
        res.send(data);
    });
    
});

app.get('/todo', (req, res) => {
    Todos.findAll({
        attributes : ['id', 'title', 'description', 'due', 'status', 'priority']
    }).then((todos) => res.send(todos));
});

app.post('/todo', (req, res) => {
    let data = req.body;
    Todos.create(data).then(() => res.send(""));

})