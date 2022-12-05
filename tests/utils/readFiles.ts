import { expect } from "chai";
import { readStockAndTransactionFiles } from "../../utils/readFiles";

describe("This will check the read files function", () => {

  it("it should return correct value", async () => {

    const result = await readStockAndTransactionFiles();
  
    expect(result).to.have.keys(["stocks", "transactions"]);
  });
});