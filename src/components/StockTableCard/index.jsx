import {
    Box,
    VStack,
    useColorModeValue,
    HStack,
    SimpleGrid,
    Flex,
    Stack,
    Center,
    Spacer,
    Container,
} from '@chakra-ui/react';
import SearchBar from '../StockSearchBar';
import StockTable from '../StockTable';

const StockTableCard = () => {
    const boxColor = useColorModeValue('brand.100', 'brand.700');
    return (
        <Box
            mx={3}
            mt={5}
            px={4}
            py={10}
            borderRadius='lg'
            shadow='md'
            bg={boxColor}
        >
            <HStack>
                <Container>
                    <StockTable />
                </Container>
            </HStack>
        </Box>
    );
};

export default StockTableCard;
