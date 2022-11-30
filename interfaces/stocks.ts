import { Transactions } from "./transactions";

export interface StocksOutput {
  sku: string;
  qty: number;
}

export interface Stocks {
  sku: string;
  stock: number;
}

export interface ReadFiles {
  stocks: Stocks[];
  transactions: Transactions[];
}