import { Box, Heading } from "@chakra-ui/react";

function Header({ title }) {
  return (
    <Box p={2} shadow="md">
      <Heading>{title}</Heading>
    </Box>
  );
}

export default Header;
