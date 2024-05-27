import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
   
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  
    useToast
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {  useSetRecoilState } from 'recoil';
import { authScreenAtom } from '../atoms/authAtom.jsx';
import { userDataAtom } from '../atoms/userAtom.jsx';
import axios from 'axios';
  
  export default function Logincard() {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const setuser= useSetRecoilState(userDataAtom);
    const setAuth= useSetRecoilState(authScreenAtom);
    const [imput,setInput]=useState({
     
      username:'',
   
      password:''
     })
     async function submitdata(){
      const {username,password}=imput;
      const data={
       
       
        username,
     
        password
      }
      try{
        const res= await axios.post('http://localhost:4000/api/users/signin',data);
        console.log(res);
        if(res.status){
          localStorage.setItem('user',JSON.stringify(res.data));
          setuser(res.data);
          toast({
            title: 'Logged In',
            description: res.data.message,
            status:'success',
            duration: 1000,
            isClosable: true,
          })

        }
        
        
      

      }
      catch(error){
        toast({
          title: 'Error',
          description: error.response.data.message,
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
       >
        <Stack spacing={8} mx={'auto'} maxW={'lg'}  px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Login
            </Heading>
         
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            
              <FormControl id="email" isRequired>
                <FormLabel>Username</FormLabel>
                <Input 
                value={imput.username}
                    
                onChange={
                  (e)=>{
                    setInput({
                     ...imput,
                      username:e.target.value
                    })
                  }
                } type="text" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                  value={imput.password}
                    
                  onChange={
                    (e)=>{
                      setInput({
                       ...imput,
                        password:e.target.value
                      })
                    }
                  }type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                 onClick={submitdata}
                  loadingText="Submitting"
                  size="lg"
                  bg={useColorModeValue('gray.600','gray.700')}
                  color={'white'}
                  _hover={{
                    bg:useColorModeValue('gray.700','gray.800'),
                  }}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  doesn't have an account? <Link onClick={()=>{
                    setAuth('signup')

                  }} color={'blue.400'}>signup</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }