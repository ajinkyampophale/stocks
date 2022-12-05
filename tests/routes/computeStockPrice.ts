import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from '../../index';
chai.use(chaiHttp);

describe("This will check the stock price route", () => {

  it("it should return correct value", (done) => {

    chai.request(app)
      .get('/stock_price?sku=SXV420098/71/68')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.sku).to.be.equal('SXV420098/71/68');
        expect(res.body.qty).to.be.equal(786);
        done();
      });
  });

  it("it should return 400 with sku not found error", (done) => {

    chai.request(app)
      .get('/stock_price?sku=abcd')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Error: Sku not found");
        done();
      });
  });

  it("it should return 400 stock price cannot be negative error", (done) => {

    chai.request(app)
      .get('/stock_price?sku=LTV719449/39/40')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Error: Stock price cannot be negative");
        done();
      });
  });

  it("it should return 400 quantity cannot be negative error", (done) => {

    chai.request(app)
      .get('/stock_price?sku=LTV719449/39/41')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Error: Quantity cannot be negative");
        done();
      });
  });

  it("it should return 400 invalid transactions found error", (done) => {

    chai.request(app)
      .get('/stock_price?sku=LTV719449/39/43')
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body.error).to.be.equal("Error: Invalid transactions found");
        done();
      });
  });
});
