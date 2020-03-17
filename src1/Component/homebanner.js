import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Loader from './Loader/home_banner_loader'
const responsive={
  320:{items:1},
  480:{items:1},
  600:{items:1},
  960:{items:1},
  1200:{items:1}
  }
const HomeBanner=(props)=>{
  return( <section class="home_banner top_div">
          <OwlCarousel
             className="owl-theme"
             items={1}
             nav={true}
             loop={true}
             mouseDrag={true}
             dots={false}
             autoplay={true}
             autoplayTimeout={7000}
             smartSpeed={1500}
             margin={30}
             navigation={true}
             navText={["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}
            responsive={responsive}
             >
              <div class="item">
                  <div class="box">
                      <img src="/images/home_banner2.jpg" alt="" />
                      <div class="caption">
                          <div class="container">
                              <p class="desc">Work with verified, exceptional talent, hand-vetted for stellar quality and service.</p>
                          </div>
                          <div class="clearfix"></div>
                      </div>
                  </div>
              </div>
            {/*<div class="item">
                  <div class="box">
                      <img src="/images/home_banner6.jpg" alt="" />
                  </div>
              </div>
              <div class="item">
                  <div class="box">
                      <img src="/images/home_banner4.jpg" alt="" />
                  </div>
              </div>
              <div class="item">
                  <div class="box">
                      <img src="/images/home_banner5.jpg" alt="" />
                  </div>
              </div>*/}
              </OwlCarousel>
          <div class="clearfix"></div>
      </section>);
}
export default HomeBanner;
