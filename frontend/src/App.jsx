import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/header"
import AuthPage from "./pages/auth"
import { useRecoilValue } from "recoil"
import { userDataAtom } from "./atoms/userAtom"
import HomePage from "./pages/HomePage"


import UserProfileEdit from "./pages/UpdatePage"
import Postpage from "./pages/Postpage"
import Explore from "./pages/Explore"

import Sidebar from "./components/sb"
import { Flex } from "@chakra-ui/react"
import CreatePost from "./components/Cp"
import Contracts from "./pages/Contracts"



function App() {
  const user= useRecoilValue(userDataAtom);



  


  return (
   <Flex justifyContent={'left'} margin={'10px'}>
    {user?<Sidebar/>:null}

  
   <Routes>
   <Route path="/" element={user? <HomePage /> : <Navigate to={'/auth'}/> } />
      <Route path="/auth" element={!user? <AuthPage/>: <Navigate to={'/'}/> } />
      <Route path="/update" element={!user?  <Navigate to={'/auth'}/>: <UserProfileEdit/>} />

    
     
    
 

      <Route path="/contracts" element={!user?  <Navigate to={'/auth'}/>: <Contracts/>} />
      <Route path="/:username/post/:pid" element={user? <Postpage /> : <Navigate to={'/auth'}/>} />
      
      <Route path="/explore" element={user? <><Explore/><CreatePost /></> : <Navigate to={'/auth'}/>} />
   
      </Routes>
   </Flex>)

  
}

export default App

