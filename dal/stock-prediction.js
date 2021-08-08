const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Decimal128 } = require('mongodb');
dotenv.config();

const Schema = mongoose.Schema;

const stockPredictionSchema = new Schema(
    {
        company_name: String,
        ticker: String,
        inflation: Number,
        revenueGrowth: Number,
        eps: Number,
        marketCap: Number,
        closingPrice: Decimal128,
    },
    { collection: 'StockPrediction' }
);

exports.stockPrediction = mongoose.model(
    'StockPrediction',
    stockPredictionSchema
);
