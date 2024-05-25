import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { retrievePublicKey, checkConnection } from "../components/frieghter";
import { transfer, balance, add_user } from "../components/soroban"


const ContractCard = ({ postId, user,likes,replies, postImg, postTitle }) => {
  const [hide, setHide] = useState(false);

  if (!user || hide) {
    return null;
  }
  
  async function accept() {
    // console.log(await checkConnection())
    // console.log(await retrievePublicKey())
  

    
    // const trans = transfer()
    // const tr = async retrievePublicKey()
    const a = await add_user()
    // const t = await transfer()
    // const b = await balance()

    console.log(a)















    setHide(true);
  }

  async function reject() {
    console.log("reject");
    setHide(true);
  }

  return (
    <Link>
      <Flex gap={3} mb={4} py={5} minW={'500px'} maxH={'500px'}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size='md' name={user.username} src={user.profilePic} />
          <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
          <Box position={"relative"} w={"full"}>
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {user.username}
              </Text>
              <Image src='/verified.png' w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>ld</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={postImg} w={"full"} maxW={"450px"} maxH={"200px"} />
          </Box>
          <Flex gap={2} alignItems={"center"}>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
              <Flex justifyContent={"center"} alignItems={"center"} w={"100%"}>
                <Button marginLeft={"110px"} bg={"gray.light"} onClick={accept}>accept</Button>
                <Button marginLeft={"30px"} bg={"gray.light"} onClick={reject}>reject</Button>
              </Flex>
          </Flex>
        </Flex>
      </Flex>
      
    </Link>
  );
};

export default ContractCard;
