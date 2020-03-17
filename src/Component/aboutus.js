

import React,{useEffect} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NotFound from './not_found/not_found'
import $ from 'jquery'
const responsive={
  320:{items:1},
  480:{items:1},
  600:{items:1},
  960:{items:1},
  1200:{items:1}
  }
class Aboutus extends React.Component{
  state={
    popup:''
  }
  state={not_found:false}
  componentDidMount(){
    console.log(this.props);
    this.setState({url_id:this.props.location.hash},function(){this.ScrollTo()});
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    // $(function() {
    //       $(".about_page .memb_list ul li .box a").click(function() {
    //           document.getElementById("about_us_owner").style.height = "100%";
    //           $("body").addClass("bfix1");
    //       });
    //       $(".about_us_owner .about_owner_list a.closebtn_sell").click(function() {
    //           document.getElementById("about_us_owner").style.height = "0%";
    //           $("body").removeClass("bfix1");
    //       });
    //   });

    //   $('html, body').stop().animate({
    //       'scrollTop': $target.offset().top
    //
    //   }, 900, 'swing', function () {
    //       window.location.hash = target;
    // });
      // $('a[href*=\\#]').on('click',function(e) {
      //
      //     var target = this.hash;
      //     var $target = $(target);
      //   //  console.log(targetname);
      //     var targetname = target.slice(1, target.length);
      //
      //     if(document.getElementById(targetname) != null) {
      //          e.preventDefault();
      //     }
      //     $('html, body').stop().animate({
      //         'scrollTop': $target.offset().top
      //
      //     }, 900, 'swing', function () {
      //         window.location.hash = target;
      //   });
      // });
  }
  openNav=(data)=> {
    this.setState({popup:data})
  document.getElementById("about_us_owner").style.height = "100%";
  }

  closeNav=()=> {
    this.setState({popup:''})
  document.getElementById("about_us_owner").style.height = "0%";
  }

  ScrollTo=()=>{
    var myEle = $(this.state.url_id).html();
    if(myEle)
    {
    $('html, body').animate({
      scrollTop: ($(`${this.state.url_id}`).offset().top-90)
    }, 500);
   }
   else {
     this.setState({not_found:true})
   }
  }
  componentDidUpdate()
  {
    if(this.props.location.hash!=this.state.url_id)
    {
        this.setState({url_id:this.props.location.hash,not_found:false},function(){this.ScrollTo()});
    }
  }
  render()
  {
    if(!this.state.not_found)
    {
  return( <div>
        <section class="inner_banner">
            <div class="box">
              <video autoPlay muted loop>
                <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578567226/partner1_gdxjdn.mp4" type="video/mp4"/>
                <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631250/partner1_ykhibp.ogv" type="video/ogv"/>
                <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631650/partner1_r1cuqt.webm" type="video/webm"/>
              </video>
                <div class="caption">
                    <div class="container">
                        <h2>About us</h2>
                        <p class="desc"></p>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="clearfix"></div>
        </section>

        <section class="inner_cont about_page">
            <div class="breadcrumb">
                <div class="container">
                    <ul>
                        <li><a href="javascript:">Home</a></li>
                        <li><span>about us</span></li>
                    </ul>
                </div>
            </div>
            <div class="cont_area overview" id="overview">
                <div class="container">
                    <div class="h2_ttl">
                        <h2 class="h2"><span>About Planetshare</span></h2>
                    </div>
                    <div class="desc">
                        <h3>Overview</h3>
                        <p>Planetshare is a media technology platform and an online marketplace for freelance services. We at Planetshare provide a two-way platform for people to buy and sell a host of digital services typically offered by sellers and freelance vendors. While buyers get access to a variety of post-production services and other digital services used in filmmaking or media content creation sellers and vendors get a platform to sell their content and render their services as demanded or otherwise.</p>

                        <h3>Objective</h3>
                        <p>Our objective is to offer passionate creators, sellers, and skilled service providers a platform to sell their content and render production services to our customers and clients. Also, our constant endeavor is to make content and entertainment barrier-free by enabling content creators to break the language restrictions, bandwidth limits, etc. as they opt for the services of our Service Partners (Vendors and Sellers). </p>

                        <h3>How We Work</h3>
                        <p>At Planetshare, we have a rich stock of images, graphics and videos sourced from the crowd, as well as we may have our own media stock. Sellers can come on Planetshare to sell their images, graphics and videos, and vendors can register themselves to offer their services. Also, Planetshare and its Service Partners offer its services on the chosen media files as asked by our customers and clients.</p>
                        <p>While customers have the luxury to browse and buy the images, graphics and videos of their choice, they can also opt for services on the selected media file (s). They will have access to a wide range of images, graphics and videos, and they can also top-up their chosen media file (s) with services. The media services are additional and separate as customers can buy media files and opt for services independently.</p>
                        <p>While Planetcast works independently, we have sellers and vendors on our website to enrich our platform with their contributions.</p>
                    </div>
                </div>
            </div>
            <div class="cont_area awards" id="awards">
                <div class="container">
                    <div class="h2_ttl">
                        <h2 class="h2"><span>Awards & Achievments</span></h2>
                    </div>
                    <div class="award_box">
                    <OwlCarousel
                       className="award_list owl-carousel"
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
                            <li class="item">
                                <div class="aw">
                                    <div class="box l">
                                        <div class="img">
                                            <img src="images/awards_1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div class="box r">
                                        <div class="desc">
                                            <h3>Zee Business Dare To Dream Awards 2019</h3>
                                            <p>Brand Planetcast created another milestone by winning Zee Business Dare to Dream Award for Business Transformation Through Technology. Our respected founders Mr. M.N Vyas and Mr. Lalit Jain received the award from Dr. Arun Kumar Panda, Secretary, Ministry of Micro, Small & Medium Enterprises, GOI at a glittering ceremony held on September 25, 2019.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="item">
                                <div class="aw">
                                    <div class="box l">
                                        <div class="img">
                                            <img src="images/awards_2.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div class="box r">
                                        <div class="desc">
                                            <h3>CII Award For Customer Obsession 2018</h3>
                                            <p>The award honors customer-centric business organizations, where customers are at the center of their operations. The award program was based on the requirements of the "CII IQ Excellence Framework for Managing Customer Experience". A comprehensive and meticulous assessment process was designed in tandem with internationally applied assessment system. For more information, visit www.ciicustomerobsessionawards.com</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="item">
                                <div class="aw">
                                    <div class="box l">
                                        <div class="img">
                                            <img src="images/awards_3.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div class="box r">
                                        <div class="desc">
                                            <h3>Digital Studio India Awards 2018</h3>
                                            <p>Planetcast honored with Editor's Choice Special Award for its contribution to the Television Broadcast Industry at the Digital Studio India Awards 2018. Award ceremony was held on October 26, 2018 in Mumbai.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="item">
                                <div class="aw">
                                    <div class="box l">
                                        <div class="img">
                                            <img src="images/awards_4.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div class="box r">
                                        <div class="desc">
                                            <h3>Certified by ICRA</h3>
                                            <p>Certified by ICRA for highest Standards of Financial Practices and ethics</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="item">
                                <div class="aw">
                                    <div class="box l">
                                        <div class="img">
                                            <img src="images/awards_5.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div class="box r">
                                        <div class="desc">
                                            <h3>India’s Most Admired Brand (2016-17)</h3>
                                            <p>PLANETCAST chosen as India's most admired brand by White Page International, a global brand consulting firm. The recognition is a part of our continued efforts to create an environment of trust in the Television Broadcast Industry.</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                    </OwlCarousel>
                    </div>
                </div>
            </div>
            <div class="cont_area leadership" id="leadership">
                <div class="container">
                    <div class="h2_ttl">
                        <h2 class="h2"><span>Our Leadership</span></h2>
                    </div>
                    <div class="leading_box">
                        <div class="memb_list">
                            <ul>
                                <li>
                                    <div class="box">
                                        <a href="javascript:" class="img" onClick={()=>this.openNav('vyas')}>
                                            <img src="images/lead_vyas_sir.jpg" alt="" />
                                        </a>
                                        <div class="desc">
                                            <h4><a href="javascript:">Mahendra Nath Vyas</a></h4>
                                            <p>Executive Director, Planetcast Media Services Limited (PMSL)</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="box">
                                        <a href="javascript:" class="img" onClick={()=>this.openNav('lalit')}>
                                            <img src="images/lead_jain_sir.jpg" alt="" />
                                        </a>
                                        <div class="desc">
                                            <h4><a href="javascript:">Lalit Jain</a></h4>
                                            <p>Founder Member and Director, Planetcast Media Services Limited (PMSL)</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="box">
                                        <a href="javascript:" class="img" onClick={()=>this.openNav('duda')}>
                                            <img src="images/lead_duda_sir.jpg" alt="" />
                                        </a>
                                        <div class="desc">
                                            <h4><a href="javascript:">Sanjay Duda</a></h4>
                                            <p>Chief Operating Officer (COO) at Planetcast Media Services Limited (PMSL)</p>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="box">
                                        <a href="javascript:" class="img" onClick={()=>this.openNav('ry')}>
                                            <img src="images/lead_ry_sir.jpg" alt="" />
                                        </a>
                                        <div class="desc">
                                            <h4><a href="javascript:;">Rajesh Yadvendu</a></h4>
                                            <p>Chief Technical Officer (CTO) at Planetcast Media Services Limited (PMSL)</p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="box">
                                        <a href="javascript:" class="img" onClick={()=>this.openNav('pd')}>
                                            <img src="images/lead_pd_sir.jpg" alt="" />
                                        </a>
                                        <div class="desc">
                                            <h4><a href="javascript:">Parmanand Trivedi</a></h4>
                                            <p>Heading the Technology at Planetcast Media Services Limited (PMSL)</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix"></div>
        </section>

        <div id="about_us_owner" class="about_us_owner">
            <div class="about_owner_list">
              <a href="javascript:void(0)" class="closebtn_sell" onClick={()=>this.closeNav()}>&times;</a>
              {this.state.popup=="vyas" && <div class="box">
                <div class="img">
                  <img src="images/lead_vyas_sir.jpg" />
                </div>
                <h4>Mahendra Nath Vyas</h4>
                <p>Executive Director, Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Mahendra Nath Vyas, Executive Director at Planetcast Media Services Limited, comes with a rich experience of 41 years in Satellite Communication and Digital Media Technology. He began his career with the Indian Space Research Organization (ISRO) as a design engineer. During his stint with the ISRO, he had developed a sub-system for India’s first communication satellite transponder called APPLE, which got adapted in the current INSAT satellite.</p>
                  <p>Over the years, he has had associations with several defence SATCOM networks while he was at Bharat Electronics Limited, a Government of India owned aerospace and defence company. Mr Vyas is the mind behind Planetshare and he has been instrumental in guiding us through since the initial days of this platform.</p>
                  <p>He is responsible for making strategies and helping us understand technological transitions. He was on the Board of World Teleport Association from April 1, 2007, to March 31, 2013. He is a technology graduate with a specialization in microwave and satellite communication from the Indian Institute of Technology, Bombay and did Computer Architecture from the Indian Institute of Science, Bangalore.</p>
                </div>
              </div>}
              {this.state.popup=="lalit" && <div class="box">
                <div class="img">
                  <img src="images/lead_jain_sir.jpg" />
                </div>
                <h4>Lalit Jain</h4>
                <p>Founder Member and Director, Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Lalit Jain, the Founder Member and Whole Time Director of Planetcast Media Services Limited, enjoys a vast experience of around 40 years in multiple groups such as Modi Group, Birla Group, JK Group, Essel Group and Bhilwara Group. He has influenced various fields in his carrier including Media, Steel, Human Resource, Textiles, Cement, Technology, Finance, Legal, Administrative, General Management and corporate governance.</p>
                  <p>His leadership saw major improvements in varied sectors and companies, increasing productivity, setting up efficient operational systems, etc. He is an M.A, LLB and a fellow Member of the Institute of Cost Accountants of India.</p>
                </div>
              </div>}
              {this.state.popup=="duda" && <div class="box">
                <div class="img">
                  <img src="images/lead_duda_sir.jpg" />
                </div>
                <h4>Sanjay Duda</h4>
                <p>Chief Operating Officer (COO) at Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Sanjay Duda, Chief Operating Officer at Planetcast Media Services Limited, relishes an experience of 20 years in various capacities.</p>
                  <p>He has also made notable contributions in several fields such as Allocation/Management, Operation & Maintenance, Network Design, Project Planning & Implementation, IP Network Planning, Traffic & QoS Management, and Integration of Newsroom Projects.</p>
                </div>
              </div>}
              {this.state.popup=="ry" && <div class="box">
                <div class="img">
                  <img src="images/lead_ry_sir.jpg" />
                </div>
                <h4>Rajesh Yadvendu</h4>
                <p>Chief Technical Officer (CTO) at Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Rajesh Yadvendu, the CTO at Planetcast Media Services Limited, inspires all of us with 20 years of experience in Telecommunication based networks. Sir, has hand-on experience in RF Network, Frequency Allocation/Management, Operation & Maintenance, Network Design, and Planning & Project Implementation.</p>
                  <p>Fondly known as RY Sir among all of us here at PMSL, Mr Yadvendu has a range of accomplishments including:</p>
                  <ul class="bullet_list">
                      <li>
                          <p>RF Planning & Link Budget Calculations</p>
                      </li>
                      <li>
                          <p>Installation & Configuration of Telecom Systems/Equipment</p>
                      </li>
                      <li>
                          <p>Planning & Establishment of Broadband Internet Services on Red Hat 7.0 LINUX Platform</p>
                      </li>
                      <li>
                          <p>Developed complete Web-based servers & data traffic monitoring systems</p>
                      </li>
                      <li>
                          <p>IP Network planning, traffic & QoS Management</p>
                      </li>
                  </ul>
                </div>
              </div>}
              {this.state.popup=="pd" && <div class="box">
                <div class="img">
                  <img src="images/lead_pd_sir.jpg" />
                </div>
                <h4>Parmanand Trivedi</h4>
                <p>Heading the Technology at Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Parmanand Trivedi, who heads the technology at Planetcast Media Services Limited, comes with a rich experience of almost 20 years in the Software domain. From working with different top-class companies and managing several digital products to implementing innovative ideas and taking things to the next level, he has seen a plethora of concepts originating and reaching zenith in one form or the other.</p>
                  <p>Before joining us, he smoothly guided many projects with different companies to a level that seemed arduous at the beginning. </p>
                  <p>His able leadership and guidance has played a pivotal role in motivating us to take up the challenge day in and day out.</p>
                </div>
              </div>}
            </div>
            {/*<div class="about_owner_list">
              <a href="javascript:void(0)" class="closebtn_sell">&times;</a>
              {this.state.popup=="lalit" && <div class="box">
                <div class="img">
                  <img src="images/lead_jain_sir.jpg" />
                </div>
                <h4>Lalit Jain</h4>
                <p>Founder Member and Director, Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Lalit Jain, the Founder Member and Whole Time Director of Planetcast Media Services Limited, enjoys a vast experience of around 40 years in multiple groups such as Modi Group, Birla Group, JK Group, Essel Group and Bhilwara Group. He has influenced various fields in his carrier including Media, Steel, Human Resource, Textiles, Cement, Technology, Finance, Legal, Administrative, General Management and corporate governance.</p>
                  <p>His leadership saw major improvements in varied sectors and companies, increasing productivity, setting up efficient operational systems, etc. He is an M.A, LLB and a fellow Member of the Institute of Cost Accountants of India.</p>
                </div>
              </div>}
            </div>
            <div class="about_owner_list">
              <a href="javascript:void(0)" class="closebtn_sell">&times;</a>
              {this.state.popup=="duda" && <div class="box">
                <div class="img">
                  <img src="images/lead_duda_sir.jpg" />
                </div>
                <h4>Sanjay Duda</h4>
                <p>Chief Operating Officer (COO) at Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Sanjay Duda, Chief Operating Officer at Planetcast Media Services Limited, relishes an experience of 20 years in various capacities.</p>
                  <p>He has also made notable contributions in several fields such as Allocation/Management, Operation & Maintenance, Network Design, Project Planning & Implementation, IP Network Planning, Traffic & QoS Management, and Integration of Newsroom Projects.</p>
                </div>
              </div>}
            </div>
            <div class="about_owner_list">
              <a href="javascript:void(0)" class="closebtn_sell">&times;</a>
              {this.state.popup=="ry" && <div class="box">
                <div class="img">
                  <img src="images/lead_ry_sir.jpg" />
                </div>
                <h4>Rajesh Yadvendu</h4>
                <p>Chief Technical Officer (CTO) at Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Rajesh Yadvendu, the CTO at Planetcast Media Services Limited, inspires all of us with 20 years of experience in Telecommunication based networks. Sir, has hand-on experience in RF Network, Frequency Allocation/Management, Operation & Maintenance, Network Design, and Planning & Project Implementation.</p>
                  <p>Fondly known as RY Sir among all of us here at PMSL, Mr Yadvendu has a range of accomplishments including:</p>
                  <ul class="bullet_list">
                      <li>
                          <p>RF Planning & Link Budget Calculations</p>
                      </li>
                      <li>
                          <p>Installation & Configuration of Telecom Systems/Equipment</p>
                      </li>
                      <li>
                          <p>Planning & Establishment of Broadband Internet Services on Red Hat 7.0 LINUX Platform</p>
                      </li>
                      <li>
                          <p>Developed complete Web-based servers & data traffic monitoring systems</p>
                      </li>
                      <li>
                          <p>IP Network planning, traffic & QoS Management</p>
                      </li>
                  </ul>
                </div>
              </div>}
            </div>
            <div class="about_owner_list">
              <a href="javascript:void(0)" class="closebtn_sell">&times;</a>
              {this.state.popup=="pd" && <div class="box">
                <div class="img">
                  <img src="images/lead_pd_sir.jpg" />
                </div>
                <h4>Parmanand Trivedi</h4>
                <p>Heading the Technology at Planetcast Media Services Limited (PMSL)</p>
                <div class="desc">
                  <p>Parmanand Trivedi, who heads the technology at Planetcast Media Services Limited, comes with a rich experience of almost 20 years in the Software domain. From working with different top-class companies and managing several digital products to implementing innovative ideas and taking things to the next level, he has seen a plethora of concepts originating and reaching zenith in one form or the other.</p>
                  <p>Before joining us, he smoothly guided many projects with different companies to a level that seemed arduous at the beginning. </p>
                  <p>His able leadership and guidance has played a pivotal role in motivating us to take up the challenge day in and day out.</p>
                </div>
              </div>}
            </div>*/}
        </div>
    </div>)
  }
  else {
    return(<NotFound/>)
  }
}
}
export default Aboutus;
