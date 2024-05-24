import { Navigate, Route, Routes } from "react-router-dom"
import Header from "./components/header"
import AuthPage from "./pages/auth"
import { useRecoilValue } from "recoil"
import { userDataAtom } from "./atoms/userAtom"
import HomePage from "./pages/HomePage"


import UserProfileEdit from "./pages/UpdatePage"
import Postpage from "./pages/Postpage"
import Explore from "./pages/Explore"


function App() {
  const user= useRecoilValue(userDataAtom);


  return (
   <>
   <Header/>
  
   <Routes>
   <Route path="/" element={user? <HomePage /> : <Navigate to={'/auth'}/> } />
      <Route path="/auth" element={!user? <AuthPage/>: <Navigate to={'/'}/> } />
      <Route path="/update" element={!user?  <Navigate to={'/auth'}/>: <UserProfileEdit/>} />
      <Route path="/post/:pid" element={<Postpage />} />
      <Route path="/explore" element={<Explore />} />
    </Routes>
   </>
  )
}

export default App

