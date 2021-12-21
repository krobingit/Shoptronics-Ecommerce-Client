import { Carousel } from 'react-responsive-carousel';
import banner1 from '../Assets/banners/banner-1.png';
import banner2 from '../Assets/banners/banner-2.jpg';
import banner3 from '../Assets/banners/banner-3.jpg';
import banner4 from '../Assets/banners/banner-4.jpg';
import banner5 from '../Assets/banners/banner-5.jpg';
import banner6 from '../Assets/banners/banner-6.png';
import banner7 from '../Assets/banners/banner-7.jpg';
import banner8 from '../Assets/banners/banner-8.webp';
import styled from 'styled-components';
import { small,medium } from '../responsive';

const SliderContainer = styled.div`
`

const Banner = styled.img`
${small({ objectFit: "contain", height: "10rem" })};
${medium({objectFit:"cover"})};
`
export function Slider() {
 return (
  <SliderContainer>
   <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                <div>
         <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner1} />
                </div>
                 <div>
                 <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner2} />
                </div>
                <div>
                <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner3} />
                </div>
                <div>
                <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner4} />
                </div>
 <div>
                <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner5} />
       </div>
     { <div>
                <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner6} />
       </div>}
           <div>
                <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner7} />
       </div>
        <div>
                <Banner height="310rem" alt="banner" style={{objectFit:"fill"}} src={banner8} />
                </div>
            </Carousel>
  </SliderContainer>

)


}