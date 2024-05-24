import { Button, useToast } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil';
import { userDataAtom } from '../atoms/userAtom';



const Logout = () => {
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
    
    <Button padding={'20px'} margin={'10px'} color={'blue.400'} onClick={()=>{handlelogout}}>Logout</Button>
      
  )
}


export default Logout