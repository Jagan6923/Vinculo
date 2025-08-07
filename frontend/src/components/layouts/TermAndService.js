import React from 'react';
import './TermsModal.css'; // Import the CSS file

const TermAndService = () => {
    return (
        <div className="policy-container">  {/* Apply the CSS class here */}
            <h1>Vinculo Terms and Services</h1>  {/* h1 instead of h2 to match the CSS */}
            <p className="last-updated">Last updated: [Insert Date]</p>  {/* Optional last updated date */}
            <p>
                Welcome to Vinculo! By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
                <br/><br/>
                <strong>1. General</strong><br/>
                1.1 These terms and conditions ("Terms") apply to all users of the Vinculo website and services.
                <br/>1.2 By accessing or using our website, you agree to be legally bound by these Terms, as well as our Privacy Policy.
                <br/><br/>
                <strong>2. Use of the Website</strong><br/>
                2.1 You must be at least 18 years old or have parental consent to use our website.
                <br/>2.2 You agree not to use the website for any unlawful or prohibited activities.
                <br/>2.3 We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion if we believe there is a violation of these Terms.
                <br/><br/>
                {/* Add the rest of the terms here */}
            </p>
        </div>
    );
}

export default TermAndService;
