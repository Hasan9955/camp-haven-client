import Title from "./Title";


const FAQSection = () => {
    return (
        <div> 
            <Title title="FAQ Section" subtitle="Have any question on your mind!"/>
            <div className="max-w-6xl mx-auto space-y-4">

            <div className=" collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">What is a campaign product?</div>
                <div className="collapse-content">
                    <p>Campaign products are items that are part of a limited-time promotion, offering special discounts or deals. These products are often available for a short period or until stock runs out.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How long do campaign discounts last?</div>
                <div className="collapse-content">
                    <p>Campaign discounts typically last for the duration specified on the product page or until the promotion ends. Be sure to check the campaign details for exact dates and terms.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Can I return a campaign product?</div>
                <div className="collapse-content">
                    <p>Yes, campaign products are eligible for return, subject to our standard return policy. Please refer to our return policy for details on how to process a return.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How can I track my order?</div>
                <div className="collapse-content">
                    <p>Once your order has been shipped, we will send you a confirmation email with a tracking number. You can use this number to track your order via our website or the shipping providers site.</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default FAQSection;