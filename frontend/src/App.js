import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/ProductDetail';
import ProductSearch from './components/product/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import SavedAddress from './components/cart/SavedAddress';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import axios from 'axios';
import OrderSuccess from './components/cart/OrderSuccess';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import UpdateOrder from './components/admin/UpdateOrder';
import UserList from './components/admin/UserList';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';
import RefundForm from './components/order/RefundForm';

import ErrorBoundary from './components/ErrorBoundary';
import BoysProducts from './components/Boys';
import GirlsProducts from './components/Girls';
import InfantProducts from './components/Infant';
import About from './components/layouts/About';
import FAQ from './components/layouts/faq';
import PrivacyPolicy from './components/layouts/privacypolicy';
import TermsAndConditions from './components/layouts/termsandconditions';
import CancellationAndRefundPolicy from './components/layouts/refundpolicy';
import ContactUs from './components/layouts/contactus';
import CardLayout from './components/layouts/others';
import ShippingPolicy from './components/layouts/Shippingpolicy';
import CancelOrder from './components/order/cancelorder';
import ReturnAndExchange from './components/layouts/ReturnAndExchange';
import OrderTracking from './components/layouts/OrderTracking';
import TermAndService from './components/layouts/TermAndService';
import OutOfStock from './components/admin/Outofstock';


function App() {
  const [razorpayApiKey, setRazorpayApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser);

    // Load Razorpay script
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();

    // Fetch Razorpay API key from backend
    async function getRazorpayApi() {
      const { data } = await axios.get('/api/v1/razorpayapikey');
      setRazorpayApiKey(data.razorpayApiKey);
    }
    getRazorpayApi();
  }, []);


  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <div className='container container-fluid'>
            <ToastContainer
              theme='light'
              position='bottom-center'
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{
                fontSize: '16px',
                fontWeight: '500'
              }}
            />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/boys" element={<BoysProducts />} />
              <Route path="/girls" element={<GirlsProducts />} />
              <Route path="/infant" element={<InfantProducts />} />
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path='/password/forgot' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<ErrorBoundary><Cart /></ErrorBoundary>} />
              <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path='/saved-address' element={<ProtectedRoute><SavedAddress /></ProtectedRoute>} />

              <Route path='/about' element={<About />} />
              <Route path='/RefundForm' element={<RefundForm />} />
              <Route path='/CancelOrder' element={<CancelOrder />} />


              <Route path='/faq' element={<FAQ />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/terms-conditions' element={<TermsAndConditions />} />
              <Route path='/refund-policy' element={<CancellationAndRefundPolicy />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/shipping-policy' element={<ShippingPolicy />} />
              <Route path='/others' element={<CardLayout />} />
              <Route path='terms-of-service' element={<TermAndService />} />
              <Route path='/return-exchange-policy' element={<ReturnAndExchange />} />
              <Route path='/track-order' element={<OrderTracking />} />


              <Route path='/shipping' element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
              <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
              <Route path='/order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path='/orders' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
              <Route path='/order/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            </Routes>
          </div>
          {/* Admin Routes */}
          <Routes>
            <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
            <Route path='/admin/products' element={<ProtectedRoute isAdmin={true}><ProductList /></ProtectedRoute>} />
            <Route path='/admin/products/create' element={<ProtectedRoute isAdmin={true}><NewProduct /></ProtectedRoute>} />
            <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct /></ProtectedRoute>} />
            <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList /></ProtectedRoute>} />
            <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder /></ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList /></ProtectedRoute>} />
            <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser /></ProtectedRoute>} />
            <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><ReviewList /></ProtectedRoute>} />
            <Route path='/admin/outofstock' element={<ProtectedRoute isAdmin={true}><OutOfStock /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;