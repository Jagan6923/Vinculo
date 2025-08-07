
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';

export default function OrderSuccess() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
        const paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo'));
        
        if (!orderInfo || !paymentInfo) {
            navigate('/cart');
            return;
        }

        const order = {
            ...orderInfo,
            paymentInfo,
            orderItems: orderInfo.orderItems.map(item => ({
                ...item,
                size: item.size  // Ensure size is included in each order item
            }))
            
        };

        dispatch(createOrder(order));
        
        // Clear session storage
        sessionStorage.removeItem('orderInfo');
        sessionStorage.removeItem('paymentInfo');
    }, [dispatch, navigate]);

    return (
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />
                <h2>Order placed successfully.</h2>
                <Link to="/orders">Go to Orders</Link>
            </div>
        </div>
    )
}