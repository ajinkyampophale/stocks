import { StocksOutput } from "./interfaces/stocks";
import { readStockAndTransactionFiles } from "./readFiles";
import { orderType } from "./utils/constants";

const computeStockPrice = async (sku: string): Promise<StocksOutput> => {

  try {
    
    const { stocks, transactions } = await readStockAndTransactionFiles();

    let skuPrice = 0, foundSku = false;

    // Finding Initial Stock Price
    for(const individualStock of stocks){

      if(individualStock?.sku === sku){

        if(individualStock?.stock < 0) throw new Error("Stock price cannot be negative");

        foundSku = true;
        skuPrice = individualStock?.stock || 0;
        break;
      }
    }

    // Finding All The Transactions
    for(const transaction of transactions){

      const {sku: transactionSku, type, qty} = transaction;

      if(transactionSku === sku){

        if(qty < 0) throw new Error("Quantity cannot be negative");

        foundSku = true;
        if(type === orderType.order) skuPrice += qty;
        else if(type === orderType.refund) skuPrice -= qty;
      }
    }

    if(skuPrice < 0) throw new Error("Invalid transactions found"); 
    if(!foundSku) throw new Error("Sku not found");
   
    return { sku, qty: skuPrice };
  } 
  catch (error: any) {
    throw new Error(error);
  }
}

computeStockPrice("SXV420098/71/68")
  .then((result) => console.log(result))
  .catch((error) => console.log(error));