import React, {createContext, useContext, useState} from "react";
import axios from "axios";

const StockNewsContext = createContext({})

const StockNewsProvider = ({children}) => {
    const [stockNews, setStockNews] = useState([]);
    const [allNewsSources, setAllNewsSources] = useState([]);
    const [allNewsInfo, setAllNewsInfo] = useState([]);

    const setNews = (stockSymbol) => {
        axios.get(`http://localhost:3000/stock-news/news/${stockSymbol}`).then((response) => {
            setStockNews(response.data.news);
        })
    }

    const setNewsSources = () => {
        axios.get(`http://localhost:3000/stock-news/allNewsSources`).then((response) => {
            setAllNewsSources(response.data);
        })
    }

    const setNewsInfo = () => {
        axios.get('http://localhost:3000/stock-news/allNewsInfo').then((response) => {
            setAllNewsInfo(response.data);
        })
    }

    const reorderNews = (sources) => {
        axios.post(`http://localhost:3000/stock-news/news/allNewsSources`, {sources}).then((response) => {
            setAllNewsSources(response.data);
        })
        console.log("reset")
    }

    const selectNews = (sources) => {
        axios.post(`http://localhost:3000/stock-news/news/selectNews`, {sources}).then((response) => {
            setAllNewsSources(response.data);
        })
        console.log("select")
    }

    return (
        <StockNewsContext.Provider value={{stockNews, allNewsSources, allNewsInfo, setNewsInfo, setNewsSources, setNews, reorderNews}}>
            {children}
        </StockNewsContext.Provider>
    )
}

export const useStockNews = () => (
    useContext(StockNewsContext)
)

export default StockNewsProvider;
