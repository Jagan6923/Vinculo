import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import Loader from '../layouts/Loader';
import { Carousel, Modal, Button } from 'react-bootstrap';
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { clearReviewSubmitted, clearError, clearProduct } from '../../slices/productSlice';
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";
import boysSizeChart from "./boys.jpeg";
import girlsSizeChart from "./girls.png";
import infantSizeChart from "./infant.png";
import './productDetail.css';

export default function ProductDetail() {
    const { loading, product = {}, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { user } = useSelector(state => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");

    const increaseQty = () => {
        if (quantity < product.stock) setQuantity(quantity + 1);
    };

    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const [showReviewModal, setShowReviewModal] = useState(false);
    const handleReviewModalClose = () => setShowReviewModal(false);
    const handleReviewModalShow = () => setShowReviewModal(true);

    const [showSizeChartModal, setShowSizeChartModal] = useState(false);
    const handleSizeChartModalClose = () => setShowSizeChartModal(false);
    const handleSizeChartModalShow = () => setShowSizeChartModal(true);

    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('productId', id);
        dispatch(createReview(formData));
    };


    // console.log("Product Name:", product.name);
    // const firstName = product.name



    useEffect(() => {
        if (id) {
            dispatch(getProduct(id));
        }

        return () => {
            dispatch(clearProduct());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if (isReviewSubmitted) {
            handleReviewModalClose();
            toast.success('Your Review Submitted successfully', {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            dispatch(clearReviewSubmitted());
            dispatch(getProduct(id));
        }
        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            dispatch(clearError());
        }
    }, [dispatch, id, isReviewSubmitted, error]);

    const getSizeChart = (category) => {
        switch (category) {
            case 'Boys':
                return boysSizeChart;
            case 'Girls':
                return girlsSizeChart;
            case 'Infants':
                return infantSizeChart;
            default:
                return null;
        }
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            toast.error("Please select the size to proceed further", {
                position: toast.POSITION.BOTTOM_CENTER,
            });
            return;
        }
        dispatch(addCartItem(product._id, quantity, selectedSize));
        navigate('/cart');
    };
    const buttonStyle = {
        backgroundColor: 'orange',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px'
    };


    // Extract the first word from the product name
    const firstName = product.name ? product.name.split(' ')[0] : 'Product';

    // Debug logging
    console.log('Product data:', product);
    console.log('Product ID:', id);
    console.log('Loading state:', loading);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name || 'Product Details'} />
                    {!product._id ? (
                        <div className="container text-center mt-5">
                            <h4>Product not found or loading...</h4>
                            <p>Product ID: {id}</p>
                        </div>
                    ) : (
                        <div className="content-wrapper">
                            <div className="row f-flex justify-content-around">
                                <div className="col-12 col-lg-6 img-fluid" id="product_image">
                                    <Carousel pause="hover" interval={3000}>
                                        {product.images && product.images.map((image, index) => (
                                            <Carousel.Item key={image._id || index}>
                                                <img
                                                    className="d-block w-100"
                                                    src={`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}${image.image}`}
                                                    alt={firstName}
                                                    onError={(e) => {
                                                        console.log('Image failed to load:', e.target.src);
                                                        e.target.src = '/images/default-product.png'; // fallback image
                                                    }}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>

                                <div className="col-12 col-lg-6 mt-5">
                                    <div className="d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h3>{firstName}</h3>
                                            <p id="product_id">Product # {product._id}</p>

                                            <hr />

                                            <div className="rating-outer">
                                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                            </div>
                                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                            {user ? (
                                                <button onClick={handleReviewModalShow} id="review_btn" type="button" className="btn btn-primary mt-4" >
                                                    Submit Your Review
                                                </button>
                                            ) : (
                                                <div className="alert alert-danger mt-5">Login to Post Review</div>
                                            )}

                                            <hr />

                                            <p id="product_price"> ₹{product.price}</p>

                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus min-but" onClick={decreaseQty}>-</span>
                                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                                <span className="btn btn-primary plus add-but" onClick={increaseQty}>+</span>
                                            </div>

                                            <hr />
                                            {product.sizes && product.sizes.length > 0 && (
                                                <div className="product-sizes mb-3">
                                                    <h4>Sizes</h4>
                                                    <div>
                                                        {product.sizes.map(size => (
                                                            <button
                                                                key={size}
                                                                className={`btn ${selectedSize === size ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
                                                                onClick={() => setSelectedSize(size)}
                                                            >
                                                                {size}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="size-chart-btn ">
                                                        {product.category && (
                                                            <Button variant="info" style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: '#007bff', border: 'white' }} onClick={handleSizeChartModalShow}>
                                                                View Size Chart
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <hr />
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                {product.color && (
                                                    <div className="product-color">
                                                        <h4>Color</h4>
                                                        <p>{product.color}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <hr />
                                            <p>Status: <span className={product.stock > 0 ? 'greenColor' : 'redColor'} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                                            <hr />
                                            <h4 className="mt-2">Description:</h4>
                                            <p>{product.description}</p>
                                            <hr />

                                            <hr />
                                            <div className="d-flex mt-4">
                                                <button
                                                    type="button"
                                                    id="cart_btn"
                                                    disabled={product.stock === 0}
                                                    onClick={() => {
                                                        if (!selectedSize) {
                                                            toast.error("Please select the size to proceed further", {
                                                                position: toast.POSITION.BOTTOM_CENTER,
                                                            });
                                                            return;
                                                        }
                                                        dispatch(addCartItem(product._id, quantity, selectedSize));
                                                        toast.success('Item added to the cart!', {
                                                            position: toast.POSITION.BOTTOM_CENTER,
                                                        });
                                                    }}
                                                    style={buttonStyle}
                                                >
                                                    Add to Cart
                                                </button>
                                                <button
                                                    type="button"
                                                    id="buy_now_btn"
                                                    disabled={product.stock === 0}
                                                    onClick={handleBuyNow}
                                                    className="btn btn-primary d-inline ml-4"
                                                >
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>


                                    </div>

                                    <Modal show={showReviewModal} onHide={handleReviewModalClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <ul className="stars">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <li
                                                        value={star}
                                                        onClick={() => setRating(star)}
                                                        className={`star ${star <= rating ? 'orange' : ''}`}
                                                        onMouseOver={(e) => e.target.classList.add('yellow')}
                                                        onMouseOut={(e) => e.target.classList.remove('yellow')}
                                                        key={star}
                                                    ><i className="fa fa-star"></i></li>
                                                ))}
                                            </ul>

                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3"></textarea>
                                            <button disabled={loading} onClick={reviewHandler} className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </Modal.Body>
                                    </Modal>

                                    <Modal show={showSizeChartModal} onHide={handleSizeChartModalClose} className="size-chart-modal">
                                        <Modal.Header closeButton>
                                            <Modal.Title>Size Chart</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body >
                                            <img src={getSizeChart(product.category)} alt="Size Chart" />
                                        </Modal.Body>
                                    </Modal>


                                </div>
                            </div>

                            <div className="container container-fluid">
                                <hr />
                                <div className="review-section">
                                    <h3>Customer Reviews</h3>
                                    {console.log('Product reviews:', product.reviews)}
                                    {product.reviews && product.reviews.length > 0 ? (
                                        <ProductReview reviews={product.reviews} />
                                    ) : (
                                        <p><b>No Reviews on this product yet. Be the first to review!</b></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}
