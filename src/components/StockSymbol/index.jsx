import { useState } from 'react';

const StockSymbol = () => {
    const [symbol, setSymbol] = useState("");
    const [lastPrice, setLastPrice] = useState(0);
    const [change, setChange] = useState(0);
    const [changePercent, setChangePercent] = useState("");
    const [currency, setCurrency] = useState("");
    const [volume, setVolume] = useState("");
    const [sharesOwned, setSharesOwned] = useState(0);
    const [avgVolume, setAvgVolume] = useState("");
    const [marketCap, setMarketCap] = useState("");

    const loadPage = () => {
        
    }

    return (
        <div>
            <h1 onClick={loadPage}>{symbol}</h1>
        </div>
    );
}

export default StockSymbol;