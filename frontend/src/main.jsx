
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'

import {BrowserRouter} from 'react-router-dom'
import { RecoilRoot } from'recoil';



  const config={
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
  const colors={
    gray:{
      light:'#616161',
      dark:'#1e1e1e'
    }
  }
  const theme= extendTheme({config,colors});

ReactDOM.createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
    <RecoilRoot>
    <ChakraProvider theme={theme}>
  
  <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
  <App />
  </ChakraProvider>
  
    </RecoilRoot>
     </BrowserRouter>
 
 
   
 
)