import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'

const Comment = ({comment,likes,avatar,createdAt,username}) => {
    const [liked,setLiked]= React.useState(false);
  return (
   <>
   <Flex my={2} py={2} gap={4} w={'full'}>
    <Avatar src={avatar} size={'sm'}/>
    <Flex gap={1} flexDirection={'column'} w={'full'} >
        <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontWeight={'bold'}>{username}</Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'sm'} color={'gray.light'}>{createdAt}</Text>
            <BsThreeDots/>
          </Flex>
        </Flex>
        <Text >
      {comment}
        </Text>
        <Actions liked={liked} setLiked={setLiked}/>
        <Text fontSize={'sm'} color={'gray.light'}>
            {likes+(liked?1:0)}
       
        </Text>

    </Flex>
   </Flex>
   <Divider my={4} />
   
   
   </>
  )
}

export default Comment
