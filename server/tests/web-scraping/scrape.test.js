const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const sinon = require("sinon");
const { expect } = require("chai");

const { scrapeWebData } = require("../../src/web-scrape/scrape");

describe("scrapeWebData", () => {
  let browserStub;
  let pageStub;

  beforeEach(() => {
    browserStub = sinon.stub(puppeteer, "launch");
    pageStub = sinon.stub();

    browserStub.returns({
      newPage: pageStub,
      close: sinon.stub().resolves(),
    });
  });

  afterEach(() => {
    browserStub.restore();
  });

  it("should scrape web data successfully", async () => {
    const keyword = "example";

    // Mock puppeteer's launch function
    browserStub.resolves({
      newPage: pageStub,
      close: sinon.stub().resolves(),
    });

    // Mock puppeteer's newPage function
    pageStub.resolves({
      goto: sinon.stub().resolves(),
      content: sinon.stub().resolves("<html>Mocked HTML</html>"),
    });

    // Mock cheerio.load function
    sinon.stub(cheerio, "load").returns(() => {
      return {
        text: () => "Mocked Search Results",
        length: 5,
        find: sinon.stub().returnsThis(),
      };
    });

    const result = await scrapeWebData(keyword);

    // Assert the result
    expect(result).to.deep.equal({
      searchResults: "Mocked Search Results",
      totalAdWords: 5,
      totalLinks: 5,
      htmlCode: "<html>Mocked HTML</html>",
    });
  });

  it("should handle errors gracefully", async () => {
    const keyword = "example";
    const errorMessage = "Puppeteer launch error";
    // throw error message
    browserStub.throws(new Error(errorMessage));

    try {
      await scrapeWebData(keyword);
      throw new Error("Expected an error but none was thrown");
    } catch (error) {
      expect(error.message).to.equal(errorMessage);
    }
  });
});
