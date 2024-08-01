// index.jsx
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/LoginContext';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { WishlistCartProvider } from './context/wishList';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <WishlistCartProvider>
    <ChakraProvider>
      <BrowserRouter>
       
          <App />
       
      </BrowserRouter>
    </ChakraProvider>
  </WishlistCartProvider>
  </AuthProvider>
);
