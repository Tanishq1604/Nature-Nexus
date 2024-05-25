import { Flex, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserPost from '../components/UserPost';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom';

const Explore = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [users, setUsers] = useState({});

  async function fetchPosts() {
    try {
      const res = await axios.post("http://localhost:4000/api/posts/bulk", {}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = Array.from(new Set(posts.map(post => post.postedBy).filter(id => id !== undefined)));
        const userResponses = await Promise.all(userIds.map(id => axios.get(`http://localhost:4000/api/users/${id}`)));
        const userData = userResponses.map(res => res.data.user);
        const userMap = userData.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(userMap);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (posts.length > 0) {
      fetchUsers();
    }
  }, [posts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Flex justifyContent={'center'} alignItems={'center'} py={10}>
      <VStack maxW={'600px'} py={10}>
        {posts.map(post => {
          const user = users[post.postedBy];
          return (
            <UserPost
              key={post._id}
              user={user}
              postId={post._id}
              likes={post.likes}
              replies={post.replies}
              postImg={post.img}
              postTitle={post.text}
            />
          );
        })}
      </VStack>
    </Flex>
  );
};

export default Explore;





