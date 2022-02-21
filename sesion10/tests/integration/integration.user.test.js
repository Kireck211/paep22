const request = require('supertest');

const {restore} = require('../../utils/fileHelpers');
const app = require('../../app');
const endFunction = require('../../helpers/supertest_jasmine');

afterEach(() => {
  restore();
});

describe('/users', () => {
  describe('GET', () => {
    it('200 OK', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(endFunction(done));
    });
    it('200 OK with new user', async () => {
      //Arrange
      const newUser = {
        name: 'name',
        lastName: 'lastName',
        username: 'cool-username'
      };
      
      // Act
      await request(app)
        .post('/users')
        .send(newUser)
        .set('Accept', 'application/json');
      
      const {status, body: users} = await request(app)
        .get('/users')
        .set('Accept', 'application/json');

      const foundUser = users.some((user) => user.username === newUser.username);
      
      // Assert
      expect(status).toEqual(200);
      expect(foundUser).toBe(true);
    });
  });
  describe('PUT', () => {
    it('200 OK with addLocation with a new location', async () => {
      // Arrange
      const newLocation = {
        "longitude": "146.16275",
        "latitude": "-9.68916",
        "name": "ITESO"
      };
      const username = 'cecizi';

      // Act
      await request(app)
        .post('/locations')
        .send(newLocation)
        .set('Accept', 'application/json');
    
      const {status: statusNewLocation, body: obtainedLocation } = await request(app)
        .get(`/locations/${newLocation.name}`);
      
      expect(obtainedLocation).toEqual(newLocation);
      expect(statusNewLocation).toBe(200);

      await request(app)
        .put(`/users/${username}/addLocation/${newLocation.name}`);
      
      const {status: statusAllLocations, body: allLocations} = await request(app)
        .get(`/users/${username}/locations`);
      
      const isNewLocationAdded = allLocations.some(location => location.name === newLocation.name);
        
      // Assert
      expect(isNewLocationAdded).toBe(true);
      expect(statusAllLocations).toBe(200);
    });
  });
});