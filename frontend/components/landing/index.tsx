import { Text, VStack } from "@chakra-ui/react";

const Landing = () => {
  return (
    <VStack justifyContent={"center"} alignItems={"center"} py={10}>
      <Text
        fontSize={"xxx-large"}
        align={"center"}
        fontWeight={"bolder"}
        mb={"2rem"}
      >
        Welcome!
      </Text>
      <Text fontSize="large" mx={5} textIndent={"3rem"} lineHeight={"2rem"}>
        Hello! The goal of this resource is to be an overview of the
        responsibilities and special events that sometimes can cause confusion
        amongst new teachers. It is by no means totally comprehensive, as each
        class might modify or do things a little bit differently according to
        their specific class needs. Furthermore, some things may outright change
        as the year goes on.
      </Text>
      <Text
        fontSize="large"
        mt={5}
        textIndent={"3rem"}
        lineHeight={"2rem"}
        mx={5}
      >
        Hopefully this reference can help to guide you or provide answers to
        questions you have now or in the future! Of course, the best resources
        will always be your Korean Co-Teacher (KT), other Foreign Teachers (FT),
        and your supervisor.
      </Text>
    </VStack>
  );
};

export default Landing;
