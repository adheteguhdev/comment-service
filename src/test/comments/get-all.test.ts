import mocha from 'mocha';
import addContext from 'mochawesome/addContext';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import createApp from '../../app';
import { closeDatabase } from '../../utils/db-connection';
const assert = chai.assert;
import { commentsData } from '../../test/data/comment';
import Comment from '../../models/comment';

chai.use(chaiHttp);

let app;
const organizationName = 'xendit';

describe('Get all comments', () => {
  before(async () => {
    app = await createApp();
    await Comment.deleteMany({});
    await Comment.insertMany(commentsData);
  });

  after(async () => {
    await Comment.deleteMany({});
    await closeDatabase();
  });

  it('Should get all comments', function (done) {
    chai
      .request(app)
      .get(`/orgs/${organizationName}/comments`)
      .end((err, res) => {
        if (err) return done(err);
        addContext(this, { title: 'Response Body', value: res.body });
        res.should.have.status(200);
        res.body.should.have.an('array');
        done();
      });
  });

  it('Should return 404 when resource not found', function (done) {
    chai
      .request(app)
      .get(`/orgs/${organizationName}`)
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
