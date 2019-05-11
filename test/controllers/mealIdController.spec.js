import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../../index';
import inputMocks from './mocks';
import response from './response';

const { id52772, id52769, id52771 } = response;
const {
  validList, nonExistentIds, emptyList, nonArray, singleNumberArray,
} = inputMocks;

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests', () => {
  before((done) => {
    nock('https://www.themealdb.com')
      .get('/api/json/v1/1/lookup.php?i=52772')
      .reply(200, id52772);
    nock('https://www.themealdb.com')
      .get('/api/json/v1/1/lookup.php?i=52771')
      .reply(200, id52771);
    nock('https://www.themealdb.com')
      .get('/api/json/v1/1/lookup.php?i=52769')
      .reply(200, id52769);
    done();
  });

  describe('tests for the endpoint', () => {
    it('# should return ids', (done) => {
      chai.request(app)
        .post('/api/v1/meal-ids')
        .send(validList)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.property('length').that.is.a('number');
          expect(res.body[0]).to.be.a('number').that.equals(52771);
          expect(res.body[1]).to.be.a('number').that.equals(52769);
          done();
        });
    });
    it('# should return error for non-existent ids', (done) => {
      chai.request(app)
        .post('/api/v1/meal-ids')
        .send(nonExistentIds)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('tests for validation', () => {
    it('# should return error message for empty array', (done) => {
      chai.request(app)
        .post('/api/v1/meal-ids')
        .send(emptyList)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('# should return error message if not array', (done) => {
      chai.request(app)
        .post('/api/v1/meal-ids')
        .send(nonArray)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('# should return error for array containing only one number', (done) => {
      chai.request(app)
        .post('/api/v1/meal-ids')
        .send(singleNumberArray)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });
});
