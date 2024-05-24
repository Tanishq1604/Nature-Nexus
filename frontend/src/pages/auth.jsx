import Logincard from '../components/logincard';
import Signupcard from '../components/signupcard';
import { authScreenAtom } from '../atoms/authAtom';
import { useRecoilValue } from 'recoil';
import {  Flex } from '@chakra-ui/react';

const AuthPage = () => {
  const auth= useRecoilValue(authScreenAtom)
  return (
    <Flex justifyContent={'center'} alignItems={'center'} w={'100%'} h={'100%'} marginTop={'70px'}>
    {auth=='login'?<Logincard/>:<Signupcard/>}
    
    </Flex>

   
  )
}

export default AuthPage;