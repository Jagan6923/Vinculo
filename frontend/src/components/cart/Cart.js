import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart, getCart , deleteCartItem } from '../../slices/cartSlice';


export default function Cart() {
  const { items, loading, error } = useSelector(state => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
     // Load cart with populated product data
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!items || items.length === 0) {
    return (
      <div className="text-center mt-5">
        <img src="/images/empty-cart.png" alt="Empty Cart" style={{ width: '300px', height: 'auto' }} />
        <h2 style={{fontSize:'2em'}}>Your Cart is Empty</h2>
      </div>
    );
  }
  const increaseQty = (item) => {
    if (item.quantity < item.product.stock) {
      dispatch(increaseCartItemQty({ productId: item.product._id, size: item.size }));
    }
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseCartItemQty({ productId: item.product._id, size: item.size }));
    }
  };

  const getFirstName = (name) => {
    return name ? name.split(',')[0] : 'Unknown Product'; // Use product name instead of item name
};

  const removeItemHandler = (itemId) => {
    dispatch(deleteCartItem({ itemId }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=saved-address');
  };

  const containerStyle = {
    marginTop: '60px',
    marginBottom: '60px',
    minHeight: 'calc(100vh - 120px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0 15px',
  };

  const cartItemStyle = {
    borderBottom: '1px solid #dee2e6',
    paddingBottom: '15px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#102C57',
    borderColor: '#102C57',
  };

  const emptyCartImage = '/images/empty-cart.png'; 

  return (
    <Fragment>
      <div style={containerStyle}>
        <h2 className="mt-5 text-center">Your Cart: <b>{items.length} items</b></h2>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {items.map(item => (
              <Fragment key={`${item.product?._id}_${item.size}`}>
                <div style={cartItemStyle}>
                  <div className="row align-items-center">
                    <div className="col-4 col-lg-3">
                      <img 
                        src={item.image ?? '/images/default-product.png'} 
                        alt={item.product?.name ?? 'Product'} 
                        className="img-fluid" 
                      />
                    </div>

                    <div className="col-8 col-lg-3">
                      <Link to={`/product/${item.product?._id ?? ''}`}>
                        {getFirstName(item.product?.name) ?? 'Product Name'}
                      </Link>
                      <p>Size: {item.size}</p>
                    </div>

                    <div className="col-6 col-lg-2 mt-2 mt-lg-0 price">
                      <p id="card_item_price"> ₹{item.product?.price ?? 0}</p>
                    </div>

                    <div className="col-6 col-lg-4 mt-2 mt-lg-0 cart-count">
                      <div className="d-flex justify-content-center justify-content-lg-start align-items-center">
                        <button
                          className="btn minus customsize1"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <input type="number" className="form-control count d-inline mx-2" value={item.quantity} readOnly />
                        <button
                          className="btn plus customsize"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                        <i
                          id="delete_cart_item"
                          onClick={() => removeItemHandler(item._id)}
                          className="fa fa-trash btn btn-danger ml-2"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
            <hr />
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary" className="text-center text-lg-left">
              <h4>Order Summary</h4>
              <hr />
              <p>Subtotal: <span className="order-summary-values">{items.reduce((acc, item) => acc + item.quantity, 0)} (Units)</span></p>
              <p>Est. total: <span className="order-summary-values"> ₹{items.reduce((acc, item) => acc + item.quantity * (item.product?.price ?? 0), 0)}</span></p>
              <hr />
              <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}