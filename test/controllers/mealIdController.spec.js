import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import inputMocks from './mocks';

const {
  validList, nonExistentIds, emptyList, nonArray, singleNumberArray,
} = inputMocks;

chai.use(chaiHttp);

const { expect } = chai;

describe('Tests', () => {
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
          expect(res.status).to.equal(422);
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
          expect(res.status).to.equal(422);
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
          expect(res.status).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });
});
