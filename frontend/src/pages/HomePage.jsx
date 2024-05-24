import {  Flex} from "@chakra-ui/react"


import FirstSection from "../components/FirstSection.jsx"


const HomePage= () => {
   
  
  
   return(
      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} margin={'20px'} padding={'20px'}>
         <FirstSection/>
    </Flex>
   )
}

export default HomePage
