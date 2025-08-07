import { Fragment, useEffect, useState } from 'react';
import MetaData from '../layouts/MetaData';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { userOrders as userOrdersAction } from '../../actions/orderActions';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const { userOrders = [] } = useSelector(state => state.orderState);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(userOrdersAction);
    }, [dispatch]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = userOrders.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const setOrders = () => {
        const isMobile = window.innerWidth <= 768; // Check if the screen width is 768px or less

        if (isMobile) {
            // Return data for mobile view
            return filteredOrders.map(userOrder => (
                <div key={userOrder._id} style={styles.mobileOrder}>
                    <p><strong>Order ID:</strong> {userOrder._id}</p>
                    <p><strong>Number of Items:</strong> {userOrder.orderItems.length}</p>
                    <p><strong>Amount:</strong> ₹{userOrder.totalPrice}</p>
                    <p><strong>Status:</strong> <span style={{ color: userOrder.orderStatus.includes('Delivered') ? 'green' : 'red' }}>{userOrder.orderStatus}</span></p>
                    <Link to={`/order/${userOrder._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i> View Details
                    </Link>
                </div>
            ));
        } else {
            // Return data for desktop view
            const data = {
                columns: [
                    { label: "Order ID", field: 'id', sort: "asc" },
                    { label: "Number of Items", field: 'numOfItems', sort: "asc" },
                    { label: "Amount", field: 'amount', sort: "asc" },
                    { label: "Status", field: 'status', sort: "asc" },
                    { label: "View Details", field: 'actions', sort: "asc" }
                ],
                rows: []
            };

            filteredOrders.forEach(userOrder => {
                data.rows.push({
                    id: userOrder._id,
                    numOfItems: userOrder.orderItems.length,
                    amount: `₹${userOrder.totalPrice}`,
                    status: userOrder.orderStatus && userOrder.orderStatus.includes('Delivered')
                        ? (<p style={{ color: 'green' }}>{userOrder.orderStatus}</p>)
                        : (<p style={{ color: 'red' }}>{userOrder.orderStatus}</p>),
                    actions: (
                        <Link to={`/order/${userOrder._id}`} className="btn btn-primary">
                            <i className='fa fa-eye'></i>
                        </Link>
                    )
                });
            });

            return data;
        }
    };

    return (
        <Fragment>
            <MetaData title="My Orders" />
            <div style={styles.wrapper}>
                <div style={styles.content}>
                    <h1>My Orders</h1>
                    {window.innerWidth <= 768 && (
                        <div style={styles.searchBarWrapper}>
                            <input
                                type="text"
                                placeholder="Search Orders..."
                                value={searchTerm}
                                onChange={handleSearch}
                                style={styles.searchBar}
                            />
                        </div>
                    )}
                    <div style={styles.tableWrapper}>
                        {window.innerWidth <= 768 ? (
                            setOrders()
                        ) : (
                            <MDBDataTable
                                bordered
                                striped
                                hover
                                data={setOrders()}
                                responsive
                                noBottomColumns
                            />
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '80px',  // Adjust this if your header is of different height
        paddingBottom: '80px', // Adjust this if your footer is of different height
    },
    content: {
        flex: 1,
        padding: '1rem',
    },
    tableWrapper: {
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
    },
    mobileOrder: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    searchBarWrapper: {
        marginBottom: '1rem',
    },
    searchBar: {
        width: '100%',
        padding: '0.5rem',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }
};

// Add responsive styling using CSS
const stylesCSS = `
    @media (max-width: 768px) {
        .mdb-datatable {
            display: none;
        }
        .table-responsive {
            display: none;
        }
        .mobileOrder {
            display: block;
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = stylesCSS;
document.head.appendChild(styleSheet);