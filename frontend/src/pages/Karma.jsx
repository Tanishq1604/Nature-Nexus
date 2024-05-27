import {Button,Card,CardBody,CardFooter,CardHeader,Flex, Heading, Image, SimpleGrid, Text, useToast} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {isConnected} from "@stellar/freighter-api";
import { userDataAtom } from '../atoms/userAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { karmaatom } from '../atoms/karmaAtom';
// import {add_user,transfer,balance} from '../components/soroban.js';

export default function Karma_button(){
    const user = useRecoilValue(userDataAtom);
   
    const [karma,setkarma]=useRecoilState(karmaatom);
    const toast = useToast();
    const getkarma = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/account/balance?userId=${user._id}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(data);
            const balance = data.balance.toString();
            setkarma(balance);
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };
    
   
    
    useEffect(()=>{
        getkarma();
    },[]);
 
  
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

                        <Text fontSize={'3xl'} position={'relative'} top={'10px'} >{karma}</Text>
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