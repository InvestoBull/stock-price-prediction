const dotenv = require('dotenv');
dotenv.config();
const { stockMarketInfo, predictedStockInfo } = require('../dal/stock-markets');
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
                const predictedStockInfoForTicker =
                    await predictedStockInfo.findOne({
                        ticker: stock_data.ticker,
                    });

                // TODO: setup cron job to change volume, open, high, low for premium users by multiplying some percentage
                // TODO: for unlimited users use sliders to let the user tweek the input values for volume, open, high, low
                // TODO: need to pass in date, volume, open, high, low
                const predictedClosingPriceDataFromApi =
                    await getStockPredictionScoreDatafromApi(
                        date,
                        volume,
                        open,
                        high,
                        low
                    );

                // TODO: Might need to create new variable depending on response structure of predictedClosingPriceDataFromApi
                if (predictedStockInfoForTicker) {
                    await predictedStockInfo.updateOne(
                        { ticker: stock_data.ticker },
                        {
                            closingPrice: predictedClosingPriceDataFromApi,
                        }
                    );
                    console.log('Update successful');
                } else {
                    const stockPredictionData = new predictedStockInfo({
                        company_name: stock_data.name,
                        ticker: stock_data.ticker,
                        inflation: 0,
                        revenueGrowth: 0,
                        eps: 0,
                        marketCap: 0,
                        closingPrice: predictedClosingPriceDataFromApi,
                    });
                    await stockPredictionData.save();
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
