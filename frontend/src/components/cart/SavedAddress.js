import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './SavedAddress.css';

const SavedAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();

    const state = useSelector((state) => state);
    console.log('Redux state:', state);

    const user = useSelector((state) => state.authState?.user);
    console.log('User:', user);

    const userEmail = user?.email;
    console.log('User Email:', userEmail);


    const userId = user?._id
    console.log(userId)



    useEffect(() => {
        if (userEmail) {  // Check if userEmail is defined
            const fetchAddresses = async () => {
                try {
                    // Modify the endpoint to use the email
                    const response = await axios.get(`/api/user/${userEmail}/address`);
                    console.log('Fetched Addresses:', response.data);  // Debugging: Check API response
                    // Ensure the response structure is correct
                    if (Array.isArray(response.data)) {
                        setAddresses(response.data);
                    } else {
                        console.error('Unexpected response structure:', response.data);
                    }
                } catch (error) {
                    console.error('Error fetching addresses:', error);
                }
            };

            fetchAddresses();
        }
    }, [userEmail]);

   
    const handleRemove = async (id) => {
        try {
            await axios.delete(`/api/user/${userEmail}/address/${id}`);
            setAddresses(addresses.filter(address => address._id !== id));
        } catch (error) {
            console.error('Error removing address:', error);
        }
    };
    

    const handleAddNewAddress = () => {
        navigate('/shipping');
    };

    const handleContinue = (address) => {
        navigate('/order/confirm', { state: { address } });
    };

    return (
        <div className="row wrapper" id="wrapper">
            <div className="col-10 col-lg-5">
                <h1 className="mb-4">Saved Addresses</h1>
                {/* Display the user's email if available */}
                {userEmail && <p>Email: {userEmail}</p>}

                {addresses.length > 0 ? (
                    addresses.map((address) => (
                        <div key={address._id} className="saved-address shadow-lg mb-4 p-3">
                            <p><strong>Address:</strong> {address.address}</p>
                            <p><strong>City:</strong> {address.city}</p>
                            <p><strong>Phone No:</strong> {address.phoneNo}</p>
                            <p><strong>Postal Code:</strong> {address.postalCode}</p>
                            <p><strong>Country:</strong> {address.country}</p>
                            <p><strong>State:</strong> {address.state}</p>
                            <div className="edit-remove-container">
                                <button onClick={() => handleRemove(address._id)} className="btn btn-danger">Remove</button>
                                <div className="continue-container">
                                    <button onClick={() => handleContinue(address)} className="btn btn-success continue-button">Continue</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No saved addresses found.</p>
                )}

                <button
                    onClick={handleAddNewAddress}
                    className="btn btn-success btn-block mt-4"
                >
                    New Address
                </button>
            </div>
        </div>
    );
};

export default SavedAddress;
