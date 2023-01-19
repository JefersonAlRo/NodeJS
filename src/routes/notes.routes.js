const { Router } = require("express");//importando o router utilizando o express

const NotesController = require('../controllers/notesController');

const notesRoutes = Router();

const notesController = new NotesController();


notesRoutes.get('/', notesController.index);//aponta para a function create dentro da class notesController, que lidará com as requisições do user
notesRoutes.post('/:user_id', notesController.create);//aponta para a function create dentro da class notesController, que lidará com as requisições do user
notesRoutes.get('/:id', notesController.show);//aponta para a function show dentro da class notesController, que lidará com as requisições do user
notesRoutes.delete('/:id', notesController.delete);

 module.exports = notesRoutes;//exportando o Routes
 