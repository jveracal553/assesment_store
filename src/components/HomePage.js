import {
  Box,
  Center,
  GridItem,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Spinner,
  Tag,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import Countdown from "react-countdown";

const StoreItem = ({ title, price, image, category }) => {
  const min = 19000;
  const max = 99000;
  const rand = min + Math.random() * (max - min);

  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        0{minutes}:{seconds}
      </span>
    );
  };

  return (
    <Box p={4} borderRadius="lg" borderWidth="1px">
      <Tag mt={2} colorScheme={"yellow"}>
        <Countdown date={Date.now() + rand} renderer={renderer}></Countdown>s
      </Tag>

      <Center>
        <Image src={image} w={24} h={24}></Image>
      </Center>
      <Heading mt={4} noOfLines={1} size="sm" fontWeight="Normal">
        {title}
      </Heading>
      <Spacer />
      <Box>
        <Center>
          <Tag mt={2}>{category}</Tag>
        </Center>
      </Box>
      <HStack>
        <Box>
          <Center>
            <Tag mt={2}>${price}</Tag>
          </Center>
        </Box>
      </HStack>
    </Box>
  );
};

function HomePage({}) {
  const [storeItem, setStoreItem] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(({ data }) => {
      setLoading(false);
      setVisible(false);

      setStoreItem(data);
      // setFilteredItems(data);
    });
  }, []);

  // useEffect(() => {
  //   setFilteredItems(storeItem);
  // }, [storeItem]);

  return (
    <Box>
      <Header title="miStore" />

      {loading ? (
        <Center mt={16}>
          <Spinner
            thickness="7px"
            speed="0.75s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      ) : (
        <Box p={2}>
          <SimpleGrid columns={4} spacing={4} mt={4} ml={276} mr={276}>
            {storeItem.map((item) => {
              return (
                <GridItem key={item.id}>
                  <Link
                    to={{
                      pathname: `/detalle/${item.id}`,
                      state: item,
                    }}
                  >
                    <StoreItem {...item} />{" "}
                  </Link>
                </GridItem>
              );
            })}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;
