import {
  Box,
  Center,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";

const Header = ({ title }) => (
  <Box p={4} shadow="md">
    <Heading>{title}</Heading>
  </Box>
);

function ProductCard({ location }) {
  const { state } = location;

  if (!state) {
    window.location = "/";
  }
  return (
    <Box>
      <Header title={state.title} />
      <Box p={8} d="flex" alignItems="center">
        <Box ml={4}>
          <SimpleGrid spacing={4} columns={{ base: 1, md: 5 }}>
            <GridItem colSpan={2}>
              <Center>
                <Image src={state.image} w={48}></Image>
              </Center>
            </GridItem>
            <GridItem colSpan={3}>
              <Stack spacing={4}>
                <Box>
                  <Heading>Price: ${state.price}</Heading>
                  <Tag mt={2} colorScheme={"blue"}>
                    Category: {state.category}
                  </Tag>
                  <Tag ml={2} mt={2} colorScheme={"yellow"}>
                    Rating: {state.rating.rate}
                  </Tag>
                </Box>
                <Text>{state.description}</Text>
              </Stack>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;
