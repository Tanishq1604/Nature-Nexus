import {  Flex} from "@chakra-ui/react"


import FirstSection from "../components/FirstSection.jsx"
import Explore from "./Explore.jsx"
import CreatePost from "../components/Cp.jsx"


const HomePage= () => {
   
  
  
   return(
      <Flex flexDirection={'column'} alignItems={'center'} justifyContent={'center'} margin={'20px'} padding={'20px'}>
       <CreatePost/> <Explore/>
    </Flex>
   )
}

export default HomePage
