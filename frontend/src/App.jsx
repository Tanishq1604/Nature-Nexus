import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/header"
import AuthPage from "./pages/auth"
import { useRecoilValue } from "recoil"
import { userDataAtom } from "./atoms/userAtom"
import HomePage from "./pages/HomePage"

import SimpleSidebar from "./components/sidebar"


function App() {
  const user= useRecoilValue(userDataAtom);


  return (
   <>
   <Header/>
  
   <Routes>
   <Route path="/" element={user? <HomePage /> : <Navigate to={'/auth'}/> } />
      <Route path="/auth" element={!user? <AuthPage/>: <Navigate to={'/'}/> } />
    

  
    </Routes>
   </>
  )
}

export default App

