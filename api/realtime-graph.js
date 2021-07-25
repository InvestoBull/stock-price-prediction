const express = require('express');
const {dailyGraphInfo} = require("../dal/stock-markets");
const router = express.Router();

/* GET realtime data. */
router.get('/realtime-graph/:ticker', function (req, res) {
    const {ticker} = req.params;
    dailyGraphInfo.findOne({ticker_id: ticker}).then(({stock_details}) => {
        stock_details.reverse()

        const labels = []
        const open = []
        const close = []
        for (let data of stock_details) {
            labels.push(data.timestamp)
            open.push(data.open)
            close.push(data.close)
        }

        res.send({
            labels,
            datasets: [
                {
                    label: 'Open',
                    data: open,
                    borderColor: "rgba(75,192,192,1)"
                },
                {
                    label: 'Close',
                    data: close,
                    borderColor: "#742774"
                }
            ]
        })
    }).catch(({message}) => {
        console.log(message)
        res.send({})
    })
});

module.exports = router;
