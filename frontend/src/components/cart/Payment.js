import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { validateShipping } from '../cart/Shipping';
import { createOrder } from '../../actions/orderActions';
import { clearError as clearOrderError } from "../../slices/orderSlice";


export default function Payment({ razorpayApiKey }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [orderInfo, setOrderInfo] = useState(
        location.state?.orderInfo || JSON.parse(sessionStorage.getItem('orderInfo'))
    );
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo: reduxShippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);

    // const shippingInfo = location.state?.shippingInfo || reduxShippingInfo;
    const shippingInfo = location.state?.shippingInfo || orderInfo.shippingInfo;


    const [isRazorpayUp, setIsRazorpayUp] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    useEffect(() => {
        if (!orderInfo) {
            toast("Order information is missing. Please try again.", {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/cart');
            return;
        }

        validateShipping(shippingInfo, navigate);
        if (orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearOrderError()) }
            });
            return;
        }

        const checkRazorpayStatus = async () => {
            try {
                await axios.get('/api/v1/payments/check-status');
                setIsRazorpayUp(true);
            } catch (error) {
                setIsRazorpayUp(false);
            }
        };

        checkRazorpayStatus();

        const interval = setInterval(checkRazorpayStatus, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [orderError, dispatch, navigate, shippingInfo, orderInfo]);

    const paymentData = orderInfo ? {
        amount: orderInfo.totalPrice, // Amount in rupees, backend will convert to paise
        shipping: {
            name: user.name,
            address: {
                city: shippingInfo.city,
                postal_code: shippingInfo.postalCode,
                country: shippingInfo.country,
                state: shippingInfo.state,
                line1: shippingInfo.address
            },
            phone: shippingInfo.phoneNo
        }
    } : null;

    const handlePaymentSuccess = (response) => {
        const paymentInfo = {
            id: response.razorpay_payment_id,
            status: "succeeded"
        };

        sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        navigate('/order/success');
    };


    const handleCOD = () => {
        const paymentInfo = {
            id: 'COD',
            status: 'pending'
        };

        sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        navigate('/order/success');
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!orderInfo) {
            toast("Order information is missing. Please try again.", {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            });
            navigate('/cart');
            return;
        }

        if (!isRazorpayUp && retryCount >= 3) {
            toast("Razorpay is currently down. Please try again later.", {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }

        try {
            const { data } = await axios.post('/api/v1/payments/payment/process', paymentData);

            const options = {
                key: razorpayApiKey,
                amount: data.amount,
                currency: data.currency,
                name: "Vinculo",
                description: "Test Transaction",
                image: "/image/logovin.jpg",
                order_id: data.order_id,
                handler: handlePaymentSuccess,
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: shippingInfo.phoneNo
                },
                notes: {
                    address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`
                },
                theme: {
                    color: "#2A292B"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            toast("Payment failed. Please try again later.", {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER
            });
            setRetryCount(prevCount => prevCount + 1);
        }
    };

    if (!orderInfo) {
        return null; // or return a loading spinner
    }

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-4">Payment Info</h1>
                    <button
                        id="pay_btn"
                        type="submit"
                        onClick={submitHandler}
                        className="btn btn-block py-3"
                    >
                        Pay - {` ₹${orderInfo.totalPrice}`}
                    </button>
                    <button
                        id="cod_btn"
                        type="button"
                        onClick={handleCOD}
                        className="btn btn-block py-3 mt-3"
                    >
                        Cash on Delivery
                    </button>
                </form>
            </div>
        </div>
    );
}