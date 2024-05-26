import {Button,Card,CardBody,CardFooter,CardHeader,Flex, Heading, Image, SimpleGrid, Text, useToast} from '@chakra-ui/react';
import React, { useState } from 'react';
import {isConnected} from "@stellar/freighter-api";
import { userDataAtom } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
// import {add_user,transfer,balance} from '../components/soroban.js';

export default function Karma_button(){
    const toast = useToast();
 
   const user = useRecoilValue(userDataAtom);
   const [connected, setconnected]= useState(false);
   const [buttonText, setButtonText] = useState("Connect to Freighter");
    async function check(){
        if (await isConnected()) {
            setconnected(true);
            setButtonText("Connected");
            toast({
                title: 'connected',
                description: "connected to Freighter",
                status:'success',
                duration: 1000,
                isClosable: true,
              })
           

            
           

          }else{
            setconnected(false);
            setButtonText("not connected");

            alert("Download Frieghter Extension in your browser"); 
          }
    }
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' maxH={'100px'} marginTop={'200px'}>

            <Card>
                <CardHeader>
                    <Heading size='md'> Karma Token</Heading>
                </CardHeader>
                <CardBody>
                    <Flex gap={'10px'}>
                        <Image w={'70px'} h={'60px'} src='/karma.png' />

                        <Text fontSize={'3xl'} position={'relative'} top={'10px'} >{user.karma}</Text>
                    </Flex>
                </CardBody>
                <CardFooter>
                    {connected ? (<>
                        <Button onClick={check}>{buttonText}</Button>

                    </>
                    ) : (
                        <Button onClick={check}>{buttonText}</Button>
                    )}
                </CardFooter>
            </Card>
        </SimpleGrid>

       
    )
}