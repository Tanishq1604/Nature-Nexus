import React from 'react'
import UserPost from '../components/UserPost'
import { Button, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import Comment from '../components/Comment'

const Postpage = () => {
  return (
    <Flex  justifyContent={'center'} alignItems={'center'} w={'100%'} py={10}>
         <VStack maxW={'700px'} py={10}>
      <UserPost likes={243} replies={400} postImg={'/post1.png'} postTitle={"lets talk about something "} />
      <Divider />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2x1"}>👋 </Text>
          <Text color={"gray.light"}>Get the app to like, reply and post. </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} /> 
      <Comment comment={'this looks so good'} createdAt={'1d'} likes={200} username='john' avatar={'/zuck-avatar.png'}/>
      <Comment comment={'damnnn'} createdAt={'3d'} likes={400} username='tanishq' avatar={'/zuck-avatar.png'}/>
      <Comment comment={'good'} createdAt={'5d'} likes={240} username='rohan' avatar={'/zuck-avatar.png'}/>



    </VStack >
    </Flex>
   
  )
}

export default Postpage