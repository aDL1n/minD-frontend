import { Box, Center, Container, Flex, Group, Heading, IconButton, Input, ScrollArea } from "@chakra-ui/react";
import { FaAngleDoubleRight } from "react-icons/fa";
const App = () => {
  return (
      <>
        <Center>
          <Flex width="100vw" height="100vh">
            <Container 
              display="flex" 
              flexDirection="column"
              maxWidth="60%"
              height="100%"
            > 
              {/* Header */}
              <Box
                borderBottomColor="black"
                borderBottomStyle="solid"
                borderBottomWidth="2px"
                display="flex"
              >
                <Heading 
                  size="4xl" 
                  fontFamily="Jun"
                  borderRightColor="black"
                  borderRightStyle="solid"
                  borderRightWidth="2px"
                  width="calc(6rem + 2px)"
                  textAlign="center"
                  backgroundImage={`radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)`}
                  backgroundSize="12px 12px"
                >
                  minD
                </Heading>
                <Box 
                  flex="1"
                  backgroundImage={`
                    repeating-linear-gradient(
                      45deg,
                      rgba(0, 0, 0, 0.15) 0 ,
                      rgba(0, 0, 0, 0.15) 2px,
                      transparent 1px,
                      transparent 10px
                    )
                  `}
                ></Box>
              </Box>

              {/* Main */}
              <Flex 
                flex="1"
                height="100%"
                minHeight="0"
              >
                <Box
                  width="calc(6rem + 2px)"
                  borderRightColor="black"
                  borderRightStyle="solid"
                  borderRightWidth="2px"
                  backgroundImage={`
                    repeating-linear-gradient(
                      45deg,
                      rgba(0, 0, 0, 0.15) ,
                      rgba(0, 0, 0, 0.15) 2px,
                      transparent 1px,
                      transparent 10px
                    )
                  `}
                >
                </Box>
                <Container 
                  flex="1"
                  display="flex"
                  flexDirection="column"
                  backgroundImage={`radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)`}
                  backgroundSize="12px 12px"
                  alignItems="center"
                >  
                  <Box overflowY="hidden">
                    <ScrollArea.Root paddingTop="10px">
                      <ScrollArea.Viewport>
                        <ScrollArea.Content spaceY="24px">
                          {Array.from({ length: 100 }, (_, i) => (
                            <Box
                              key={i}
                              backgroundColor="white"
                              border="black solid 2px"
                              padding="12px"
                              wordBreak="break-word"
                            >
                              {"rydfdfjkhdjkflhfjhddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddkhkhkhkhkhkhkhkhkhkhkhkhkhkhkhkhkhkhkhk " + (i + 1)}
                            </Box>
                          ))}
                        </ScrollArea.Content>
                      </ScrollArea.Viewport>
                    </ScrollArea.Root>
                  </Box>

                  <Group width="60%" justifyContent="center" paddingY="1rem">
                    <Input boxShadow="2px 3px 6px rgba(121, 121, 121, 0.4)" variant="outline" backgroundColor="white" borderRadius="0px" borderStyle="solid" borderColor="black" borderWidth="2px"/>
                    <IconButton boxShadow="2px 2px 8px rgba(121, 121, 121, 0.4)" borderRadius="0" width="40px" borderStyle="solid" borderColor="black" borderWidth="2px">
                      <FaAngleDoubleRight />
                    </IconButton>
                  </Group>
                </Container>
              </Flex>
            </Container>
          </Flex>
        </Center>
      </>
  );
};
export default App;
