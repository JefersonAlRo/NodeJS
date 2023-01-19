const { Router } = require("express");//importando o router utilizando o express

const usersController = require('../controllers/usersController');

const usersRoutes = Router();

const UsersController = new usersController();

/*function middleware(request, response, next){//o next é o destino da requisição interceptada pelo middleware


  if(!request.body.isAdmin){//se o usuário não for o admin entra
    return response.json({ message: "user unauthorized"});
  }

next();
  

}*/

usersRoutes.put('/:id', UsersController.update);

//usersRoutes.use(middleware);//aplica para todas as rotas de usuário
usersRoutes.post('/', UsersController.create);//aponta para a function create dentro da class usersController, que lidará com as requisições do user

 module.exports = usersRoutes;//exportando o Routes
 