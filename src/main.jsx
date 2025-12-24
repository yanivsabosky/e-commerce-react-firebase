
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// routing library to move from another page to another in app
import { BrowserRouter } from 'react-router-dom'

// using Redux
import {Provider} from "react-redux";
import {store} from './FINALprojects/Client/Store/store.js'

// Styling Section
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from "./FINALprojects/Client/Styling/theme.js"




createRoot(document.getElementById('root')).render(

    //  routing
  <BrowserRouter>
    <Provider store={store}>
       <ThemeProvider theme={theme}>
         <CssBaseline />
            <App />
       </ThemeProvider>
    </Provider>
    </BrowserRouter>
      
     
   

)
