import React, { useEffect } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import { Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import StockInformation from '../components/StockDetails/StockInformation';
import StockNews from '../components/StockDetails/StockNews';
import StockPredictionDetails from '../components/StockDetails/StockPredictionDetails';
import StockDataGraph from '../components/StockDetails/StockDataGraph';
import { usePrediction } from '../contexts/usePredictions';
import { useStockSymbol } from '../contexts/useStockInfo';
import { useStockNews } from '../contexts/useStockNews';
import { useUser } from '../contexts/useUser';
import CustomBox from '../components/CustomBox';
import { Link as ReactRouterLink } from 'react-router-dom';

const UpgradePrompt = () => (
    <CustomBox>
        <VStack my={16}>
            <Text fontSize="lg">
                <Link
                    as={ReactRouterLink}
                    to="/plans"
                    color={useColorModeValue('blue.light', 'blue.dark')}
                    mx={1}
                >
                    Upgrade your plan
                </Link>
                to see predictions for this stock.
            </Text>
        </VStack>
    </CustomBox>
);

const StockDetails = ({ match }) => {
    const { tickerId } = match.params;
    const { setRealtimeDetails, setQuarterlyDetails, setRealtimeGraphData } =
        useStockSymbol();
    const { setPrediction } = usePrediction();
    const { setNews } = useStockNews();
    const { user } = useUser();

    useEffect(() => {
        setRealtimeDetails(tickerId);
        setQuarterlyDetails(tickerId);
        setRealtimeGraphData(tickerId);
        setPrediction(tickerId);
        setNews(tickerId);
    }, [tickerId]);

    return (
        <PageTemplate>
            <StockInformation my={16} />
            <StockDataGraph my={16} />
            {user?.plan === 'Premium' || user?.plan === 'Unlimited' ? (
                <StockPredictionDetails my={16} />
            ) : (
                <UpgradePrompt />
            )}
            <StockNews my={16} />
        </PageTemplate>
    );
};

export default StockDetails;
