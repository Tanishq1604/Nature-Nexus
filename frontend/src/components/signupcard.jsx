import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
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
import { useSetRecoilState } from 'recoil';
import { authScreenAtom } from '../atoms/authAtom';
import axios from 'axios';
import { userDataAtom } from '../atoms/userAtom';
  
  export default function Signupcard() {
    const setuser= useSetRecoilState(userDataAtom);
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false)
    const setAuth= useSetRecoilState(authScreenAtom);
    const [imput,setInput]=useState({
     name:'',
     username:'',
    
     password:''
    })


    async function submitdata(){

     
      const {name,username,password}=imput;
      const data={
        name,
        username,
      
        password
      }
      try{
        const res= await axios.post('/api/users/signup',data);
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
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
         
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.dark')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                   
                    value={imput.name}
                    
                    onChange={
                      (e)=>{
                        setInput({
                         ...imput,
                          name:e.target.value
                        })
                      }
                    }type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
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
                </Box>
              </HStack>
           
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link onClick={()=>{
                    setAuth('login')

                  }} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }