import { expect } from "chai";

export const throwAsyncError = async (method: () => {}, errorMessage: string) => {

  let error: (Error | null) = null;

  try{
    await method();
  }
  catch(err: any){
    error = err;
  }

  expect(error).to.be.an("Error");
  expect(error?.message).to.equal(errorMessage);
}