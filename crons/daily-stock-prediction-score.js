const dotenv = require('dotenv');
dotenv.config();
const { stockMarketInfo, quarterlyStockInfo } = require('../dal/stock-markets');
const NewsAPI = require('newsapi');
const stockDataApiKey = new NewsAPI(process.env.STOCK_DATA_API_KEY);

const cron = require('node-cron');
const axios = require('axios');

cron.schedule(
    '0 0 0 * * *',
    async () => {
        const doc = await stockMarketInfo.find({});
        for (let market_data of doc) {
            for (let stock_data of market_data.stocks) {
                console.log(`Processing data for ${stock_data.ticker}`);
                const quarterlyStockInfoForTicker =
                    await quarterlyStockInfo.findOne({
                        ticker_id: stock_data.ticker,
                    });
                const predictedClosingPriceDataFromApi =
                    await getStockPredictionScoreDatafromApi(
                        date,
                        volume,
                        open,
                        high,
                        low
                    );
                const quarterly_stock_details = {
                    industry: stockDataFromApi['Industry'],
                    currency: stockDataFromApi['Currency'],
                    pe_ratio: Number(stockDataFromApi['PERatio']) || null,
                    peg_ratio: Number(stockDataFromApi['PEGRatio']) || null,
                    eps: Number(stockDataFromApi['EPS']) || null,
                    quarterly_earning_growth:
                        Number(
                            stockDataFromApi['QuarterlyEarningsGrowthYOY']
                        ) || null,
                    quarterly_revenue_growth:
                        Number(stockDataFromApi['QuarterlyRevenueGrowthYOY']) ||
                        null,
                    beta: Number(stockDataFromApi['Beta']) || null,
                    fifty_two_week_high:
                        Number(stockDataFromApi['52WeekHigh']) || null,
                    fifty_two_week_low:
                        Number(stockDataFromApi['52WeekLow']) || null,
                    dividend_payout_ratio:
                        Number(stockDataFromApi['PayoutRatio']) || null,
                    dividend_date: stockDataFromApi['DividendDate'],
                    shares_outstanding:
                        Number(stockDataFromApi['SharesOutstanding']) || null,
                    shares_float:
                        Number(stockDataFromApi['SharesFloat']) || null,
                    shares_short:
                        Number(stockDataFromApi['SharesShort']) || null,
                };

                if (quarterlyStockInfoForTicker) {
                    await quarterlyStockInfo.updateOne(
                        { ticker_id: stock_data.ticker },
                        {
                            stock_id: stock_data._id,
                            stock_details: quarterly_stock_details,
                        }
                    );
                    console.log('Update successful');
                } else {
                    const quarterlyStockData = new quarterlyStockInfo({
                        market_name: market_data.market_name,
                        market_id: market_data._id,
                        stock_name: stock_data.name,
                        ticker_id: stock_data.ticker,
                        stock_id: stock_data._id,
                        stock_details: quarterly_stock_details,
                    });
                    await quarterlyStockData.save();
                    console.log('Save successful');
                }
            }
        }
    },
    {}
);

const getStockPredictionScoreDatafromApi = async ({
    date,
    volume,
    open,
    high,
    low,
}) => {
    const scoringUri = `http://db1cbed2-e99b-4487-a57b-246adce95914.canadacentral.azurecontainer.io/score`;
    const data = {
        data: [
            {
                Date: date,
                Volume: volume,
                Open: open,
                High: high,
                Low: low,
            },
        ],
    };
    const inputData = JSON.stringify(data);
    const headers = { 'Content-Type': 'application/json' };

    // make the request for scoringUri, inputData, headers=headers
    const { scoreData } = await axios.post(scoringUri, inputData);
    console.log('Prediction Score: ', scoreData);
    return scoreData;
};
