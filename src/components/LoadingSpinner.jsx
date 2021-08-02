import React from "react";
import {Box, Center, Spinner, useColorModeValue} from "@chakra-ui/react";

const LoadingSpinner = () => (
    <Center w='100%' minH={32}>
        <Box borderRadius="xl" border='2px' padding={2}
             borderColor={useColorModeValue('brand.400', 'brand.600')}>
            <Spinner/>
        </Box>
    </Center>
)

export default LoadingSpinner;
