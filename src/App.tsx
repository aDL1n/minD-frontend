import { Box, Center, ClientOnly, Container, Flex, For, Group, Heading, IconButton, Input, ScrollArea } from "@chakra-ui/react";
import { FaAngleDoubleRight } from "react-icons/fa";
import { useColorMode, useColorModeValue } from "./components/ui/color-mode";
import { LuSun, LuMoon } from "react-icons/lu";
import { Api, type ChatMessage } from "./api";
import { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const { toggleColorMode, colorMode } = useColorMode()

  const background = useColorModeValue("#F1F0E8", "#1c1917")
  const border = useColorModeValue("#5b6568ff", "#4a413b")
  const heading = useColorModeValue("#20353bff", "#e6dfd6")
  const messageBackground = useColorModeValue("rgb(229, 225, 218)", "#2a2623")
  const messageBorder = useColorModeValue("#5f5b59ff", "#4a413b")
  const shadow = useColorModeValue("rgba(137, 168, 178, 0.45)", "rgba(17, 16, 14, 0.99)")
  const messageText = useColorModeValue("#3b4b50ff", "#e6dfd6")
  const inputBackground = useColorModeValue("rgb(229, 225, 218)", "rgba(80, 75, 70, 0.4)")
  const buttonBackground = useColorModeValue("rgba(137, 168, 178, 0.5)", "rgba(22, 15, 6, 0.76)")
  const iconColor = useColorModeValue("#5f5b59ff", "#e6dfd6");

  document.getElementById('root')!.style.backgroundColor = background;

  const [messages, setMessages] = useState<ChatMessage[]>([]);


  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const api: Api = new Api();

  function formatUnixTimestamp(unixTimestamp: number): string {
    const date = new Date(unixTimestamp);

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}  ${day}.${month}`;
  }

  useEffect(() => {
    api.getMessages(10).then((data: ChatMessage[]) => {
      setMessages(data);
      
    });

    const eventSource = api.subscribeToNewMessages((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      eventSource.close();
    };

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  }, []);


  const sendMessage = async () => {
    if (!inputRef.current?.value) return;
    const msg: ChatMessage = { message: inputRef.current.value };
    await api.sendMessage(msg);
    inputRef.current.value = "";
  };

  const previousScrollHeightRef = useRef(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [hasMoreHistory, setHasMoreHistory] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (isLoadingHistory || !hasMoreHistory) return;

    setIsLoadingHistory(true);

    const oldestMessageId = messages.length > 0 ? messages[0].id : undefined;

    if (oldestMessageId !== undefined) {
      const oldMessages = await api.fetchMessageHistory(10, oldestMessageId);

      if (oldMessages.length === 0) {
        setHasMoreHistory(false);
      } else {
        previousScrollHeightRef.current = viewportRef.current?.scrollHeight || 0;
        setMessages(prevMessages => [...oldMessages, ...prevMessages]);
      }
    } else {
      setHasMoreHistory(false);
    }

    setIsLoadingHistory(false);
  }, [isLoadingHistory, hasMoreHistory, messages]);

  useEffect(() => {
    if (!isLoadingHistory && previousScrollHeightRef.current > 0 && viewportRef.current) {
      const currentScrollHeight = viewportRef.current.scrollHeight;
      viewportRef.current.scrollTo({ top: currentScrollHeight - previousScrollHeightRef.current });
      previousScrollHeightRef.current = 0;
    }
  }, [messages, isLoadingHistory]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    if (scrollTop === 0) {
      fetchHistory();
    }
  };

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
              borderBottomColor={border}
              borderBottomStyle="solid"
              borderBottomWidth="2px"
              display="flex"
            >
              <Heading
                size="5xl"
                fontFamily="Jun"
                borderRightColor={border}
                borderRightStyle="solid"
                borderRightWidth="2px"
                width="calc(8rem + 2px)"
                textAlign="center"

                backgroundImage={`radial-gradient(${inputBackground} 1px, transparent 1px)`}
                backgroundSize="12px 12px"
                color={heading}
              >
                minD
              </Heading>
              <Box
                flex="1"
                backgroundImage={`
                    repeating-linear-gradient(
                      45deg,
                      ${inputBackground} 0,
                      ${inputBackground} 2px,
                      transparent 1px,
                      transparent 10px
                    )
                  `}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <ClientOnly>
                  <IconButton
                    onClick={toggleColorMode}
                    variant="outline"
                    size="sm"
                    borderRadius="0"
                    backgroundColor={messageBackground}
                    borderColor={border}
                    borderWidth="2px"
                    marginInlineEnd="24px"
                  >
                    {colorMode === "light" ? <LuSun /> : <LuMoon />}
                  </IconButton>
                </ClientOnly>
              </Box>
            </Box>

            {/* Main */}
            <Flex
              flex="1"
              height="100%"
              minHeight="0"
            >
              <Box
                width="calc(6rem + 2px)"
                borderRightColor={border}
                borderRightStyle="solid"
                borderRightWidth="2px"
                backgroundImage={`
                    repeating-linear-gradient(
                      45deg,
                      ${inputBackground} ,
                      ${inputBackground} 2px,
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
                backgroundImage={`radial-gradient(${inputBackground} 1px, transparent 1px)`}
                backgroundSize="12px 12px"
                alignItems="center"
                width="100%"
                paddingInlineEnd="0"
              >
                <Box overflowY="hidden" flex="1" width="100%">
                  <ScrollArea.Root variant="hover" paddingTop="10px">
                    <ScrollArea.Viewport ref={viewportRef} onScroll={handleScroll}
                    >
                      <ScrollArea.Content width="100%" display="flex" flexDirection="column" alignItems="flex-start" spaceY="32px">
                        <For each={messages} fallback={[]}>
                          {(message, id) => (
                            <Box
                              key={id}
                              backgroundColor={messageBackground}
                              border="solid 2px"
                              borderColor={messageBorder}
                              boxShadow={`3px 3px 0px 0px ${shadow}`}
                              padding="12px"
                              marginInlineEnd="10px"
                              wordBreak="break-word"
                              color={messageText}
                              fontSize="l"
                              width="auto"
                            >
                              {message.message}
                              <Box
                                color="gray.500"
                                fontSize="0.7rem"
                                display="flex"
                                justifyContent="flex-end"
                                width="100%"
                              >
                                {message.timestamp && formatUnixTimestamp(message.timestamp)}
                              </Box>
                            </Box>
                          )}
                        </For>
                        <div ref={messagesEndRef} />
                      </ScrollArea.Content>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar borderRadius="0" backgroundColor={inputBackground} width="4px">
                      <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner />
                  </ScrollArea.Root>
                </Box>

                <Group width="55%" justifyContent="center" paddingY="1rem">
                  <Input
                    ref={inputRef}
                    boxShadow={`2px 2px 0px 0px ${shadow}`}
                    variant="outline"
                    backgroundColor={inputBackground}
                    borderRadius="0px"
                    borderStyle="solid"
                    borderColor={border}
                    borderWidth="2px"
                    color={messageText}
                    fontSize="md"
                  />
                  <IconButton
                    boxShadow={`2px 2px 0px 0px ${shadow}`}
                    borderRadius="0"
                    width="40px"
                    borderStyle="solid"
                    borderColor={border}
                    borderWidth="2px"
                    color={iconColor}
                    backgroundColor={buttonBackground}
                    onClick={() => {
                      sendMessage()
                    }}
                  >
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
