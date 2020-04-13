const request =  require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () =>{
    await connection.destroy();
  });

  /**
   * no caso se precisar passar um ite de cabeçãlho
   * .set('Authorization', 'VALOR_AUTORIZATION'),
   */
  it('Should be able to acreate a new ONG ', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "APAD 6",
      email: "contato@apad.com.br",
      whatsapp: "11993399639",
      city: "Rio do sul",
      uf: "SC"
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});