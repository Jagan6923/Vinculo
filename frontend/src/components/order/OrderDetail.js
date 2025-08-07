import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loader from '../layouts/Loader';
import { orderDetail as orderDetailAction } from '../../actions/orderActions';
import './OrderDetail.css';
import { useNavigate } from 'react-router-dom'; // Add this at the top

export default function OrderDetail() {
    const { orderDetail, loading } = useSelector(state => state.orderState);
    const { shippingInfo = {}, user = {}, orderStatus = "Processing", orderItems = [], totalPrice = 0, paymentInfo = {} } = orderDetail;
    const [isPaid, setIsPaid] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [showReturnButton, setShowReturnButton] = useState(true);
    const [cancelMessage, setCancelMessage] = useState('');
    const [isOrderCancelled, setIsOrderCancelled] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    // Check if the return button should be hidden
    const checkReturnButtonVisibility = () => {
        const hideButtonTime = localStorage.getItem(`hideReturnButton_${id}`);
        if (hideButtonTime && Date.now() > hideButtonTime) {
            setShowReturnButton(false);
        }
    };

    useEffect(() => {
        if (orderStatus === "Delivered") {
            checkReturnButtonVisibility();

            if (!localStorage.getItem(`hideReturnButton_${id}`)) {
                const hideButtonTime = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days from now
                localStorage.setItem(`hideReturnButton_${id}`, hideButtonTime);
                setTimeout(() => {
                    setShowReturnButton(false);
                }, 7 * 24 * 60 * 60 * 1000); // Hide the button after 7 days
            }
        }
    }, [orderStatus, id]);

    // Fetch order details
    useEffect(() => {
        dispatch(orderDetailAction(id));
    }, [dispatch, id]);

    // Check cancellation status from localStorage on component mount
    useEffect(() => {
        const cancelled = localStorage.getItem(`orderCancelled_${id}`);
        if (cancelled) {
            setIsOrderCancelled(true);
            setCancelMessage('Your order is cancelled');
        }
    }, [id]);

    // Update payment status when orderDetail is fetched
    useEffect(() => {
        if (orderStatus === "Delivered") {
            setIsPaid(true); // Automatically set to "PAID" if delivered
        } else if (paymentInfo && paymentInfo.status === "succeeded") {
            setIsPaid(true);
        } else {
            setIsPaid(false);
        }
    }, [paymentInfo]);

    // Handle cancel button click for both paid and unpaid orders
    const handleCancelClick = () => {
        if (orderStatus === "Processing") {
            // Navigate to CancelOrder page for both paid and unpaid orders
            navigate('/CancelOrder');
        }
    };

    // Render cancel button
    const renderButton = () => {
        if (orderStatus === "Processing") {
            return (
                <>
                    <button
                        className="btn btn-danger btn-block cancel-btn"
                        onClick={handleCancelClick}
                        disabled={isOrderCancelled || orderStatus !== "Processing"}  // Disable if the order is cancelled
                        style={styles.button}
                    >
                        Cancel Order
                    </button>
                    {cancelMessage && (
                        <p className="mt-2 text-success">{cancelMessage}</p>
                    )}
                </>
            );
        } else if (orderStatus === "Delivered" && showReturnButton) {
            return (
                <Link to="/RefundForm" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-danger btn-block refund-btn" style={styles.button}>
                        Return/Exchange
                    </button>
                </Link>
            );
        }
    };

    // Render Track Order Button
    const renderTrackOrderButton = () => {
        return (
            <Link to="/track-order" style={{ textDecoration: 'none' }}>
                <button className="btn btn-primary btn-block track-btn" style={styles.trackButton}>
                    Track Order
                </button>
            </Link>
        );
    };

    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <div style={styles.wrapper}>
                        <div style={styles.content}>
                            <h1 style={{ fontSize: '20px' }}>Order ID: {orderDetail._id}</h1>

                            <h4>Shipping Info</h4>
                            <p><b>Name:</b> {user.name}</p>
                            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                            <p><b>Address:</b> {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.state}, ${shippingInfo.country}`}</p>
                            <p><b>Amount:</b> ₹{totalPrice}</p>

                            <hr />

                            <h4>Payment</h4>
                            <p className={isPaid ? 'greenColor' : 'redColor'} ><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>

                            <h4>Order Status:</h4>
                            <p className={orderStatus.includes('Delivered') ? 'greenColor' : 'redColor'} ><b>{orderStatus}</b></p>
                            {renderTrackOrderButton()}
                            <hr />
                            <h4>Order Items:</h4>
                            <hr />
                            <div style={styles.orderItemsWrapper}>
                                {orderItems.map(item => (
                                    <div style={styles.mobileOrderItem} key={item.product}>
                                        <div style={styles.orderImage}>
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div style={styles.orderInfo}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <p>₹{item.price}</p>
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                            {renderButton()}

                            {orderStatus !== "Processing" && orderStatus !== "Delivered" && (
                                <p className="mt-2 text-danger cancel">
                                    You can't cancel the order once it is shipped.
                                </p>
                            )}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '80px',
    },
    content: {
        flex: 1,
        padding: '1rem',
    },
    button: {
        padding: '10px 20px',
        fontSize: '18px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '200px',
        textAlign: 'center',
        textDecoration: 'none'
    },
    trackButton: {
        padding: '10px 20px',
        fontSize: '18px',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '200px',
        textAlign: 'center',
        backgroundColor: '#007bff', // Blue button for Track Order
        color: '#fff',
        marginTop: '10px',
    },
    orderItemsWrapper: {
        marginBottom: '1rem',
    },
    mobileOrderItem: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderImage: {
        marginRight: '10px',
    },
    orderInfo: {
        flex: 1,
    }
};

// Add responsive styling using CSS
const stylesCSS = `
    @media (max-width: 768px) {
        .btn {
            width: 100%;
        }
        .greenColor, .redColor {
            display: block;
            text-align: center;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesCSS;
document.head.appendChild(styleSheet);

