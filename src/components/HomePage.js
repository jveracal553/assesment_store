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
  const min = 15;
  const max = 80000;
  const rand = min + Math.random() * (max - min);
  const [isActive, setActive] = useState(true);

  const renderer = ({ minutes, seconds }) => {
    // console.log(seconds);

    if (seconds == 0 && minutes == 0) {
      setActive(false);
      console.log(seconds);
    }
    return (
      <span>
        0{minutes}:{seconds}
      </span>
    );
  };

  return (
    <Box p={4} borderRadius="lg" borderWidth="1px">
      {isActive ? (
        <Box>
          <Tag mt={2} colorScheme={"green"}>
            <Countdown date={Date.now() + rand} renderer={renderer}></Countdown>
            s
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
      ) : (
        <Box>
          <Tag mt={2} colorScheme={"red"}>
            <h1>Expired!</h1>
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
      )}
    </Box>
  );
};

function HomePage({}) {
  const [storeItem, setStoreItem] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then(({ data }) => {
      setLoading(false);
      setStoreItem(data);
    });
  }, []);

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
