import React from 'react';
import {
    Text,
    VStack,
    HStack,
    Avatar,
    Divider,
    useColorModeValue,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import CustomBox from '../CustomBox';

const StartRatings = ({ rating }) => {
    const yellowColor = useColorModeValue('yellow.light', 'yellow.dark');

    const ratingStars = [];
    for (let i = 0; i < rating; i++) {
        ratingStars.push(<StarIcon key={i} w={5} h={5} color={yellowColor} />);
    }
    return <>{ratingStars}</>;
};

const ReviewCard = ({
    name,
    imageUrl,
    rating,
    reviewTitle,
    reviewSummary,
    ...otherProps
}) => {
    return (
        <CustomBox {...otherProps}>
            <VStack>
                <HStack>
                    <Avatar name={name} src={imageUrl} />
                    <Text>{name}</Text>
                </HStack>
                <VStack>
                    <HStack>
                        <StartRatings rating={rating} />
                    </HStack>
                    <Text>Google</Text>
                </VStack>
                <Divider py={2} orientation="horizontal" />
                <HStack>
                    <Text fontSize="lg" fontWeight={600} my={2}>
                        {reviewTitle}
                    </Text>
                </HStack>
                <Text>{reviewSummary}</Text>
            </VStack>
        </CustomBox>
    );
};

export default ReviewCard;
