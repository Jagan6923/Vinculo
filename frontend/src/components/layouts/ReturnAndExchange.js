import React from 'react';
import './ReturnAndExchange.css'; // Import the CSS file

const ReturnAndExchange = () => {
    return (
        <div className="policy-container">  {/* Apply the CSS class here */}
            <h1>Return and Exchange Policy</h1>
            <p className="last-updated">Last updated: [Insert Date]</p>  {/* Optional last updated date */}
            <p>
                <strong>1. General</strong><br/>
                1.1 We want you to be completely satisfied with your purchase. If you are not satisfied with your product, we are here to help.
                <br/>1.2 This Return and Exchange Policy applies to all products purchased through our website.
                <br/><br/>
                <strong>2. Returns</strong><br/>
                2.1 You have [6] days to return an item from the date you received it.
                <br/>2.2 To be eligible for a return, your item must be in the same condition that you received it. It must also be in the original packaging.If it's not in same condition your refund amount will be partially refund 
                <br/>2.3 To initiate a return, please contact our customer support team at [thevinculo@gmail.com]. Please include your order number and reason for return in your request.
                <br/>2.4 Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                <br/>2.5 If your return is approved, we will initiate a refund to your original method of payment. The refund may take [6] days to process, depending on your card issuer's policies.
                <br/>2.6 Please note that shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                <br/><br/>
                <strong>3. Exchanges</strong><br/>
                3.1 We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact us at [insert contact information].
                <br/>3.2 If you would like to exchange a product for a different size, color, or a different item altogether, please return the original item and place a new order for the desired item.
                <br/><br/>
                <strong>4. Non-Returnable Items</strong><br/>
                4.1 Several types of goods are exempt from being returned. Perishable goods, custom products, and personal care items cannot be returned.
                <br/>4.2 Digital products and downloadable software are also non-returnable.
                <br/>4.3 Gift cards are non-refundable.
                <br/><br/>
                <strong>5. Shipping</strong><br/>
                5.1 You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
                <br/>5.2 Depending on where you live, the time it may take for your exchanged product to reach you may vary.
                <br/>5.3 If you are shipping an item over , you should consider using a trackable shipping service or purchasing shipping insurance. We do not guarantee that we will receive your returned item.
                <br/><br/>
                <strong>6. Contact Information</strong><br/>
                6.1 If you have any questions about our Return and Exchange Policy, please contact us at [insert contact information].
            </p>
        </div>
    );
}

export default ReturnAndExchange;
