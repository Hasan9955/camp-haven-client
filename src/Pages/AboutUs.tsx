import Contact from "../Components/Contact";
import FAQSection from "../Components/FAQSection";


const AboutUs = () => {
    return (
        <div className="">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23837752.23698474!2d-112.95906941727159!3d40.71533886444622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c62a51b06702a9%3A0x8444c65e4d4afa2d!2sThe%20Haven%20Camp!5e0!3m2!1sen!2sbd!4v1727370832472!5m2!1sen!2sbd&zoom=20"
                width="100%"
                height="400"
                className="max-w-5xl mx-auto rounded-lg my-10"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <FAQSection />
            <Contact />
        </div>
    );
};

export default AboutUs;