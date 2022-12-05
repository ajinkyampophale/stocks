import { expect } from "chai";
import { computeStockPrice } from "../../service/computeStockPrice";
import { throwAsyncError } from "../common";

describe("This will check the compute stock price function", () => {

  it("it should return correct value", async () => {

    const result = await computeStockPrice("SXV420098/71/68");
  
    expect(result).to.have.keys(["sku", "qty"]);
    expect(result).to.deep.include({ sku: 'SXV420098/71/68', qty: 786 });
  });

  it("it should throw sku not found error", async () => {
    await throwAsyncError(
      () => computeStockPrice("abcd"), 
      "Error: Sku not found"
    );
  });

  it("it should throw stock price cannot be negative error", async () => {
    await throwAsyncError(
      () => computeStockPrice("LTV719449/39/40"), 
      "Error: Stock price cannot be negative"
    );
  });

  it("it should throw quantity cannot be negative error", async () => {
    await throwAsyncError(
      () => computeStockPrice("LTV719449/39/41"), 
      "Error: Quantity cannot be negative"
    );
  });

  it("it should throw invalid transactions found error", async () => {
    await throwAsyncError(
      () => computeStockPrice("LTV719449/39/43"), 
      "Error: Invalid transactions found"
    );
  });
});
