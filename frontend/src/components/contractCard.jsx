import { Avatar, Box, Button, Flex, Image, Text, useDisclosure ,Input, useToast} from '@chakra-ui/react';
import React, { useState ,useEffect} from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { retrievePublicKey, checkConnection } from "./frieghter.js";
import { transfer, balance, add_user } from "./soroban";
import {isConnected ,requestAccess} from "@stellar/freighter-api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { karmaatom } from '../atoms/karmaAtom';
import axios from 'axios';
import { userDataAtom } from '../atoms/userAtom';

const ContractCard = ({ postId, user, likes, replies, postImg, postTitle }) => {
  const toast = useToast();
  const [hide, setHide] = useState(false);
  const [user1,setuser1]= useRecoilState(userDataAtom)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [connected, setConnected] = useState(false);
  const [buttonText, setButtonText] = useState("Connect to Freighter");
  const [inputValue, setInputValue] = useRecoilState(karmaatom);
  const [publicKey, setPublicKey] = useState("");
  
  let key = retrievePublicKey();
  key.then(publicKey => {
    setPublicKey(publicKey);
  }).catch(error => {
    console.error("Error retrieving public key:", error);
  });
  if (!user || hide) {
    return null;
  }
  async function check(){
    if (await isConnected()) {
      alert("Connected to Freighter");
      setConnected(true);
      setButtonText("Connected");

      }else{
        alert("Download Frieghter Extension in your browser"); 
      }
  }
  async function handleSubmit ()  {
    console.log("Submitted value:", inputValue);
    const data= await axios.post("http://localhost:4000/api/account/transfer",{
      amount1:inputValue,
      to:user._id,
      userId:user1._id
    });
    console.log(data.data);
    toast({
      title: 'transaction success',
      description: `${inputValue} Karma sent`,
      status:'success',
      duration: 1000,
      isClosable: true,
    })
   


    



    onClose();
    accept();
  }

  async function accept() {
    console.log("accept");
    setHide(true);
  }
  
  async function reject() {
    console.log("reject");
    setHide(true);
  }

  return (
    <>
      <Link>
        <Flex gap={3} mb={4} py={5} minW={'500px'} maxH={'500px'}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size='md' name={user.username} src={user.profilePic} />
            <Box w='1px' h={"full"} bg='gray.light' my={2}></Box>
            <Box position={"relative"} w={"full"}></Box>
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
                <Button marginLeft={"110px"} bg={"gray.light"} onClick={() => { onOpen()}}>accept</Button>
                <Button marginLeft={"30px"} bg={"gray.light"} onClick={reject}>reject</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {connected ? "Reward Karma token to User" : "Connect to your Wallet" }
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {connected ? (<>
                <Text>Connected to {publicKey}</Text>
                <Input placeholder="Enter Karma Token to Give" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  />
              </>
              ) : (
                <Button onClick={check}>{buttonText}</Button>
            )}
            
          </ModalBody>
          <ModalFooter>
            {connected ? (
                <>
                  <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                </>
              ) : null}
            
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContractCard;
