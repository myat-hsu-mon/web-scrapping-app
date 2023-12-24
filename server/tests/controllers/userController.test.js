const sinon = require("sinon");

const { getKeywordsByUserId } = require("../../src/controllers/userController");
const { User } = require("../../models");

describe("userController", () => {
  describe("getKeywordsByUserId", () => {
    it("should return keywords by user id when user is authorized", async () => {
      const req = {
        params: { id: "1" },
        user: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Stubbing User.findByPk to return a mock user with keywords
      const userStub = sinon.stub(User, "findByPk").resolves({
        id: 1,
        keywords: [
          { id: 1, name: "Keyword1" },
          { id: 2, name: "Keyword2" },
        ],
      });

      await getKeywordsByUserId(req, res);

      // Assertions
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, {
        message: "keywords by user id",
        data: [
          { id: 1, name: "Keyword1" },
          { id: 2, name: "Keyword2" },
        ],
      });

      // Restore the stubbed method after the test
      userStub.restore();
    });

    it("should return 403 status when user is unauthorized", async () => {
      const req = {
        params: { id: "2" },
        user: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await getKeywordsByUserId(req, res);

      // Assertions
      sinon.assert.calledWith(res.status, 403);
      sinon.assert.calledWith(res.json, {
        message: "Unauthorized",
      });
    });
  });
});
