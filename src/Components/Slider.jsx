import { Carousel } from 'react-responsive-carousel';
import banner1 from '../Assets/banners/banner-1.jpg';
import banner2 from '../Assets/banners/banner-2.jpg';
import banner3 from '../Assets/banners/banner-3.jpg';
import banner4 from '../Assets/banners/banner-4.jpg';
import banner5 from '../Assets/banners/banner-5.gif';
import banner6 from '../Assets/banners/banner-6.jpg';
import banner7 from '../Assets/banners/banner-7.jpg';
import styled from 'styled-components';
import { small } from '../responsive';

const SliderContainer = styled.div`
${small({display:"none"})}`

export function Slider() {
 return (
  <SliderContainer>
   <Carousel showThumbs={false} showStatus={false} autoPlay infiniteLoop>
                <div>
         <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner1} />
                </div>
                 <div>
                 <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner2} />
                </div>
                <div>
                <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner3} />
                </div>
                <div>
                <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner4} />
                </div>
 <div>
                <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner5} />
       </div>
       <div>
                <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner6} />
       </div>
           <div>
                <img height="330rem" alt="banner" style={{objectFit:"fill"}} src={banner7} />
                </div>
            </Carousel>
  </SliderContainer>

)


}