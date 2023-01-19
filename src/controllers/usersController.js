require("express-async-errors");
const appError = require ('../utils/appError');
const { hash, compare, hashSync } = require('bcryptjs');
const sqliteConnection = require('../database/sqlite');

class usersController {

   async create(request, response){
      
      const { name, email, password } = request.body;
      
      const database = await sqliteConnection();

      const checkUserExist = await database.get('SELECT * FROM users WHERE email = (?)', [email])// o email = (?), assim como o C, ele puxará a variável em seguida, que no caso é o email

      if(checkUserExist){
        throw new appError('Esse email já está em uso.');
      }

      const hashedPassword = await hash(password, 9);
      await database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword]);


      return response.status(201).json();
     
    }
/*app.get("/message/:id/:user", (request, response)=>{//o request do get é o /message, se abrirmos um navegador na URL localhost:3333/message ele aparecerá a mensagem de response que determinamos na arrow function, Hello World!.
  const {id, user} = request.params;//desestruturando a requisição. Ao chamar somente o id abaixo ele já sabe que o request.params se refere ao request.params.id e .user respectivamente, simplificando a chamada abaixo.
  response.send(`
  Message ID: ${id}.
  User: ${user}`);
})//os parametros são dados que eu forneço ao servidor e ele capta e o utiliza em algo, no caso do exemplo ele está pegando os parametros e apenas exibindo em tela. Os : no get determina que é um parametro e não uma rota.

app.get('/users', (request, response) => {
  const {page, limit} = request.query;//como são dados de variaveis, não preciso seguir essa ordem em especifico
  
  response.send(`Página ${page}.
  Mostrar: ${limit}`)
 })*/

 async update(request, response){
  const {name, email, password, oldPassword} = request.body;
  const { id } = request.params;

  const database = await sqliteConnection();
  const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);


if(!user){
  throw new appError("Usuário não encontrado");
}

  const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

  if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
    throw new appError('Esse email já está em uso.');
  }

  user.name = name ?? user.name;//caso exista conteudo em nome, ele será utilizado, caso contrario ele mantem o que ja estava no user.name. ?? - ou
  user.email = email ?? user.email;

  if(password && !oldPassword){
    throw new appError("Digite a senha antiga para definir nova senha")
  }

  if(password && oldPassword){

    const checkOldPassword = await compare(oldPassword, user.password);

    if(!checkOldPassword){
      throw new appError('A senha antiga não confere.');
    }
    user.password = await hash(password, 8);


  }
  await database.run(`
  UPDATE users SET name = ?, 
  email = ?,
  password = ?,
 updated_at = DATETIME('NOW')
 WHERE id = ?`, [user.name, user.email,user.password, id]);

    return response.status(200).json();
 }

  /*
  Um controller pode ter funções de:
  1 - Index - GET para listar vários registros.
  2 - Show - GET para exibir um registro especifico.
  3 - Create - POST para criar um registro.
  4 - Update - PUT para atualizar um registro.
  5 - Delete - DELETE para remover um registro.

  Caso haja necessidade de uma outra função, vale a pena criar um segundo controller
  */





}

module.exports = usersController;