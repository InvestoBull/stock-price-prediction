import { Divider, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import NewsChecklist from './NewsChecklist';
import React from 'react';
import CustomBox from '../CustomBox';

const StaticChecklistContainer = () => {
    const boxColor = useColorModeValue('brand.400', 'brand.700');

    return (
        <CustomBox
            p="4"
            mt={5}
            ml={-1}
            bgColor={boxColor}
            position="fixed"
            boxShadow="dark-lg"
            zIndex={100}
        >
            <VStack>
                <Heading size="md">Sources</Heading>
                <Divider orientation="horizontal" />
                <NewsChecklist />
            </VStack>
        </CustomBox>
    );
};

export default StaticChecklistContainer;
