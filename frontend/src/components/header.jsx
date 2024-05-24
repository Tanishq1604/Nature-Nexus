
import {   useRecoilValue, useSetRecoilState} from 'recoil';
import { userDataAtom } from '../atoms/userAtom';





import {
  Box,
  Flex,
  Avatar,
 
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton, useDisclosure,
  HStack, 
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  useToast,
  Input,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon,HamburgerIcon, CloseIcon  } from '@chakra-ui/icons';
import { Link} from 'react-router-dom';

// Links for navigation
const Links = [
  { name: 'Explore', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contracts' },
  { name: 'ecoily', path: '/ecoily' }
];

const NavLink = ({ name, path }) => (
  <Link
    to={path}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'gray.200',
    }}
  >
    {name}
  </Link>
);





export default function Header() {
 
  

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { colorMode, toggleColorMode } = useColorMode();
  const user= useRecoilValue(userDataAtom);
  const toast= useToast();
const setuser= useSetRecoilState(userDataAtom);




async function handlelogout(){
 
  
  try{

      localStorage.removeItem('user');
      setuser(null);
      
    
     
      
      toast({
        title: 'Logged Out',
        description: "logout successfully",
        status:'success',
        duration: 1000,
        isClosable: true,
      })
      


     
     
      
  }
  catch(e){
    console.log(e.message);
  }
}
 
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}  position='fixed' top={'0'} w={'100%'} zIndex={'10'}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
         
       <HStack spacing={8} alignItems={'center'}>
          
          
          
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }} position={'absolute'} top={0} left={0} h={'100%'} w={'100px'} >
          <Image src='/green.jpeg' w={'50px'} h={'50px'} borderRadius={'50%'}/>
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} />
            ))}
          </HStack>
        </HStack>
        {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
          <Image src='/green.jpeg' w={'50px'} h={'50px'} borderRadius={'50%'}/>
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} />
            ))}
          </Stack>
        </Box>
      ) : null}
       
          

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {user?
              <Menu>
                <MenuButton 
                   zIndex={'10'}
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                   bg={'green.400'}
                  name={`${user.name}`}
                    size={'sm'}
                    src={''}
                  />
                </MenuButton>
                <MenuList zIndex={'1000'}alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                    bg={'green.400'}
                    name={`${user.name}`}
                      size={'2xl'}
                      src={''}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Update profile</MenuItem>
                  <MenuItem>My blog</MenuItem>
                  <MenuItem onClick={handlelogout}>Logout</MenuItem>
                </MenuList>
              </Menu>:<Box/>}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}