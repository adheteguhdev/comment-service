import mocha from "mocha";
import addContext from "mochawesome/addContext";
import chai from "chai";
import chaiHttp from "chai-http";
import "chai/register-should";
import createApp from "../../app";
import { closeDatabase } from '../../utils/db-connection'
const expect = chai.expect;
const assert = chai.assert;
import { commentsData} from "../../test/data/comment";
import Comment from "../../models/comment";

chai.use(chaiHttp);

let app;
const organizationName = 'xndit'

describe('Delete all comment', () => {
  before(async () => {
    app = await createApp();
    await Comment.deleteMany({});
    await Comment.insertMany(commentsData);
  });

  after(async () => {
    await Comment.deleteMany({});
    await closeDatabase();
  });

  it('Should delete all comments', function (done) {
    chai
      .request(app)
      .del(`/orgs/${organizationName}/comments`)
      .end((err, res) => {
        if (err) return done(err);
        addContext(this, { title: 'Response Body', value: res.body });
        res.should.have.status(204);
        Comment.find({ organizationName: organizationName }, (err, comments) => {
          if (err) return done(err);
          const isDeleted = (comment) => comment.isDeleted;
          const getDeleted = comments.map(isDeleted);
          expect(getDeleted).to.not.include(false);
        });
        done();
      });
  });

  it('Should return 404 when resource not found', function (done) {
    chai
      .request(app)
      .del(`/orgs/${organizationName}`)
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
