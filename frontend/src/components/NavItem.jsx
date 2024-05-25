import React from 'react'
import {
    Flex,
    Text,
    Icon,
   
    Menu,
    MenuButton,
    MenuList,
    Link
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';




export default function NavItem({ icon, title, active, navSize,nav }) {
    const navigate= useNavigate();
    function click(){
        navigate(nav)
    }
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                onClick={click}
               
                   
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
               
            </Menu>
        </Flex>
    )
}