import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState, useEffect } from "react";
import { saveShippingInfo, addSavedAddress, saveEstimatedDeliveryDate } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutStep";
import { toast } from "react-toastify";
import axios from 'axios';

export const validateShipping = (shippingInfo, navigate) => {
    if (
        !shippingInfo.address ||
        !shippingInfo.city ||
        !shippingInfo.state ||
        !shippingInfo.country ||
        !shippingInfo.phoneNo ||
        !shippingInfo.postalCode
    ) {
        toast.error('Please fill the shipping information', { position: toast.POSITION.BOTTOM_CENTER });
        navigate('/shipping');
    }
}

export default function Shipping() {
    const { shippingInfo = {} } = useSelector(state => state.cartState);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country || "India");
    const [state, setState] = useState(shippingInfo.state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Prevent navigation to the next page if not using the continue button
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ''; // This is necessary for the event to trigger a confirmation dialog
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate phone number length
        if (phoneNo.length !== 10) {
            toast.error('Please enter a valid 10-digit phone number', { position: toast.POSITION.BOTTOM_CENTER });
            return;
        }

        // Save the shipping info to the store
        const shippingData = { address, city, phoneNo, postalCode, country, state };
        dispatch(saveShippingInfo(shippingData));

        // Add the shipping info to the saved addresses
        const addressWithId = { id: Date.now(), ...shippingData };
        dispatch(addSavedAddress(addressWithId));

        // API call to save the shipping info in the database and get the estimated delivery date
        try {
            const { data } = await axios.post('/api/v1/shipping/save', shippingData);
            if (data.success) {
                toast.success('Shipping information saved successfully!', { position: toast.POSITION.BOTTOM_CENTER });

                // Save the estimated delivery date in Redux store
                dispatch(saveEstimatedDeliveryDate(data.estimatedDeliveryDate));
            }
        } catch (error) {
            toast.error('Failed to save shipping information', { position: toast.POSITION.BOTTOM_CENTER });
        }

        // Navigate to the order confirmation page
        navigate('/order/confirm');
    }

    return (
        <Fragment>
            <CheckoutSteps shipping />
            <div className="row wrapper" style={{ paddingBottom: '90px', paddingTop: '10px' }}>
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                className="form-control"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                <option value="India">India</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input
                                type="text"
                                id="state_field"
                                className="form-control"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
