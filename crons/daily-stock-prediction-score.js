const dotenv = require('dotenv');
dotenv.config();
const { stockMarketInfo, predictedStockInfo } = require('../dal/stock-markets');
const NewsAPI = require('newsapi');
const stockDataApiKey = new NewsAPI(process.env.STOCK_DATA_API_KEY);

const cron = require('node-cron');
const axios = require('axios');

cron.schedule(
    '0 0 0 * * *', // run every day at midnight
    async () => {
        const doc = await stockMarketInfo.find({});
        for (let market_data of doc) {
            for (let stock_data of market_data.stocks) {
                console.log(`Processing data for ${stock_data.ticker}`);
                const dailyGraphData = await dailyGraphInfo.findOne({
                    ticker_id: stock_data.ticker,
                });

                const dailyStockPredictionScoreDataFromApi =
                    await getStockPredictionScoreDatafromApi();
                // stock_data
                // pass these variables in date, volume, open, high, low
                const timeSeriesData =
                    dailyStockDataFromApi['Time Series (Daily)'];

                const timestamps = Object.keys(timeSeriesData);
                if (dailyGraphData) {
                    pass;
                } else {
                    const stock_details = [];
                    timestamps.forEach((timestamp) => {
                        const timeStampData = timeSeriesData[timestamp];
                        stock_details.push({
                            timestamp: timestamp,
                            open: timeStampData['1. open'],
                            high: timeStampData['2. high'],
                            low: timeStampData['3. low'],
                            close: timeStampData['4. close'],
                            volume: timeStampData['5. volume'],
                        });
                    });

                    const dailyStockData = new dailyGraphInfo({
                        market_name: market_data.market_name,
                        market_id: market_data._id,
                        stock_name: stock_data.name,
                        ticker_id: stock_data.ticker,
                        stock_id: stock_data._id,
                        stock_details: stock_details,
                    });
                    await dailyStockData.save();
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
                Date: '2000-01-01T00:00:00.000Z',
                Volume: 0,
                Open: 0.0,
                High: 0.0,
                Low: 0.0,
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

// const getStockDataFromApi = async ({ ticker }) => {
//     const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${stockDataApiKey}`;
//     const { data } = await axios.get(url);
//     return data;
// };
