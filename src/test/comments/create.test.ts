import mocha from "mocha";
import addContext from "mochawesome/addContext";
import chai from "chai";
import chaiHttp from "chai-http";
import "chai/register-should";
import createApp from "../../app";
import { closeDatabase } from '../../utils/db-connection'
const assert = chai.assert;
import { commentsData } from "../../test/data/comment";
import Comment from "../../models/comment";

chai.use(chaiHttp);

let app;
const organizationName = 'xendit';

describe('Create comment', () => {
  before(async () => {
    app = await createApp();
    await Comment.deleteMany({});
    await Comment.insertMany(commentsData);
  });

  after(async () => {
    await Comment.deleteMany({});
    await closeDatabase();
  });

  it('Should create a comment', function (done) {
    chai
      .request(app)
      .post(`/orgs/${organizationName}/comments`)
      .send({
        comment: 'Create comment Success',
      })
      .end((err, res) => {
        if (err) return done(err);
        addContext(this, { title: 'Response Body', value: res.body });
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('Should not create comment when schema validation failed', function (done) {
    chai
      .request(app)
      .post(`/orgs/${organizationName}/comments`)
      .send({
        comment: 9999,
      })
      .end((err, res) => {
        if (err) return done(err);
        addContext(this, { title: 'Response Body', value: res.body });
        res.should.have.status(400);
        res.body.should.have.an('object');
        assert.equal(res.body.code, 'SCHEMA_VALIDATION_FAILED');
        assert.isNotEmpty(res.body);
        done();
      });
  });

  it('Should return 404 when resource not found', function (done) {
    chai
      .request(app)
      .post(`/orgs/${organizationName}`)
      .send({
        comment: 'Create comment Success',
      })
      .end((err, res) => {
        if (err) return done(err);
        addContext(this, { title: 'Response Body', value: res.body });
        res.should.have.status(404);
        res.body.should.have.an('object');
        assert.equal(res.body.message, 'Resource Not Found');
        assert.isNotEmpty(res.body);
        done();
      });
  });
});
