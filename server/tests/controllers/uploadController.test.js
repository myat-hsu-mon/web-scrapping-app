const fs = require("fs");
const sinon = require("sinon");

const { uploadFile } = require("../../src/controllers/uploadController");
const keywordController = require("../../src/controllers/keywordController");
const publisher = require("../../src/queues/publisher");

describe("uploadFile", () => {
  let req;
  let res;
  let next;
  let readFileSyncStub;

  beforeEach(() => {
    req = {
      file: {
        path: "dummy/path.csv",
      },
      user: {
        id: 123,
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
    readFileSyncStub = sinon.stub(fs, "readFileSync");
    createKeywordStub = sinon.stub(keywordController, "createKeyword");
    publishToQueueStub = sinon.stub(publisher, "publishToQueue");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 400 if no file found", async () => {
    //no file is provided
    req.file = undefined;

    await uploadFile(req, res, next);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: "No file found" });
  });

  it("should return 400 if keywords are more than 100", async () => {
    //csv file with more than 100 keywords
    readFileSyncStub.returns(
      "'3zX','Rea','Nex','Tav','Jav','Web','FrE','Bac','Noe','Exp','Mon','GrQ','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro','Rea','Nex','Tai','Jav','Web','Fro','Bac','Nod','Exp','Mon','Gra','RES','Res','UIX','Sin','Sta','Com','Cod','Ser','Pro'"
    );

    await uploadFile(req, res, next);

    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.json, { message: "keywords is more than 100" });
  });

  it("should upload file successfully", async () => {
    //valid csv file is provided
    readFileSyncStub.returns("keyword1,keyword2,keyword3");

    await uploadFile(req, res, next);
    sinon.assert.calledWith(res.status, 201);
  });
});
