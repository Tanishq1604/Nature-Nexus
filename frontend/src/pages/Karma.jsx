import {Button,Flex} from '@chakra-ui/react';
import React, { useState } from 'react';
import {isConnected} from "@stellar/freighter-api";
export default function Karma_button(){
    async function check(){
        if (await isConnected()) {
            
            alert("Connected");

          }else{
            alert("Download Frieghter Extension in your browser"); 
          }
    }
    return( 
        <Button onClick={check} bg={"gray.500"} >
            Connect To Frieghter
        </Button>
    )
}