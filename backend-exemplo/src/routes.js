const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Métodos HTTP:
 * GET: buscar informação
 * POST: criar informação
 * PUT: alterar informação
 * DELETE: remover informação
 */

// criando uma rota raiz
// Padrão de rota: Rota/Recurso
/**
 * Tipos de parâmetros:
 * 
 * Query Params: parâmetros nomeados enviados na rota após "?"
 * Route Params: parâmetros utilizados para identificar recursos
 * Request Body:
 */

/**
 * SQL: MySQL, PostgreSQL, Oracle, SQLite...
 * NoSQL: MongoDB, CouchDB
 */

/**
 * Driver: SELECT * FROM USER;
 * QueryBuilder: table('user').select('*').where(); => knex
 */

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    })
}),SessionController.create);

routes.get('/ongs', OngController.list);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}) , OngController.create);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()
    })
}) , IncidentController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.list);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.list);
// para retornar um texto
//return response.send('Hello World');

// rota: /users   /users?nome=Diego
//const params = request.query;

// rota: /users/:id   /users/1
//const params = request.params;

//console.log(params);

module.exports = routes;