import {Button,Card,CardBody,CardFooter,CardHeader,Flex, Heading, SimpleGrid, Text} from '@chakra-ui/react';
import React, { useState } from 'react';
import {isConnected} from "@stellar/freighter-api";
import { userDataAtom } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
export default function Karma_button(){
   const user = useRecoilValue(userDataAtom);
    async function check(){
        if (await isConnected()) {
            
            alert("Connected");

          }else{
            alert("Download Frieghter Extension in your browser"); 
          }
    }
    return( 
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' maxH={'100px'}>
  
  <Card>
    <CardHeader>
      <Heading size='md'> Karma Token</Heading>
    </CardHeader>
    <CardBody>
      <Text>{user.karma}</Text>
    </CardBody>
    <CardFooter>
    <Button onClick={check} bg={"gray.500"} >
            Connect To Frieghter
        </Button>
    </CardFooter>
  </Card>
</SimpleGrid>

       
    )
}