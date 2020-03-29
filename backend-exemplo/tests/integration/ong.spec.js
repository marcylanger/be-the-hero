const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });
    it('should be able to create a new ONG', async () => {

        const response = await request(app).post('/ongs').send({
            name: "Fer",
            email: "caozinho@gmail.com",
            whatsapp: "45999119857",
            city: "Foz do Iguaçu",
            uf: "PR"
        });

        console.log(response.body);

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})