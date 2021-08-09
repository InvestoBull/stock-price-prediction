const axios = require('axios');
const { realtimeStockInfo } = require('../dal/stock-markets');
const { stockMarketInfo } = require('../dal/stock-markets');

const ticker_to_endpoint_map = {
    AAPL: 'http://f6b1b502-ac55-4522-b0ef-f4becf1604a2.canadacentral.azurecontainer.io/score',
};

const number_of_days = [1, 3, 6];

const predictPrices = async () => {
    const doc = await stockMarketInfo.find({});
    for (let market_data of doc) {
        for (let stock_data of market_data.stocks) {
            if (stock_data.ticker === 'AAPL') {
                console.log(`Processing data for ${stock_data.ticker}`);
                get_dependent_variables(stock_data.ticker)
                    .then((dependent_variable_list) => {
                        console.log(dependent_variable_list);
                        getStockPredictionScoreDatafromApi(
                            dependent_variable_list,
                            ticker_to_endpoint_map.AAPL
                        );
                    })
                    .catch(({ message }) => {
                        console.log(message);
                    });
            }
        }
    }
};

const get_dependent_variables = async (ticker) => {
    const {
        stock_details: { timestamp, volume, open, high, low },
    } = await realtimeStockInfo.findOne({ ticker_id: ticker });
    console.log(timestamp, volume, open, high, low);

    const new_volume = volume + volume * 0.05;
    const new_open = open + open * 0.05;
    const new_high = high + high * 0.05;
    const new_low = low + low * 0.05;

    const res = [];

    for (let days of number_of_days) {
        const date = new Date(timestamp);
        const new_date = new Date(date.setDate(date.getDate() + days));
        const new_time = new Date(new_date.setUTCHours(0));

        res.push({
            Date: new_time,
            Volume: new_volume * 1000,
            Open: new_open,
            High: new_high,
            Low: new_low,
        });
    }

    return res;
};

const getStockPredictionScoreDatafromApi = async (
    dependent_variable_list,
    scoringUri
) => {
    console.log('dependent variable list =', dependent_variable_list);
    console.log('scoring uri = ', scoringUri);
    const data = {
        data: dependent_variable_list,
    };

    const result = await axios.post(scoringUri, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    console.log('Prediction Score: ', result.data);
    return result;
};

predictPrices().then((_) => {
    console.log('completed execution');
});
