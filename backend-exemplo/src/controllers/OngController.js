const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = generateUniqueId();
    

    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });

    // para retornar um json
    return response.json({id});
    },
    async list(request, response){
        const ongs = await connection ('ongs').select('*');

       return response.json(ongs);
    }
}