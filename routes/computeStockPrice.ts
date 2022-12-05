import express from "express";
import { computeStockPrice } from "../service/computeStockPrice";
const router = express.Router();

router.get('/', async (req, res) => {

  try {

    const sku = req.query.sku as string;

    const result = await computeStockPrice(sku);

    res.status(200).json(result);

  } 
  catch (error: any) {
    res.status(400).json({error: error?.message || "Something went wrong"}); 
  }
});

module.exports = router;