/**
 * Esse arquivo é o start da aplicação
 * É o arquivo principal da aplicação
 */

// importando as funcionalidades do express
const express = require('express');

const routes = require('./routes');

const cors = require('cors');
const {errors} = require('celebrate');
// criando a aplicação
const app = express();

//liberando o cors
app.use(cors());

// dizer pra aplicação que vai usar json nas requisições
app.use(express.json());

app.use(routes);
app.use(errors());


module.exports = app;