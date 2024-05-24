import { Flex, VStack } from '@chakra-ui/react'
import React from 'react'
import UserPost from '../components/UserPost'

const Explore = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} py={10}>

    <VStack maxW={'500px'} py={10}>
 <UserPost likes={243}  replies={400} postImg={'/post1.png'} postTitle={"lets talk about something "}/>
  <UserPost likes={300}  replies={420} postImg={'/post2.png'} postTitle={"this is first about something "}/>
  <UserPost likes={243}  replies={400} postImg={'/post3.png'} postTitle={"lets this is second about something "}/>
    </VStack>
    </Flex>
    
  )
}

export default Explore
