// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image1 from '../assets/camp5.jpg';
import image2 from '../assets/camp7.jpg';
import image3 from '../assets/camp9.jpg';


// import required modules
import { Autoplay, Keyboard, EffectFade, Navigation, Pagination } from 'swiper/modules';






const HomeSlider = () => {
 


    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={false}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                keyboard={{
                    enabled: true,
                  }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Keyboard, EffectFade, Navigation, Pagination]}
                className="mySwiper"
            >
                {
                    <div>
                    <SwiperSlide>
                        <div><img className="h-[200px] md:h-[300px] lg:h-[400px] xl:h-[450px] w-full" src={image1} alt="" /></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div><img className="h-[200px] md:h-[300px] lg:h-[400px] xl:h-[450px] w-full" src={image2} alt="" /></div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div><img className="h-[200px] md:h-[300px] lg:h-[400px] xl:h-[450px] w-full" src={image3} alt="" /></div>
                    </SwiperSlide>
                    </div>
                }
            </Swiper>

        </div>
    );
};

export default HomeSlider;