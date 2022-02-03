const request = require('supertest');
const app = require('../../app');
const endFunction = require('../../helpers/supertest_jasmine');


describe('/users', () => {
  describe('GET', () => {
    it('200', (done) => {
      request(app)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(endFunction(done))
    });
  });
});