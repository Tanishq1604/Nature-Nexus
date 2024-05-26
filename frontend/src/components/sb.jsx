import React, { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Menu,
    MenuButton,
    useToast,
    MenuList,
    MenuItem
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { FaRegTrashCan } from "react-icons/fa6";
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userDataAtom } from '../atoms/userAtom'

export default function Sidebar() {
    const toast =useToast();
    const [navSize, changeNavSize] = useState("large")
    const navigate= useNavigate();
    const user= useRecoilValue(userDataAtom);
    const setuser= useSetRecoilState(userDataAtom);
    useEffect(()=>{
        if(window.innerWidth<768){
            changeNavSize("small")
        }else{
            changeNavSize("large")
        }
    },[]);
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
        <Flex
            pos="sticky"
            top={0}
            bottom={0}
            left="5"
            h="100%"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "300px"}
            flexDir="column"
            justifyContent="space-between"
            marginRight={navSize=='large'?'300px' : '10px'}

        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Explore" nav={`/explore`} />
                <NavItem navSize={navSize} icon={FiCalendar} title="Update" active nav="/update"/>
              
               {user.usertype=='ngo'? <NavItem navSize={navSize} icon={IoPawOutline} title="Ngo-contracts" nav="/contracts"/>: null}
                <NavItem navSize={navSize} icon={FiDollarSign} title="MarketPlace" nav="/marketplace"/>
                <NavItem navSize={navSize} icon={FiBriefcase} title="Karma" nav="/karma"/>
                {user.usertype=='ngo'? <NavItem navSize={navSize} icon={FaRegTrashCan} title="TrashOut" nav="/trashout"/>: null}
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                    <Menu>
                        <MenuButton>
                <Flex mt={4} align="center">
                            
                    <Avatar size="sm" src={user.profilePic} name={user.name} bg={'green.300'}/>
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{user.name}</Heading>
                        <Text color="gray">{user.usertype}</Text>
                    </Flex>
                </Flex>
                        </MenuButton>
                        <MenuList>
    <MenuItem onClick={handlelogout}>logout</MenuItem>
    <MenuItem onClick={()=>{
        navigate(`/${user.username}`)
    }}>CreatePost</MenuItem>
   
  </MenuList>
                    </Menu>
            </Flex>
        </Flex>
    )
}