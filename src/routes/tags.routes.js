const { Router } = require("express");//importando o router utilizando o express

const tagsController = require('../controllers/tagsController');

const tagsRoutes = Router();

const TagsController = new tagsController();


tagsRoutes.get('/:user_id', TagsController.index);//aponta para a function create dentro da class tagsController, que lidará com as requisições do user

 module.exports = tagsRoutes;//exportando o Routes
 