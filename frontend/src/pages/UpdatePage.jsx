
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    useToast,
  } from '@chakra-ui/react'
  import { SmallCloseIcon } from '@chakra-ui/icons'
  import { useRecoilValue, useSetRecoilState } from 'recoil'
  import { userDataAtom } from '../atoms/userAtom'
  import { useState } from 'react';
  import previewimg from '../hooks/previewimg';
  import { useRef } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  
  export default function UserProfileEdit() {
    const navigate= useNavigate();
    const toast= useToast();
    const user = useRecoilValue(userDataAtom);
    const setuser= useSetRecoilState(userDataAtom);
   
    
    const [input,setinput]= useState({
     
      username:user.username,
      name:user.name,
     bio:user.bio,
   
     password:''
    })
    const {handleImageChange,imgUrl}= previewimg();
    const fileref= useRef(null);
    async function handlesubmit(e){
      e.preventDefault();
     
      try{
        const res= await axios.put(`/api/users/update/${user._id}`,{
       
          ...input,
           profilePic:imgUrl
         });
        
        localStorage.setItem('user',JSON.stringify(res.data));
        setuser(res.data)
  
        
        toast({
          title: 'Updated',
          description: 'Updated',
          status:'success',
          duration: 1000,
          isClosable: true,
        })
       if(res.data.message=="saved"){
        navigate(`/${res.data.username}`);
       }
      }
      catch(error){
        toast({
          title: 'Error',
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    return (
      <Flex
       
        align={'center'}
        justify={'center'}
       
        w={'full'}
        h={'full'}
        paddingTop={'60px'}
      
        my={6}
       >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
        
         >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
           
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl||user.profilePic}/>
                
             
              </Center>
              <Center w="full">
                <Button w="full" onClick={()=>{
                  fileref.current.click()
                }}>
                  change avatar 
               
               </Button>
               <Input id='t' type="file" hidden ref={fileref} onChange={handleImageChange}/> 
                
              </Center>
            </Stack>
          </FormControl>
        
          <FormControl  >
            <FormLabel>Username</FormLabel>
            <Input
             value={input.username}
             onChange={(e)=>{
               e.preventDefault();
               setinput({
                ...input,
                 username:e.target.value
               })
             }}
              placeholder="user name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl >
            <FormLabel>Name</FormLabel>
            <Input
             value={input.name}
             onChange={(e)=>{
               e.preventDefault();
               setinput({
                ...input,
                 name:e.target.value
               })
             }}
              placeholder="Your Name"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl  >
            <FormLabel>Bio</FormLabel>
            <Input
             value={input.bio}
             onChange={(e)=>{
               e.preventDefault();
               setinput({
                ...input,
                 bio:e.target.value
               })
             }}
              placeholder="Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl  >
            <FormLabel>Password</FormLabel>
            <Input
              value={input.password}
              onChange={(e)=>{
                e.preventDefault();
                setinput({
                 ...input,
                  password:e.target.value
                })
              }}
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
        
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
               
              }}
              onClick={()=>{
                navigate(`/${user.username}`)

            }}>
              Cancel
            </Button>
            <Button
            onClick={handlesubmit}
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    )
}