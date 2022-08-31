const express = require('express');
const router = express.Router();
const contoller = require('../controller/con-todo');
const conToken = require('../controller/con-auth');
const auth = require('../auth/tokenDecode');


router.get('/', (req, res) => {
    res.send({ message: 'Todo System Design Assesment - TutorBin' });
});



/* TODO CRUD */
router.post('/todo', auth, contoller.createTodo);
router.get('/todo', auth, contoller.getAllTodo);
router.get('/todo/:id', auth, contoller.getTodoById);
router.put('/todo/:id', auth, contoller.updateTodo);
router.delete('/todo/:id', auth, contoller.deleteTodo);


/* token */
router.get('/token', conToken.getBearerToken);




module.exports = router;