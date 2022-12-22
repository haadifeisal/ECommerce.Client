import { Container, createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import NotFound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import api from '../api/api';
import Loading from './Loading';
import CheckoutPage from '../../features/checkout/CheckoutPage';

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId){
      api.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }else{
      setLoading(false);
    }
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return <Loading message='Initializing app ...'></Loading>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        <Container>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/catalog' element={<Catalog/>} />
            <Route path='/catalog/:id' element={<ProductDetails/>} />
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/contact' element={<ContactPage/>} />
            <Route path='/basket' element={<BasketPage/>} />
            <Route path='/checkout' element={<CheckoutPage/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Container>
    </ThemeProvider>
  );
}

export default App;
