import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        dispatch(getProducts(null, null, null, null, currentPage))
    }, [error, dispatch, currentPage])

    return (
        <Fragment>
            <div style={{ paddingBottom: '70px' }}>

                {loading ? <Loader /> :
                    <Fragment>
                        <MetaData title={'Vinculo'} />
                        <Carousel className="custom-carousel" style={{ marginTop: '20px' }}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 caro-image"
                                    src="images/caro1.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 caro-image"
                                    src="images/caro2.jpg"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100 caro-image"
                                    src="images/caro3.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                        <center>
                            <div className="container mt-5" >
                                <div className="row">
                                    <div className="col-12 mb-5">
                                        <h1 id="products_heading " className="categories">Categories</h1>

                                        <div className="image-container">
                                            <img
                                                src="/images/girl.jpg"
                                                alt="Girls Category"
                                            />
                                            <Link to="/girls">
                                                <div className="label" >Girls</div>
                                            </Link>
                                        </div>

                                        <div className="image-container">
                                            <img
                                                src="/images/boys.jpg"
                                                alt="Boys Category"
                                            />
                                            <Link to="/boys">
                                                <div className="label">Boys</div>
                                            </Link>
                                        </div>

                                        <div className="image-container">
                                            <img
                                                src="/images/infant.jpg"
                                                alt="Infants Category"
                                            />
                                            <Link to="/infant">
                                                <div className="label">Infant</div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </center>



                        <h1 id="products_heading" className="categories">Latest Products</h1>
                        <section id="products" className="container mt-5">
                            <div className="row ">
                                {products && products.map(product => (
                                    <Product col={3} key={product._id} product={product} />
                                ))}
                            </div>
                        </section>


                        {productsCount > 0 && productsCount > (resPerPage || 4) ?
                            <div className="d-flex justify-content-center mt-5" style={{
                                padding: '20px',
                                background: '#ffffffff',
                                borderRadius: '10px',
                                margin: '20px',
                            }}>
                                <Pagination
                                    activePage={currentPage}
                                    onChange={setCurrentPageNo}
                                    totalItemsCount={productsCount}
                                    itemsCountPerPage={resPerPage || 4}
                                    nextPageText={'>'}
                                    prevPageText={'<'}
                                    firstPageText={'First'}
                                    lastPageText={'Last'}
                                    itemClass={'page-item'}
                                    linkClass={'page-link'}
                                    innerClass={'pagination justify-content-center'}
                                    activeClass={'active'}
                                    activeLinkClass={'page-link'}
                                    pageRangeDisplayed={5}
                                    itemClassFirst={'page-item'}
                                    itemClassPrev={'page-item'}
                                    itemClassNext={'page-item'}
                                    itemClassLast={'page-item'}
                                    linkClassFirst={'page-link'}
                                    linkClassPrev={'page-link'}
                                    linkClassNext={'page-link'}
                                    linkClassLast={'page-link'}
                                />
                                <style jsx>{`
                                    .pagination {
                                        margin: 0;
                                    }
                                    .page-link {
                                        color: #000000ff;
                                        background-color: #fff;
                                        padding: 0.5rem 0.75rem;
                                        margin: 0 1px;
                                        border-radius: 0.375rem;
                                        text-decoration: none;
                                    }
                                    .page-item.active .page-link {
                                        background-color: #000000ff;
                                        border-color: #000000ff;
                                        color: #fff;
                                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                                    }
                                    .page-item.disabled .page-link {
                                        color: #6c757d;
                                        background-color: #fff;
                                        border-color: #dee2e6;
                                        opacity: 0.5;
                                    }
                                `}</style>
                            </div> :
                            <div className="d-flex justify-content-center mt-5">
                                <small style={{ color: '' }}>
                                    {productsCount === 0 ? 'No products found' :
                                        productsCount <= (resPerPage || 4) ? `Showing all ${productsCount} products (pagination not needed)` :
                                            'Pagination hidden due to condition not met'}
                                </small>
                            </div>
                        }
                    </Fragment>
                }
            </div>
        </Fragment>
    )
}