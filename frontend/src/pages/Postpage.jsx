
import React, { useEffect, useState } from 'react';
import UserPost from '../components/UserPost';
import { Button, Divider, Flex, Text, VStack } from '@chakra-ui/react';
import Comment from '../components/Comment';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Postpage = () => {
  const { username, pid } = useParams();
  
  const [curr, setCurr] = useState({});
  const [currUser, setCurrUser] = useState(null);
  
  console.log(pid);

  async function callPost() {
    try {
      const postRes = await axios.get(`http://localhost:4000/api/posts/${pid}`);
      console.log(postRes.data);
      setCurr(postRes.data);

      const userRes = await axios.get(`http://localhost:4000/api/users/${postRes.data.post.postedBy}`);
      console.log(userRes.data);
      setCurrUser(userRes.data.user);
    } catch (error) {
      console.error('Error fetching post or user data:', error);
    }
  }

  useEffect(() => {
    callPost();
  }, [pid]);

  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} py={10}>
      <VStack maxW={'700px'} py={10}>
        {curr && curr.post && currUser ? (
          <UserPost 
            user={currUser} 
            likes={curr.post.likes} 
            replies={curr.post.replies} 
            postImg={curr.post.img} 
            postTitle={curr.post.text} 
            postId={curr.post._id} 
          />
        ) : (
          <Text>Loading...</Text>
        )}
        <Divider />
        <Flex justifyContent={"space-between"} w={'100%'}>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"2xl"}>👋 </Text>
            <Text color={"gray.500"}>Get the app to like, reply, and post. </Text>
          </Flex>
          <Button>Get</Button>
        </Flex>
        <Divider my={4} /> 
        <Comment 
          key={1}
          comment={'this looks so good'} 
          createdAt={'1d'} 
          likes={200} 
          username='john' 
          avatar={'/zuck-avatar.png'}
        />
        <Comment 
          key={2}
          comment={'damnnn'} 
          createdAt={'3d'} 
          likes={400} 
          username='tanishq' 
          avatar={'/zuck-avatar.png'}
        />
        <Comment 
          key={3}
          comment={'good'} 
          createdAt={'5d'} 
          likes={240} 
          username='rohan' 
          avatar={'/zuck-avatar.png'}
        />
      </VStack>
    </Flex>
  );
};

export default Postpage;

