require("express-async-errors");

const migrationsRun = require('./database/sqlite/migrations');

const { request, response } = require('express');

const express = require('express');//importando o modulo express na const express

const appError = require('./utils/appError');

const routes = require('./routes');//por padrão, quando voce aponta para a pasta mas não para um arquivo .js, ele sempre vai ir para o arquivo index, então é importante ter ele criado.

const app = express();//inicializando o express
app.use(express.json());

migrationsRun();

app.use(routes);//aponta para o index.js do routes

app.use((error, request, response, next) => {
  if(error instanceof appError){
    return response.status(error.statusCode).json({status: "error",
    message: error.message});
  }

  return response.status(500).json({
    status: "error",
    message: "internal server error"
  })
})
  
  
  
  
  const PORT = 3333;//Definido porta onde o express vai prestar atenção
  app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));//apontado para o express escutar a porta definida anteriormente

