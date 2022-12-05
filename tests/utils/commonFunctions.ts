import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import path from "path";
import { readFile } from "../../utils/commonFunctions";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("This will check the read file function", () => {

  it("it should return file data", async () => {

    const result = await readFile(path.join(__dirname, "../../staticFiles/stock.json"));
  
    expect(result).to.include('{"sku":"LTV719449/39/39","stock":8525}');
  });

  it("it should be rejected with file not found error", async () => {

    await expect(readFile("abcd")).to.be.rejectedWith("File not found");
  });
});
