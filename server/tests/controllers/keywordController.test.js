const sinon = require("sinon");
const { expect } = require("chai");

const {
  getKeywordByIdWithResult,
  createKeyword,
} = require("../../src/controllers/keywordController");
const { Keyword } = require("../../models");

describe("keywordController", () => {
  describe("getKeywordByIdWithResult", () => {
    it("should return keyword detail with result when user is authorized", async () => {
      const keywordId = 1;
      const userId = 1;
      const req = {
        params: { id: keywordId },
        user: { id: userId },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Stubbing Keyword.findByPk to return a mock keyword with results
      const keywordStub = sinon.stub(Keyword, "findByPk").resolves({
        id: keywordId,
        userId,
        keyword: "react.js",
        result: [
          { id: 1, value: "result1" },
          { id: 2, value: "result2" },
        ],
      });

      await getKeywordByIdWithResult(req, res);

      // Assertions
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, {
        message: "keyword detail with result",
        data: {
          id: keywordId,
          userId,
          keyword: "react.js",
          result: [
            { id: 1, value: "result1" },
            { id: 2, value: "result2" },
          ],
        },
      });

      // Restore the stubbed method after the test
      keywordStub.restore();
    });

    it("should return 403 status when user is unauthorized", async () => {
      const keywordId = 2;
      const userId = 1;
      const req = {
        params: { id: keywordId },
        user: { id: userId },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      // Stubbing Keyword.findByPk to return null (keyword not found)
      const keywordStub = sinon.stub(Keyword, "findByPk").resolves(null);

      await getKeywordByIdWithResult(req, res);

      // Assertion using sinon.assert.calledWith
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, {
        message: "No keyword found",
      });

      // Restore the stubbed method after the test
      keywordStub.restore();
    });
  });

  describe("createKeyword", () => {
    it("should create a new keyword", async () => {
      const keywordData = { userId: 1, keyword: "react.js" };

      // Stubbing Keyword.create to return a mock created keyword
      const keywordStub = sinon
        .stub(Keyword, "create")
        .resolves({ id: 1, ...keywordData });

      const newKeyword = await createKeyword(keywordData);

      // Assertions
      sinon.assert.calledWith(keywordStub, keywordData);
      expect(newKeyword).to.deep.equal({ id: 1, ...keywordData });

      // Restore the stubbed method after the test
      keywordStub.restore();
    });
  });
});
