import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MetaData from '../layouts/MetaData';
import { validateShipping } from './Shipping';
import CheckoutSteps from './CheckoutStep';

export default function ConfirmOrder() {
    const { shippingInfo, estimatedDeliveryDate, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [deliveryDate, setDeliveryDate] = useState('');
    const [loading, setLoading] = useState(true);

    // Extract passed address from state if passed
    const passedAddress = location.state?.address;

    // Use passedAddress if available, otherwise fall back to Redux state
    const finalShippingInfo = passedAddress || shippingInfo;

    // Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
    const shippingPrice = itemsPrice < 250 ? 0 : 50;
    let taxPrice = Number(0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number(taxPrice).toFixed(2);

    const processPayment = () => {
        const orderInfo = {
            orderItems: cartItems.map(item => ({
                product: item.product?._id, // Reference the product ID
                name: item.product?.name || 'Unknown Product', // Properly access the product's name
                price: item.product?.price || 0,
                quantity: item.quantity || 1,
                image: item.image || '',
                size: item.size || 'N/A'
            })),
            shippingInfo: finalShippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        };

        sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));
        navigate('/payment', { state: { shippingInfo: finalShippingInfo } });
    }

    const getFirstName = (name) => {
        return name ? name.split(',')[0] : 'Unknown Product'; // Use product name instead of item name
    };

    useEffect(() => {
        validateShipping(finalShippingInfo, navigate);

        // Fetch estimated delivery date from Shiprocket API
        const fetchDeliveryDate = async () => {
            try {
                setLoading(true);
                const tokenResponse = await axios.post('/api/shiprocket/authenticate');
                const token = tokenResponse.data.token;
                const response = await axios.post('/api/shiprocket/estimate-delivery', {
                    pickup_postcode: '624709',
                    delivery_postcode: finalShippingInfo.postalCode,
                    order_date: new Date().toISOString().split('T')[0],
                    token: token
                });
                // Ensure the estimated delivery date is correctly fetched
                if (response.data && response.data.estimated_delivery_date) {
                    setDeliveryDate(response.data.estimated_delivery_date);
                } else {
                    console.error('Estimated delivery date not available in the response');
                }
            } catch (error) {
                console.error('Error fetching delivery date:', error);
            } finally {
                setLoading(false); // Ensure loading is set to false after fetching
            }
        };

        fetchDeliveryDate();
    }, [finalShippingInfo, navigate]);

    if (!cartItems.length) {
        return <h2 className="mt-5">Your Cart is Empty</h2>;
    }

    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <CheckoutSteps shipping confirmOrder />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user?.name || 'N/A'}</p>
                    <p><b>Phone:</b> {finalShippingInfo?.phoneNo || 'N/A'}</p>
                    <p className="mb-4"><b>Address:</b> {finalShippingInfo?.address || 'N/A'}, {finalShippingInfo?.city || 'N/A'}, {finalShippingInfo?.postalCode || 'N/A'}, {finalShippingInfo?.state || 'N/A'}, {finalShippingInfo?.country || 'N/A'}</p>

                    {/* Display the estimated delivery date */}
                    {loading ? (
                        <p>Loading estimated delivery date...</p>
                    ) : deliveryDate ? (
                        <p className="mb-4"><b>Estimated Delivery Date:</b> {new Date(deliveryDate).toDateString()}</p>
                    ) : (
                        <p className="mb-4"><b>Estimated Delivery Date:</b> Not available</p>
                    )}

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>

                    {cartItems.map(item => (
                        <Fragment key={`${item.product}_${item.size}`}>
                            <div className="cart-item my-1">
                                <div className="row align-items-center">
                                    <div className="col-4 col-lg-2">
                                        <img src={item.image || ''} alt={getFirstName(item.product?.name)} height="45" width="65" />
                                    </div>

                                    <div className="col-8 col-lg-6">
                                        <div className="d-flex flex-column">
                                            <Link to={`/product/${item.product}`}>
                                                {getFirstName(item.product?.name) || 'Unknown Product'}
                                            </Link>
                                            <p className="text-muted">Size: {item.size || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-end mt-2 mt-lg-0">
                                        <p className="mb-0">{item.quantity} x ₹{item.product?.price || 0} = <b>₹{(item.quantity * (item.product?.price || 0)).toFixed(2)}</b></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </Fragment>
                    ))}
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">₹{itemsPrice.toFixed(2)}</span></p>
                        <p>Shipping: <span className="order-summary-values">₹{shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">₹{taxPrice}</span></p>
                        <hr />
                        <p>Total: <span className="order-summary-values">₹{totalPrice}</span></p>
                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
