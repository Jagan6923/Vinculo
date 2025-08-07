import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

export default function Product({ product }) {

    // Extract the first name from the product name
    const firstName = product.name.split(',')[0].trim();

    const calculateRatingsWidth = (ratings) => {
        return (ratings / 5) * 100;
    };

    return (
        <div className="col-6 col-md-4 col-lg-3 my-3"> {/* Adjusted Bootstrap classes */}
            <div className="card p-3 rounded product">
                <Link to={`/product/${product._id}`}>
                    {product.images.length > 0 ? (
                        <img
                            className="card-img-top mx-auto"
                            src={product.images[0].image}
                            alt={firstName} // Use firstName for better accessibility
                        />
                    ) : (
                        <img
                            className="card-img-top mx-auto"
                            src="default-image-path.jpg"  // Add a default image path
                            alt="Default Product"
                        />
                    )}
                </Link>
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{firstName}</Link> {/* Display only the first name */}
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${calculateRatingsWidth(product.ratings)}%` }}></div>
                        </div>
                        <br />
                        <div><span id="no_of_reviews">({product.numOfReviews} Reviews)</span></div>
                    </div>
                    <p className="card-text"> ₹{product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    );
}
