import CategoryProducts from "../Components/CategoryProducts";
import Contact from "../Components/Contact";
import FAQSection from "../Components/FAQSection";
import HomeSlider from "../Components/HomeSlider";
import RecommendedProducts from "../Components/RecommendedProducts";
import TopSoldProducts from "../Components/TopSoldProducts";


const Home = () => {
    return (
        <div>
            <HomeSlider />
            <TopSoldProducts />
            <CategoryProducts />
            <RecommendedProducts />
            <FAQSection />
            <Contact />

        </div>
    );
};

export default Home;