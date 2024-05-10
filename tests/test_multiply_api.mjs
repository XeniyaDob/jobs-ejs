import { expect, use } from "chai";
import chaiHttp from "chai-http";

import { app, server } from "../app.js";

// Use chaiHttp plugin
const chai = use(chaiHttp);

describe("test multiply api", function () {
  after(() => {
    server.close();
  });
  it("should multiply two numbers", (done) => {
    chai
      .request(app)
      .get("/multiply")
      .query({ first: 7, second: 6 })
      .send()
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.have.property("body");
        expect(res.body).to.have.property("result");
        expect(res.body.result).to.equal(42);
        done();
      });
  });
});

//Place the test_ui.mjs test here because it was failing in a separate file
describe("test getting a page", function () {
  after(() => {
    server.close();
  });
  it("should get the index page", (done) => {
    chai
      .request(app)
      .get("/")
      .send()
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.have.property("text");
        expect(res.text).to.include("Click this link");
        done();
      });
  });
});
