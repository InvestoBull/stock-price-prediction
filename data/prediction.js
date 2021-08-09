const axios = require('axios');
const { realtimeStockInfo } = require('../dal/stock-markets');
const { predictedStockInfo } = require('../dal/stock-markets');
const { stockMarketInfo } = require('../dal/stock-markets');

const ticker_to_endpoint_map = {
    AAPL: 'http://db1cbed2-e99b-4487-a57b-246adce95914.canadacentral.azurecontainer.io/score',
};

const number_of_days = [1, 3, 6];

const predictPrices = async () => {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        for (let stock_data of market_data.stocks) {
            if (stock_data.ticker === 'AAPL') {
                console.log(`Processing data for ${stock_data.ticker}`);
                // const stockPredictionInfoForTicker =
                //     await predictedStockInfo.findOne({
                //         ticker: stock_data.ticker,
                //     });

                get_dependent_variables(stock_data.ticker)
                    .then((dependent_variable_list) => {
                        console.log(dependent_variable_list);
                        getStockPredictionScoreDatafromApi(
                            dependent_variable_list
                        );
                    })
                    .catch(({ message }) => {
                        console.log(message);
                    });

                // const { date, volume, open, high, low } =
                //     await get_dependent_variables(stock_data.ticker);

                // // TODO: need to pass in date, volume, open, high, low
                // const predictedClosingPriceDataFromApi =
                //     await getStockPredictionScoreDatafromApi(
                //         date,
                //         volume,
                //         open,
                //         high,
                //         low
                //     );
                //
                // // TODO: Might need to create new variable depending on response structure of predictedClosingPriceDataFromApi
                // if (stockPredictionInfoForTicker) {
                //     await stockPredictionInfo.updateOne(
                //         { ticker: stock_data.ticker },
                //         {
                //             closingPrice: predictedClosingPriceDataFromApi,
                //         }
                //     );
                //     console.log('Update successful');
                // } else {
                //     const stockPredictionData = new stockPredictionInfo({
                //         company_name: stock_data.name,
                //         ticker: stock_data.ticker,
                //         inflation: 0,
                //         revenueGrowth: 0,
                //         eps: 0,
                //         marketCap: 0,
                //         closingPrice: predictedClosingPriceDataFromApi,
                //     });
                //     await stockPredictionData.save();
                //     console.log('Save successful');
                // }
            }
        }
    }
};

const get_dependent_variables = async (ticker) => {
    const {
        stock_details: { timestamp, open, high, low, volume },
    } = await realtimeStockInfo.findOne({ ticker_id: ticker });
    console.log(timestamp, open, high, low, volume);
    const new_open = open + open * 0.05;
    const new_high = high + high * 0.05;
    const new_low = low + low * 0.05;
    const new_volume = volume + volume * 0.05;

    const res = [];

    for (let days of number_of_days) {
        const date = new Date(timestamp);
        const new_date = new Date(date.setDate(date.getDate() + days));
        const new_time = new Date(new_date.setUTCHours(0));

        res.push({
            Date: new_time,
            Open: new_open,
            High: new_high,
            Low: new_low,
            Volume: new_volume * 1000,
        });
    }

    return res;
};

const getStockPredictionScoreDatafromApi = async (dependent_variable_list) => {
    console.log('dependent variable list =', dependent_variable_list);
    const scoringUri = `http://db1cbed2-e99b-4487-a57b-246adce95914.canadacentral.azurecontainer.io/score`;
    const data = {
        data: dependent_variable_list,
        //     [
        //     {
        //         Date: '2021-08-10T00:00:00.000Z',
        //         Open: 153.2895,
        //         High: 155.2895,
        //         Low: 152.258,
        //         Volume: 10000,
        //     },
        // ],
    };

    // make the request for scoringUri, inputData, headers=headers
    const result = await axios.post(scoringUri, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    console.log('Prediction Score: ', result.data);
    return result;
};

// const getStockPredictionScoreDatafromApi = async ({
//     date,
//     volume,
//     open,
//     high,
//     low,
// }) => {
//     const scoringUri = `http://db1cbed2-e99b-4487-a57b-246adce95914.canadacentral.azurecontainer.io/score`;
//     const data = {
//         data: [
//             {
//                 Date: date,
//                 Volume: volume,
//                 Open: open,
//                 High: high,
//                 Low: low,
//             },
//         ],
//     };
//     const inputData = JSON.stringify(data);
//     const headers = { 'Content-Type': 'application/json' };
//
//     // make the request for scoringUri, inputData, headers=headers
//     const { scoreData } = await axios.post(scoringUri, inputData);
//     console.log('Prediction Score: ', scoreData);
//     return scoreData;
// };

predictPrices().then((_) => {
    console.log('completed execution');
});
