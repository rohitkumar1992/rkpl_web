import React,{useEffect} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import cogoToast from 'cogo-toast';
import $ from 'jquery'
const responsive={
  320:{items:1},
  480:{items:1},
  600:{items:1},
  960:{items:1},
  1200:{items:1}
  }
class Dubbing extends React.Component{
  componentDidMount(){

  }
  render()
  {
    return(
      <div class="top_div">
        <section class="ser_banner">
            <div class="container">
                <div class="cont_area">
                    <h2>Voice Over <span><i class="fa fa-headphones"></i> Dubbing</span></h2>
                    <p class="txt">Services overview</p>
                    <ul>
                        <li>
                            <a href="javascript:" class="wow zoomIn">
                                <div class="img">
                                    <img src="images/Voice.png" alt="" />
                                </div>
                            </a>
                            <div class="desc">
                                <h3>Voices</h3>
                                <div class="brdr"><span><i class="fa fa-angle-down"></i></span></div>
                                <p>Hire your favourite Voice Talents</p>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:" class="wow zoomIn">
                                <div class="img">
                                    <img src="images/quote.png" alt="" />
                                </div>
                            </a>
                            <div class="desc">
                                <h3>Quote</h3>
                                <div class="brdr"><span><i class="fa fa-angle-down"></i></span></div>
                                <p>Tell us about your project</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="clearfix"></div>
        </section>
        <section class="inner_cont ser">
            <div class="voice_list_box">
                <div class="vc_cont_box vc_main">
                    <div class="container">
                        <div class="cont_area">
                            <div class="vc_def">
                                <span><img src="images/icon_voice.png" alt="" /></span>
                            </div>
                            <h2 class="wow fadeInUp">Voice-Over and <span>Dubbing Services</span></h2>
                            <div class="cont_desc">
                                <div class="box l">
                                    <div class="desc">
                                        <p>With over <b>1,500 native talents in 80 languages and dialects</b>, we surely have the right tone of voice for your project. We offer <b>different solutions for your foreign voice-over needs</b> depending on your budget and requirements.</p>
                                        <ul class="icon_lst">
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_nontime.png" alt="" />
                                                    <b>Non-Timed</b> Voices
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_dubbing.png" alt="" />
                                                    <b>Dubbing</b>
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_tts.png" alt="" />
                                                    <b>TTS</b> Synthetic Voices
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="box r">
                                    <div class="vc_vd_box">
                                        <video id="seller_profile" controls="">
                                            <source src="images/video/website_demo.mp4" type="video/mp4" />
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vc_cont_box vc_nma">
                    <div class="container">
                        <div class="cont_area">
                            <div class="cont_desc">
                                <div class="box l">
                                    <div class="desc">
                                        <h2>Non-Timed <span>Audio</span></h2>
                                        <OwlCarousel
                                           className="ttl_slider owl-carousel"
                                           items={1}
                                           nav={false}
                                           loop={true}
                                           mouseDrag={true}
                                           dots={true}
                                           autoplay={true}
                                           autoplayTimeout={2000}
                                           smartSpeed={500}
                                           margin={0}
                                           navigation={true}
                                           navText={["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}
                                          responsive={responsive}
                                           >
                                            <div class="item">
                                                <h2><span>A growing pool of</span> 1,500 native and professional voice artists</h2>
                                            </div>
                                            <div class="item">
                                                <h2><span>Covering more than</span> 80 languages and dialects</h2>
                                            </div>
                                            <div class="item">
                                                <h2><span>Quality control at every stage</span> to ensure flawless recordings</h2>
                                            </div>
                                            <div class="item">
                                                <h2><span>Sessions conducted by</span> native sound engineers and artistic directors</h2>
                                            </div>
                                            <div class="item">
                                                <h2><span>Recordings in</span> sound-proofed studios <span>with</span> Neumann mics & ProTools HD</h2>
                                            </div>
                                            <div class="item">
                                                <h2><span>We process and deliver</span> any audio format and compression specs</h2>
                                            </div>
                                        </OwlCarousel>
                                        <p>If you have a text, a script, tutorial, presentation, advertisement etc and you just need a <b>good professional native voice</b> to make it alive and get the message across, just send us the lines. <b>We cover most languages and ensure a quick turnaround at cost-effective rates.</b></p>
                                        <p><b>We produce quality-checked spoken audio</b> without time constraints at a throughput rate of 15 audio minutes per studio hour, including recording, monitoring and post-production.</p>
                                        <div class="buttons">
                                            <a href="javascript:" class="btndefault">Read More <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="box r">
                                    <div class="vc_img_box">
                                        <img src="images/vc_img_nontimedaudio.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vc_cont_box vc_dub">
                    <div class="container">
                        <div class="cont_area">
                            <div class="cont_desc drl">
                                <div class="box l">
                                    <div class="desc">
                                        <h2>Dubbings <span></span></h2>
                                        <p>Everytime there is a video or an animation and you want to deliver the audio in a foreign language, you need to dubb.</p>
                                        <p><b>Dubbing is the process of replacing the original speech or dialogue with the translated spoken audio.</b> At PrimeVoices we distinguish 4 kinds of voice-over dubbings.</p>
                                        <ul class="icon_lst">
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_timed.png" alt="" />
                                                    <b>Timed</b> Audio
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_unvoice.png" alt="" />
                                                    <b>UN Voice -</b> Over
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_phrase.png" alt="" />
                                                    <b>Phrase -</b> Synch
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    <img src="images/vc_icon_lip.png" alt="" />
                                                    <b>Lip -</b> Synch
                                                </p>
                                            </li>
                                        </ul>
                                        <div class="buttons">
                                            <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}><i class="fa fa-cogs"></i> Check out our tools for Phrase and Lip-Synch <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="box r">
                                  <OwlCarousel
                                     className="vc_dub_slider owl-carousel"
                                     items={1}
                                     nav={false}
                                     loop={true}
                                     mouseDrag={true}
                                     dots={false}
                                     autoplay={true}
                                     autoplayTimeout={2000}
                                     animateOut={"fadeOut"}
                                     animateIn={"fadeIn"}
                                     smartSpeed={500}
                                     margin={0}
                                     navigation={false}
                                     navText={["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]}
                                    responsive={responsive}
                                     >
                                        <div class="item">
                                            <img src="images/vc_dubbing_slide1.jpg" alt="" />
                                        </div>
                                        <div class="item">
                                            <img src="images/vc_dubbing_slide2.jpg" alt="" />
                                        </div>
                                        <div class="item">
                                            <img src="images/vc_dubbing_slide3.jpg" alt="" />
                                        </div>
                                        <div class="item">
                                            <img src="images/vc_dubbing_slide4.jpg" alt="" />
                                        </div>
                                    </OwlCarousel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vcvd_list_box">
                <div class="container">
                    <div class="vc_cont_box vcvd">
                        <div class="cont_area">
                            <div class="cont_desc drl">
                                <div class="box l">
                                    <div class="desc">
                                        <h2 class="w_head_icon">
                                            <div class="img">
                                                <img src="images/vc_img_timedaudio.png" alt="" />
                                            </div>
                                            <div class="h_desc">
                                                Timed <span>Audio</span>
                                            </div>
                                        </h2>
                                        <p>Also known as off-camera or straight read, timed audio is a voice-over used when there are no "talking heads" in the video and pure narration is required.</p>
                                        <p><b>The audio should match each segment of the video, pictures, animation or titles</b>, therefore the translated script should respect the timings of those elements. It takes one studio hour to record and post-produce 20 minutes of timed audio.</p>
                                        <div class="buttons quote">
                                            <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Quote <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="box r">
                                    <div class="vc_video">
                                        <video controls>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578567226/partner1_gdxjdn.mp4" type="video/mp4"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631250/partner1_ykhibp.ogv" type="video/ogv"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631650/partner1_r1cuqt.webm" type="video/webm"/>
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider"><img src="images/icon_boxshadow.png" alt="" /></div>

                    <div class="vc_cont_box vcvd">
                        <div class="cont_area">
                            <div class="cont_desc">
                                <div class="box l">
                                    <div class="desc">
                                        <h2 class="w_head_icon">
                                            <div class="img">
                                                <img src="images/vc_img_unvoiceover.png" alt="" />
                                            </div>
                                            <div class="h_desc">
                                                UN Voice-<span>Over</span>
                                            </div>
                                        </h2>
                                        <p><b>It's used for radio and TV reports, news and documentaries especially for interviews.</b> The voice onscreen speaks in his or her native language for up to 3 seconds , then the speech fades out and the translating voice takes over. The native language is still heard on the background, keeping both the authenticity and emotions of the original speaker. It takes one studio hour to record and post-produce 15 minutes of UN Voice-Over.</p>
                                        <div class="buttons quote">
                                            <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Quote <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="box r">
                                    <div class="vc_video">
                                        <video controls>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578567226/partner1_gdxjdn.mp4" type="video/mp4"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631250/partner1_ykhibp.ogv" type="video/ogv"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631650/partner1_r1cuqt.webm" type="video/webm"/>
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider"><img src="images/icon_boxshadow.png" alt="" /></div>

                    <div class="vc_cont_box vcvd">
                        <div class="cont_area">
                            <div class="cont_desc drl">
                                <div class="box l">
                                    <div class="desc">
                                        <h2 class="w_head_icon">
                                            <div class="img">
                                                <img src="images/vc_img_phrase.png" alt="" />
                                            </div>
                                            <div class="h_desc">
                                                Phrase <span>Synch</span>
                                            </div>
                                        </h2>
                                        <p>Close attention is still made to the original timing of the piece but there is no focus on mirroring lip movement of the characters onscreen. The original voice is muted and replaced by the foreign voice, who starts and ends his or her speech at the same time as the character.<b>For a successful phrase-synch, translated dialogue lines should be as long as the original script, to allow that timing match.</b> It's used in e-learning, tutorials and corporate presentations. It takes one studio hour to record and post-produce 10 minutes of phrase-synch</p>
                                        <div class="buttons quote">
                                            <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Quote <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="box r">
                                    <div class="vc_video">
                                        <video controls>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578567226/partner1_gdxjdn.mp4" type="video/mp4"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631250/partner1_ykhibp.ogv" type="video/ogv"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631650/partner1_r1cuqt.webm" type="video/webm"/>
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="divider"><img src="images/icon_boxshadow.png" alt="" /></div>

                    <div class="vc_cont_box vcvd">
                        <div class="cont_area">
                            <div class="cont_desc">
                                <div class="box l">
                                    <div class="desc">
                                        <h2 class="w_head_icon">
                                            <div class="img">
                                                <img src="images/vc_img_lip.png" alt="" />
                                            </div>
                                            <div class="h_desc">
                                                Lip-<span>Synch</span>
                                            </div>
                                        </h2>
                                        <p>The translating voice-over artist matches the speed, tone and personality of the original character so that the two synch together. <b>The result is that the onscreen person looks as if he was originally speaking that language.</b> This requires a time consuming process of adapting the translation both to the length of the original phrases and the lip movements of the onscreen character. This technique is used in the movies as it requires an important budget. If the script is duly adapted for lip-synch it takes one studio hour to record and post-produce 5 minutes of lip-synch.</p>
                                        <div class="buttons quote">
                                            <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Quote <i class="fa fa-angle-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="box r">
                                    <div class="vc_video">
                                        <video controls>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578567226/partner1_gdxjdn.mp4" type="video/mp4"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631250/partner1_ykhibp.ogv" type="video/ogv"/>
                                            <source src="https://res.cloudinary.com/deyonsykf/video/upload/v1578631650/partner1_r1cuqt.webm" type="video/webm"/>
                                        </video>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tts_sync_box">
                <div class="container">
                    <div class="offer_tag">
                        <img src="images/icon_vc_tag.png" alt="" />
                    </div>
                    <div class="cont_box">
                        <div class="img">
                            <img src="images/icon_img_tts_sync.png" alt="" />
                        </div>
                        <div class="icon">
                            <img src="images/icon_tts_sync.png" alt="" />
                        </div>
                        <div class="desc">
                            <h2>TTS <span>Synthetic Voices</span></h2>
                            <p>The new frontier of human-sounding audio is called Text to Speech or TTS, where computers can provide a synthetic voice perfectly understandable but lacking prosody and emotion. However TTS can be a <b>cost-effective solution for short messages on the fields of IVR telephony, software, audio prompts</b> for impaired as well as warnings and disclaimers.</p>
                            <div class="buttons quote">
                                <a href="javascript:" class="btndefault">Read more <i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vc_subt_box">
                <div class="container">
                    <div class="subt_area">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="box l wow zoomIn">
                                    <img src="images/icon_vc_img_subt.png" alt="" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="box r wow fadeInUp">
                                    <h2>Do you need <br></br>subtitling?</h2>
                                    <p>Check out our <b>Multimedia services</b></p>
                                    <div class="buttons">
                                        <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Go to Subtitling <i class="fa fa-angle-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="work_flow_box">
                <div class="container">
                    <div class="work_top_cont">
                        <div class="box l">
                            <div class="img">
                                <img src="images/vc_workflow_round.png" alt="" />
                                <a href="javascript:" class="flow_l1 wow bounceIn" data-toggle="tooltip" title="Tell us what you need">
                                    <img src="images/icon_workflow_link1.png" alt="" />
                                </a>
                                <a href="javascript:" class="flow_l2 wow bounceIn" data-wow-delay="0.3s" data-toggle="tooltip" title="We provide a quote and a delivery date">
                                    <img src="images/icon_workflow_link2.png" alt="" />
                                </a>
                                <a href="javascript:" class="flow_l3 wow bounceIn" data-wow-delay="0.5s" data-toggle="tooltip" title="You order, we book talents, & studio">
                                    <img src="images/icon_workflow_link3.png" alt="" />
                                </a>
                                <a href="javascript:" class="flow_l4 wow bounceIn" data-wow-delay="0.7s" data-toggle="tooltip" title="We record and post-produce">
                                    <img src="images/icon_workflow_link4.png" alt="" />
                                </a>
                                <a href="javascript:" class="flow_l5 wow bounceIn" data-wow-delay="0.9s" data-toggle="tooltip" title="We deliver">
                                    <img src="images/icon_workflow_link5.png" alt="" />
                                </a>
                                <a href="javascript:" class="flow_l6 wow bounceIn" data-wow-delay="1.1s" data-toggle="tooltip" title="You pay">
                                    <img src="images/icon_workflow_link6.png" alt="" />
                                </a>
                                <a href="javascript:" class="flow_l7 wow bounceIn" data-wow-delay="1.3s" data-toggle="tooltip" title="We welcome your feedback">
                                    <img src="images/icon_workflow_link7.png" alt="" />
                                </a>
                            </div>
                        </div>
                        <div class="box r">
                            <div class="desc">
                                <h2>Workflow</h2>
                                <h3>How we handle <span>your project</span></h3>
                                <p>From the choice of the right voices to final delivery of files, we apply the greatest possible care to follow in detail and full confidentiality our client’s guidelines.</p>
                                <div class="buttons">
                                    <a href="javascript:" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}><i class="fa fa-angle-down"></i> Here is a step by step guide on a typical project process...</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="work_flow_steps">
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow1" data-toggle="collapse">
                                    <span><b>Tell us</b> what you need</span>
                                    <img src="images/icon_workflow_link1.png" alt="" />
                                </a>
                            </div>
                            <div id="flow1" class="step_cont collapse show">
                                <ul>
                                    <li>
                                        <p>Click on <b>quote</b> to let us know your project details</p>
                                    </li>
                                    <li>
                                        <p>Pick the <b>language/s</b> you need for your audio</p>
                                    </li>
                                    <li>
                                        <p>Provide your <b>voice talent preferences:</b> age, voice tone, etc.</p>
                                        <p>Or choose the voice by clicking on <b>casting</b></p>
                                    </li>
                                    <li>
                                        <p>Tell us your <b>production specs:</b> media, script extension (words or minutes), edition details, is it non-timed or timed audio, etc</p>
                                    </li>
                                    <li>
                                        <p>Let us know your <b>company details</b> so that we can contact you</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow2" data-toggle="collapse">
                                    <span><b>We provide</b> a quote and a delivery date</span>
                                    <img src="images/icon_workflow_link2.png" alt="" />
                                </a>
                            </div>
                            <div id="flow2" class="step_cont collapse">
                                <ul>
                                    <li>
                                        <p>We address to you by e‑mail a <b>quote</b> outlining the prices for the requested services</p>
                                    </li>
                                    <li>
                                        <p>We provide a <b>turnaround</b> time in business days</p>
                                    </li>
                                    <li>
                                        <p>We assign the chosen and available <b>voices/languages</b> for your project</p>
                                    </li>
                                    <li>
                                        <p>We specify <b>terms & conditions</b></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow3" data-toggle="collapse">
                                    <span><b>You order,</b> we book talents, & studio</span>
                                    <img src="images/icon_workflow_link3.png" alt="" />
                                </a>
                            </div>
                            <div id="flow3" class="step_cont collapse">
                                <ul>
                                    <li>
                                        <p>You <b>order</b> by signing our quote or write an  e-mail approving it</p>
                                    </li>
                                    <li>
                                        <p>You provide the <b>script</b> with instructions and pronunciation guidelines (jargon, brand names, etc)</p>
                                    </li>
                                    <li>
                                        <p>If you order timed audio, send us your <b>video</b> or animation</p>
                                    </li>
                                    <li>
                                        <p>We <b>book</b> the chosen / available voice talents and the studio</p>
                                    </li>
                                    <li>
                                        <p>We let you know a <b>schedule</b> for the recording</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow4" data-toggle="collapse">
                                    <span><b>We record</b> and post-produce</span>
                                    <img src="images/icon_workflow_link4.png" alt="" />
                                </a>
                            </div>
                            <div id="flow4" class="step_cont collapse">
                                <ul>
                                    <li>
                                        <p>You provide the <b>script</b> with instructions and pronunciation guidelines (jargon, brand names, etc)</p>
                                    </li>
                                    <li>
                                        <p>If you ordered timed audio, send us the <b>video</b> or animation</p>
                                    </li>
                                    <li>
                                        <p>We <b>record</b> the voices in our studios</p>
                                    </li>
                                    <li>
                                        <p>We <b>direct</b> the talents. You can also do it through video/audio conference (Skype)</p>
                                    </li>
                                    <li>
                                        <p>We monitor, clean and <b>edit</b> following your requirements</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow5" data-toggle="collapse">
                                    <span><b>We deliver</b></span>
                                    <img src="images/icon_workflow_link5.png" alt="" />
                                </a>
                            </div>
                            <div id="flow5" class="step_cont collapse">
                                <ul>
                                    <li>
                                        <p>We send you the <b>audio</b> files or the <b>video</b> with the integrated foreign audio track</p>
                                    </li>
                                    <li>
                                        <p>You will receive a <b>link</b> which will allow you to listen to the recordings in <b>preview</b> mode</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow6" data-toggle="collapse">
                                    <span><b>You pay</b></span>
                                    <img src="images/icon_workflow_link6.png" alt="" />
                                </a>
                            </div>
                            <div id="flow6" class="step_cont collapse">
                                <ul>
                                    <li>
                                        <p>If you like the recording, you click on the secure <b>payment</b> page</p>
                                    </li>
                                    <li>
                                        <p>You can choose Mastercard or VISA</p>
                                    </li>
                                    <li>
                                        <p>You will receive a link to <b>download</b> the master audio / video</p>
                                    </li>
                                    <li>
                                        <p>We also accept PayPal and Wire Transfer</p>
                                    </li>
                                    <li>
                                        <p>We will send you an <b>invoice</b></p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="step_box">
                            <div class="step_head">
                                <a href="#flow7" data-toggle="collapse">
                                    <span><b>We welcome</b> your feedback</span>
                                    <img src="images/icon_workflow_link7.png" alt="" />
                                </a>
                            </div>
                            <div id="flow7" class="step_cont collapse">
                                <ul>
                                    <li>
                                        <p>We appreciate your comments and remarks</p>
                                    </li>
                                    <li>
                                        <p>We stand by for eventual <b>retakes, pick-ups, add-ons,</b> etc</p>
                                    </li>
                                    <li>
                                        <p>We keep your <b>files</b> and <b>scripts</b> for 3 months</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="clearfix"></div>
        </section>
      </div>
    )
}
}
export default Dubbing;
