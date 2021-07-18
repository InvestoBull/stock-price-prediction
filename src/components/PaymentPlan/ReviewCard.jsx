import React from 'react';
import {Box, Text, VStack, useColorModeValue, HStack, Avatar, Divider} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons'

const StartRatings = ({rating}) => {
    const ratingStars = [];
    for (let i = 0; i < rating; i++) {
        ratingStars.push(<StarIcon w={5} h={5} color="#FDCC0D"/>);
    }
    return (
        <>
            {ratingStars}
        </>
    )
}

const ReviewCard = ({name, imageUrl, rating, reviewTitle, reviewSummary, ...otherProps}) => {
    const boxColor = useColorModeValue("brand.100", "brand.700");
    return (
        <Box mx={3} mt={5} px={4} py={10} borderRadius="lg" shadow="md" bg={boxColor} {...otherProps}>
            <VStack>
                <HStack>
                    <Avatar name={name} src={imageUrl}/>
                    <Text>{name}</Text>
                </HStack>
                <VStack>
                    <HStack>
                        <StartRatings rating={rating}/>
                    </HStack>
                    <Text>Google</Text>
                </VStack>
                <Divider py={3} orientation="horizontal"/>
                <HStack>
                    <Text fontSize="lg">{reviewTitle}</Text>
                </HStack>
                <Text>{reviewSummary}</Text>
            </VStack>
        </Box>
    )
}

export default ReviewCard;