import path from "path";
import { ReadFiles, Stocks } from "./interfaces/stocks";
import { Transactions } from "./interfaces/transactions";
import { readFile } from "./utils/commonFunctions";

export const readStockAndTransactionFiles = async () : Promise<ReadFiles> => {

  const stocksPromise = readFile(path.join(__dirname, "staticFiles/stock.json"));
  const transactionsPromise = readFile(path.join(__dirname, "staticFiles/transactions.json"));

  const [stocksResult, transactionsResult] = await Promise.all([stocksPromise, transactionsPromise]);

  const stocks: Stocks[] = stocksResult ? JSON.parse(stocksResult) : [];
  const transactions: Transactions[] = transactionsResult ? JSON.parse(transactionsResult) : [];

  return {stocks, transactions};
}