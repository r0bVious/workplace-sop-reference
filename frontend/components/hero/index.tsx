import { VStack, Text, Box } from "@chakra-ui/react";

const Hero = () => {
  return (
    <VStack align={"flex-start"} padding={10}>
      <Text fontWeight="bold" color="blue.500">
        Company Branch
      </Text>
      <Box display={"flex"} mt="-3.5rem" mb="-2.5rem">
        <Text fontSize={"9xl"} fontWeight="bold" color="#ee1c25">
          A
        </Text>
        <Text fontSize={"9xl"} fontWeight="bold" color="#8cc63e">
          B
        </Text>
        <Text fontSize={"9xl"} fontWeight="bold" color="#0072bb">
          C
        </Text>
      </Box>
      <Text fontSize={"3xl"}>Employee Resource</Text>
    </VStack>
  );
};

export default Hero;
