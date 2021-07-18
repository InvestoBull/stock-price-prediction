import React from "react";
import {Box, Center, Divider, HStack, Link, Square, Text, useColorModeValue, VStack,} from "@chakra-ui/react";
import {useStockNews} from "../../contexts/useStockNews";

const NewsArticle = ({date, title, article}) => {
    const dateColor = useColorModeValue("gray.600", "gray.400");
    const linkColor = useColorModeValue("brand.900", "brand.100");

    return (
        <VStack spacing="0px" align="flex-start">
            <Text color={dateColor}>{date}</Text>
            <Link color={linkColor} href={article} isExternal={true}>
                {title}
            </Link>
        </VStack>
    );
};

const NewsCard = ({source, children, ...otherProps}) => {
    const cardColor = useColorModeValue("brand.400", "brand.700");
    const cardBorderColor = useColorModeValue("brand.700", "brand.400");
    const textBoxColor = useColorModeValue("brand.300", "brand.600");
    const textColor = useColorModeValue("brand.900", "brand.100");

    const {newsMasterlist} = useStockNews();

    let name;
    let articles;

    let targetSource = newsMasterlist.find(
        (currSource) => currSource.id === source.id
    );
    if (targetSource) {
        name = targetSource.name;
        articles = targetSource.articles;
    } else {
        name = "";
        articles = [];
    }

    return (
        <Box
            width="100%"
            height="100%"
            mx={3}
            mt={5}
            px={4}
            py={4}
            border="1px"
            borderColor={cardBorderColor}
            borderRadius="lg"
            shadow="md"
            bg={cardColor}
            {...otherProps}
        >
            {children}
            <HStack mt="10px">
                <Square
                    w={{base: "100px", sm: "150px"}}
                    h={{base: "100px", sm: "150px"}}
                    border="1px"
                    borderColor={cardColor}
                    borderRadius="lg"
                    shadow="md"
                    bg={textBoxColor}
                >
                    <Text
                        align="center"
                        mt="5px"
                        fontSize={{base: "md", sm: "2xl"}}
                        fontWeight="bold"
                        color={textColor}
                    >
                        {name}
                    </Text>
                </Square>
                <Center height="150px">
                    <Divider orientation="vertical"/>
                </Center>
                <Box
                    w="full"
                    h="150px"
                    border="1px"
                    borderColor={textBoxColor}
                    borderRadius="lg"
                    shadow="md"
                    bg={textBoxColor}
                    padding="5px"
                    overflow="scroll"
                >
                    <VStack align="flex-start">
                        {articles.map((article) => (
                            <NewsArticle
                                date={article.date}
                                title={article.title}
                                article={article.src}
                            />
                        ))}
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
};

export default NewsCard;