import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const redirect = location.search ? '/' + location.search.split('=')[1] : '/';

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Check if email or password is empty
        if (!email || !password) {
            toast.error('Please enter both email and password', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }

        // Check if the email format is correct
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address', {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return;
        }

        // Dispatch login action
        dispatch(login(email, password));
    };

    /// Google Sign-In callback
    const handleGoogleLogin = (response) => {
        const userObject = jwtDecode(response.credential);
        navigate('/register', {
            state: {
                name: userObject.name,
                email: userObject.email,
            }
        });
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect);
        }

        if (error) {
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        }

        /* global google */
        google.accounts.id.initialize({
            client_id: "143908727985-v4kli06va2gmijttov1crlms19ejevpj.apps.googleusercontent.com",  // Replace with your actual client ID
            callback: handleGoogleLogin
        });

        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large" }
        );
    }, [error, isAuthenticated, dispatch, navigate.redirect]);

    return (
        <Fragment>
            <MetaData title={`Login`} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-3">Login</h1>

                        {/* New User Notice */}
                        <div className="alert alert-info">
                            <strong>New User?</strong> Please log in using Google.
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        {/* Google Sign-In Button */}
                        <div id="googleSignInButton" style={{ marginTop: '20px' }}></div>

                    </form>
                </div>
            </div>
        </Fragment>
    );
}
