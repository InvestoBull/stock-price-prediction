import React from "react";
import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Square,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useStockNews } from "../../contexts/useStockNews";
import NewsArticle from "../NewsArticle";

const NewsCard = ({ source, children, ...otherProps }) => {
  const cardColor = useColorModeValue("brand.400", "brand.700");
  const textBoxColor = useColorModeValue("brand.100", "brand.600");

  const { newsMasterlist } = useStockNews();

  let name;
  let articles;
  let logoBlack;
  let logoWhite;
  let logo;

  let targetSource = newsMasterlist.find(
    (currSource) => currSource.id === source.id
  );
  if (targetSource) {
    name = targetSource.name;
    articles = targetSource.articles;
    logoBlack = process.env.PUBLIC_URL + name + ".png";
    logoWhite = process.env.PUBLIC_URL + name + "_white.png";
  } else {
    name = "";
    articles = [];
    logoBlack = "";
    logoWhite = "";
  }

  logoBlack = logoBlack.replace(/\s+/g, "-").toLowerCase();
  logoWhite = logoWhite.replace(/\s+/g, "-").toLowerCase();
  logo = useColorModeValue(logoBlack, logoWhite);
  console.log(logo);

  return (
    <Box
      width="100%"
      height="100%"
      mx={3}
      mt={5}
      px={4}
      py={4}
      borderRadius="lg"
      bg={cardColor}
      className="my-box"
      {...otherProps}
    >
      {children}
      <HStack mt="10px">
        <Square
          w={{ base: "100px", sm: "150px" }}
          h={{ base: "100px", sm: "150px" }}
          border="1px"
          borderColor={cardColor}
          borderRadius="lg"
          shadow="md"
          bg={textBoxColor}
          p="10px"
        >
          <Image src={logo} />
        </Square>
        <Center height="150px">
          <Divider orientation="vertical" />
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
          css={{
            margin: "0",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            overflow: "scroll",
          }}
        >
          <VStack align="flex-start">
            {articles.map((article) => (
              <Box key={article.src} w="80%">
                <NewsArticle
                  date={article.date}
                  title={article.title}
                  url={article.src}
                />
                <Divider my={2} orientation="horizontal" />
              </Box>
            ))}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default NewsCard;
