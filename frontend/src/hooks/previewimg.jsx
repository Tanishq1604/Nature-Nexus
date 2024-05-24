import { useToast } from '@chakra-ui/react';
import React, { useState } from 'react'

const previewimg = () => {
    const toast= useToast()
    const [imgurl,setImgurl]= useState(null)
    function handleImg(e){
        const file = e.target.files[0];
      
        
        if(file&& file.type.startsWith('image/') ){
            const reader = new FileReader();
            reader.onload=(e)=>{
                setImgurl(e.target.result)
              
            }
            reader.readAsDataURL(file)
           
            
        }
        else{
            toast({
                title: 'invalid file type',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              setImgurl(null)
        }  
       
        

        
    }
  return {handleImg,imgurl};
  
}

export default previewimg
