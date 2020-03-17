import React,{useEffect} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import cogoToast from 'cogo-toast';
class Transcoding extends React.Component{
  componentDidMount(){

  }
  render()
  {
    return(
      <div class="top_div">
      <section class="ser_banner trans">
        <div class="container">
            <div class="caption">
                <h2>Video Media Processing</h2>
                <p>A cloud service for transcoding multimedia data into various output resolutions, bit rates, and formats for unhindered playback</p>
                <div class="buttons">
                    <a class="btndefault" href="javascript:" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Buy Now</a>
                    <Link class="btndefault" to="/web/contact_us">Contact Sales</Link>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
      </section>
      <section class="inner_cont trans_ser">
        <div class="trans_layout ovrv">
            <div class="container">
                <h2>Overview</h2>
                <div class="cont_part">
                    <p>Planetshare Cloud Media Processing is a cloud service for transcoding multimedia data. It provides a cost-effective, easy-to-use, elastic, and highly scalable method to convert audio and video into formats suitable for playing on PCs, TVs, and mobile interfaces. Media Processing was designed based on the needs of Planetshare Cloud users. In the past, users dedicated time and resources to purchase, build, and manage transcoding software and hardware, as well as perform sophisticated configuration optimization, transcode parameter adaptation, and other operations. Media Processing has changed all this by enhancing the elasticity of the cloud; this service provides transcoding capabilities to satisfy tomorrow's transcoding demands all while reducing wastes.</p>
                </div>
            </div>
        </div>
        <div class="trans_layout banefit">
            <div class="container">
                <h2>Benefits</h2>
                <div class="cont_bnft">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="box">
                                <div class="icon">
                                    <img src="images/trans_benefit_icon1.png" alt="" />
                                </div>
                                <h3>Ultra-Speed Transcoding</h3>
                                <p>Features multi-region deployment and dynamic on-demand scaling. Handles high-concurrency scenarios easily and ensures efficient transcoding.</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="box">
                                <div class="icon">
                                    <img src="images/trans_benefit_icon2.png" alt="" />
                                </div>
                                <h3>Digital Restoration Service</h3>
                                <p>Features the latest human visual system models and breaks average transcoding limits. This service can also be used to restore corrupted video files.</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="box">
                                <div class="icon">
                                    <img src="images/trans_benefit_icon3.png" alt="" />
                                </div>
                                <h3>NarrowBand HD</h3>
                                <p>NarrowBand HD and high efficiency video coding (HEVC) technology help you to save 20% to 30% more from the traffic costs than other competing technologies.</p>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="box">
                                <div class="icon">
                                    <img src="images/trans_benefit_icon4.png" alt="" />
                                </div>
                                <h3>Feature-rich, Highly Customizable</h3>
                                <p>The service provides video transcoding, snapshots, watermarks, video editing, splicing, and many other media transcoding capabilities that suit various scenarios.</p>
                                <p>In addition, it provides highly-scalable media transcoding templates and custom transcoding parameters to meet diverse transcoding needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="trans_layout fture">
            <div class="container">
                <h2>Features</h2>
                <div class="cont_fture">
                    <div class="card">
                        <h5 data-toggle="collapse" data-target="#media_transcoding" aria-expanded="true">
                            <div class="icon">
                                <img src="images/trans_fture_icon1.png" alt="" />
                                <img class="w" src="images/trans_fture_iconw1.png" alt="" />
                            </div>
                            Media Transcoding
                        </h5>
                        <div id="media_transcoding" class="collapse show">
                            <div class="card-body">
                                <p>Supports all major formats, and includes professional customizable transcoding services such as NarrowBand HD, double-speed transcoding and video encryption. Audio and Video Transcoding</p>
                                <h3>Audio and Video Transcoding</h3>
                                <p>Supports all mainstream formats, H.264 and H.265 codecs, multimedia container formats, and subtitles.</p>
                                <h3>Transcoding Templates</h3>
                                <p>Offers preset templates, smart templates, and custom templates to meet multiple needs.</p>
                                <h3>Workflows</h3>
                                <p>The console can be operated with GUI. Quickly builds an audio or video processing flow, and automatically triggers transcoding when the media file is uploaded.</p>
                                <h3>Watermarks</h3>
                                <p>Encodes an identifying image or text in the output video.</p>
                                <h3>Video Clipping and Stitching</h3>
                                <p>Allows you to specify a start time and a duration. You can merge multiple videos to create a single output.</p>
                                <h3>Audio or Video Extraction</h3>
                                <p>Allows you to separate and extract the audio or video from video files.</p>
                                <h3>NarrowBand HD</h3>
                                <p>Includes the latest narrowband HD transcoding technology, and allows you to save 20% to 30% bandwidth costs.</p>
                                <h3>Double-Speed Transcoding</h3>
                                <p>Applies to videos of 30 minutes in length or more. Encodes video fragments in parallel to make the transcoding speed 5 times quicker.</p>
                                <h3>Video Encryption</h3>
                                <p>Supports “Planetshare Cloud proprietary encryption”and “HLS-AES128 encryption”. Secures video content against downloading. This feature is useful for education and pay-per-view (PPV).</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h5 class="collapsed" data-toggle="collapse" data-target="#video_screenshot">
                            <div class="icon">
                                <img src="images/trans_fture_icon2.png" alt="" />
                                <img class="w" src="images/trans_fture_iconw2.png" alt="" />
                            </div>
                            Video Screenshots
                        </h5>
                        <div id="video_screenshot" class="collapse">
                            <div class="card-body">
                                <p>Captures screenshots of videos on OSS at a specified start time.</p>
                                <h3>Video Screenshots</h3>
                                <p>Captures JPEG screenshots of videos on OSS at a specified start time. Supports single screenshot, multiple screenshot, and average screenshot.</p>
                                <h3>Image Sprites</h3>
                                <p>Combines multiple images into a single image sprite. Using image sprites allows you to obtain multiple pictures through one request. This significantly reduces the number of server requests and improves client-side performance.</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h5 class="collapsed" data-toggle="collapse" data-target="#digital_restoration">
                            <div class="icon">
                                <img src="images/trans_fture_icon3.png" alt="" />
                                <img class="w" src="images/trans_fture_iconw3.png" alt="" />
                            </div>
                            Digital Restoration Service
                        </h5>
                        <div id="digital_restoration" class="collapse">
                            <div class="card-body">
                                <p>Makes existing content sources clearer and smoother, and provides an industry unique VIP viewing experience.</p>
                                <h3>High Frame Rate Conversion (FRC)</h3>
                                <p>Converts HD videos with 30 frames per second or lower into HD videos with up to 60 or 120 frames per second, without compromising the streaming quality even on a 4K screen.</p>
                                <h3>Picture Rescue (PicRescue)</h3>
                                <p>For online videos that have been overly-compressed, glitch and mosaic are removed to create restored versions with higher levels of clarity.</p>
                                <h3>SD to HD Conversion (SD to HD)</h3>
                                <p>For standard definition videos, video granules and compression noise are removed, and high-resolution is applied to create videos in 720p or 1080p.</p>
                                <h3>2K to 4K Conversion (2K to 4K)</h3>
                                <p>For 1080p clips, resolution technologies obtained from the study of a large number of videos are used to create high-quality 4K videos.</p>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <h5 class="collapsed" data-toggle="collapse" data-target="#video_editing">
                            <div class="icon">
                                <img src="images/trans_fture_icon4.png" alt="" />
                                <img class="w" src="images/trans_fture_iconw4.png" alt="" />
                            </div>
                            Video Editing
                        </h5>
                        <div id="video_editing" class="collapse">
                            <div class="card-body">
                                <p>You can use Cloud Clip APIs to easily create content.</p>
                                <h3>Cloud Clip APIs</h3>
                                <p>A series of functional APIs allow you to clip, stitch, mask, and integrate videos, and add banner text to your videos. You can use cloud-based video editing APIs to rapidly build an online platform for video editing and production. The system supports editing videos, audios, pictures, and texts.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="trans_layout cust_scn">
            <div class="container">
                <h2>Customer Senarios</h2>
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" data-toggle="tab" href="#vd_website">
                          <div class="icon">
                              <img src="images/icon_cust_scen_1.png" alt="" />
                          </div>
                          <div class="ttl">Video Websites</div>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#onl_educ">
                          <div class="icon">
                              <img src="images/icon_cust_scen_2.png" alt="" />
                          </div>
                          <div class="ttl">Online Education</div>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#tv_media">
                          <div class="icon">
                              <img src="images/icon_cust_scen_3.png" alt="" />
                          </div>
                          <div class="ttl">Television Media</div>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#ec_video">
                          <div class="icon">
                              <img src="images/icon_cust_scen_4.png" alt="" />
                          </div>
                          <div class="ttl">E-commerce Videos</div>
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" data-toggle="tab" href="#game_video">
                          <div class="icon">
                              <img src="images/icon_cust_scen_5.png" alt="" />
                          </div>
                          <div class="ttl">Game Videos</div>
                      </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div id="vd_website" class="container tab-pane active">
                        <div class="box_c">
                            <div class="box l">
                                <img src="images/cust_scen_img_1.png" alt="" />
                            </div>
                            <div class="box r">
                                <h3>Video Websites</h3>
                                <div class="para">
                                    <p><strong>Offers smooth and stable on-demand video services.</strong></p>
                                    <p>Provides a Video on Demand (VOD) service for business scenarios. Combines audio/video uploads, automated transcoding, media resource management, and accelerated delivery capabilities into a single all-in-one on-demand audio/video streaming solution. Helps customers to build secure and highly-customizable on-demand streaming platforms and applications.</p>
                                </div>
                                <div class="para_cont">
                                    <p class="t">View details of scenarios</p>
                                    <div class="para">
<p><strong>Highly Customizable Media Transcoding Service</strong></p>
                                        <p>Offers custom transcoding templates to convert media files to FLV/TS (M3U8)/MP4 files with different resolutions, bit rates, and frame rates.</p>
                                    </div>
                                    <div class="para">
<p><strong>Smart Analysis of Video Templates</strong></p>
                                        <p>Recommends the best smart transcoding template based on the analysis of video content.</p>
                                    </div>
                                    <div class="para">
<p><strong>Integrated Message Queue and Notification Service</strong></p>
                                        <p>Helps you to stay informed of the latest state of service execution.</p>
                                    </div>
                                </div>
                                <div class="para_cont nb">
                                    <p class="t">Integrations</p>
                                    <ul class="integ_list row">
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-arrows-alt"></i></div>
                                                CDN
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-cloud-upload"></i></div>
                                                OSS
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-commenting-o"></i></div>
                                                Message Service
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="onl_educ" class="container tab-pane fade">
                        <div class="box_c">
                            <div class="box l">
                                <img src="images/cust_scen_img_2.png" alt="" />
                            </div>
                            <div class="box r">
                                <h3>Online Education</h3>
                                <div class="para">
                                    <p><strong>Enables you to quickly build your own teaching platform.</strong></p>
                                    <p>Includes multiple rich video features to ensure the best viewing experience. Enables teachers to share course videos and manage educational resources from one platform.</p>
                                </div>
                                <div class="para_cont">
                                    <p class="t">Benefits</p>
                                    <div class="para">
<p><strong>Video Copyright Protection</strong></p>
                                        <p>A highly reliable OSS service and flexible anti-leeching and authentication features can ensure content security and protect your resources against hotlinking.</p>
                                    </div>
                                    <div class="para">
<p><strong>Brand Logo Promotion</strong></p>
                                        <p>Supports up to four static PNG images covering the output video.</p>
                                    </div>
                                    <div class="para">
<p><strong>Video Clipping and Video Stitching</strong></p>
                                        <p>You can specify a start time and a duration. You can stitch together multiple video or audio segments to create a single video file.</p>
                                    </div>
                                </div>
                                <div class="para_cont nb">
                                    <p class="t">Integrations</p>
                                    <ul class="integ_list row">
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-arrows-alt"></i></div>
                                                CDN
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-cloud-upload"></i></div>
                                                OSS
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-list-ul"></i></div>
                                                ECS
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-cubes"></i></div>
                                                RDS
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-share-alt"></i></div>
                                                SLB
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tv_media" class="container tab-pane fade">
                        <div class="box_c">
                            <div class="box l">
                                <img src="images/cust_scen_img_3.png" alt="" />
                            </div>
                            <div class="box r">
                                <h3>Television Media</h3>
                                <div class="para">
<p><strong>Supports the high-speed encoding of radio, video, and television.</strong></p>
                                    <p>Offers encoding services to meet the technological requirements of traditional radio, video and television formats, and ensures encoding efficiency. Provides rich optimization and improved video quality.</p>
                                </div>
                                <div class="para_cont">
                                    <p class="t">View details of scenarios</p>
                                    <div class="para">
<p><strong>Multiple Upload Methods</strong></p>
                                        <p>Offers multiple upload methods to meet different upload scenarios.</p>
                                    </div>
                                    <div class="para">
<p><strong>Scalable Transcoding</strong></p>
                                        <p>Uses a quick and stable parallel transcoding system to offer seamless and automatic scaling of transcoding tasks.</p>
                                    </div>
                                    <div class="para">
<p><strong>Playback on all Platforms</strong></p>
                                        <p>Provides Web players and playback SDKs for iOS and Android platforms.</p>
                                    </div>
                                </div>
                                <div class="para_cont nb">
                                    <p class="t">Integrations</p>
                                    <ul class="integ_list row">
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-cloud-upload"></i></div>
                                                OSS
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-arrows-alt"></i></div>
                                                CDN
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-commenting-o"></i></div>
                                                Message Service
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="ec_video" class="container tab-pane fade">
                        <div class="box_c">
                            <div class="box l">
                                <img src="images/cust_scen_img_4.png" alt="" />
                            </div>
                            <div class="box r">
                                <h3>E-commerce Videos</h3>
                                <div class="para">
                                    <p><strong>Offers video solutions for e-commerce content.</strong></p>
                                    <p>The video can visually describe product features in detail to attract more users. Suitable for product description videos, new product launches, video shopping guides, and auctions.</p>
                                </div>
                                <div class="para_cont">
                                    <p class="t">Scenarios</p>
                                    <div class="para">
<p><strong>Video Introduction of Products</strong></p>
                                        <p>Demonstrates on-premises products to exhibit the product information in an easy to understand method. This influences the decision-making of potential clients.</p>
                                    </div>
                                    <div class="para">
                                        <p><strong>The Seller’s Live Broadcast and the Buyer’s Unboxing Video</strong></p>
                                        <p>The seller demonstrates the product on site and the buyer demonstrates the product in the unboxing video. Trading becomes more visual and convenient.</p>
                                    </div>
                                    <div class="para">
<p><strong>Video Introduction of Products</strong></p>
                                        <p>In live broadcasts, stars and Internet celebrities demonstrate the product on their websites. This helps to boost the fan community of a product.</p>
                                    </div>
                                </div>
                                <div class="para_cont nb">
                                    <p class="t">Integrations</p>
                                    <ul class="integ_list row">
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-cloud-upload"></i></div>
                                                OSS
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-arrows-alt"></i></div>
                                                CDN
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-commenting-o"></i></div>
                                                Message Service
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="game_video" class="container tab-pane fade">
                        <div class="box_c">
                            <div class="box l">
                                <img src="images/cust_scen_img_5.png" alt="" />
                            </div>
                            <div class="box r">
                                <h3>Game Videos</h3>
                                <div class="para">
                                    <p><strong>Rapidly builds a complete release platform for game videos.</strong></p>
                                    <p>Users can rapidly build a complete release platform for game videos. Offers complete video services to game portals.</p>
                                </div>
                                <div class="para_cont">
                                    <p class="t">Benefits</p>
                                    <div class="para">
<p><strong>Supports the transition of live video to on-demand video.</strong></p>
                                        <p>Live scenes can be recorded in real-time and connected to on-demand platforms. Provides complete video recording and Time Shift services.</p>
                                    </div>
                                    <div class="para">
<p><strong>Fast Access</strong></p>
                                        <p>Connects quickly to the existing media systems and content management systems using APIs.</p>
                                    </div>
                                    <div class="para">
<p><strong>Cost Effectiveness</strong></p>
                                        <p>NarrowBand HD technology helps you to save 30% traffic costs.</p>
                                    </div>
                                </div>
                                <div class="para_cont nb">
                                    <p class="t">Integrations</p>
                                    <ul class="integ_list row">
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-arrows-alt"></i></div>
                                                CDN
                                            </a>
                                        </li>
                                        <li class="col-md-6 col-sm-6">
                                            <a href="javascript:">
                                                <div class="icon"><i class="fa fa-cloud-upload"></i></div>
                                                OSS
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="trans_layout cust_scn">
            <div class="container">
                <h2>Upgraded Support For You <span>1 on 1 Presale Consultation, 24/7 Technical Support, Faster Response, and More Tickets.</span></h2>
                <ul class="upgrd_sup_l row">
                    <li class="col-md-3 col-sm-4">
                        <div class="box">
                            <div class="icon">
                                <img src="images/icon_upgrd_sup_1.png" alt="" />
                            </div>
                            <h3>1 on 1 Presale Consultation</h3>
                            <p>Consulting by experienced cloud experts.</p>
                        </div>
                    </li>
                    <li class="col-md-3 col-sm-4">
                        <div class="box">
                            <div class="icon">
                                <img src="images/icon_upgrd_sup_2.png" alt="" />
                            </div>
                            <h3>24/7 Technical Support</h3>
                            <p>Extended service time from 10 hours 5 days a week to 24/7. </p>
                        </div>
                    </li>
                    <li class="col-md-3 col-sm-4">
                        <div class="box">
                            <div class="icon">
                                <img src="images/icon_upgrd_sup_3.png" alt="" />
                            </div>
                            <h3>6 Free Tickets per Quarter</h3>
                            <p>The number of free tickets doubled from 3 to 6 per quarter.</p>
                        </div>
                    </li>
                    <li class="col-md-3 col-sm-4">
                        <div class="box">
                            <div class="icon">
                                <img src="images/icon_upgrd_sup_4.png" alt="" />
                            </div>
                            <h3>Faster Response</h3>
                            <p>Shorten after-sale response time from 36 hours to 18 hours.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="trans_layout pric">
            <div class="container">
                <h2>Video for Media Processing Pricing</h2>
                <p>Price calculation formula: Transcoding fee = Output file duration x Transcoding unit price</p>
                <p>Output duration: For each output file, fees are calculated by minute, with durations precise to two decimal places and the second decimal place rounded up if the third decimal place is 5 or larger. Videos of less than 1 second are counted as 0.02 minutes.</p>
                <form action="javascript:">
                    <div class="inputbox">
                        <label><i class="fa fa-map-marker" aria-hidden="true"></i> Region</label>
                        <select>
                            <option>Japan</option>
                            <option>Mumbai</option>
                            <option>Hong Kong</option>
                            <option>Singapur</option>
                        </select>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <td>Output Specification</td>
                                    <td>Pay-As-You-Go (USD/Minute)</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>H.264 4K (3840 x 2160)</td>
                                    <td>0.05</td>
                                </tr>
                                <tr>
                                    <td>H.264 2K (2560 x1440)</td>
                                    <td>0.0375</td>
                                </tr>
                                <tr>
                                    <td>H.264 HD (1920 x 1080)</td>
                                    <td>0.025</td>
                                </tr>
                                <tr>
                                    <td>H.264 SD (1280 x 720)</td>
                                    <td>0.0125</td>
                                </tr>
                                <tr>
                                    <td>H.264 LD (640 x 480)</td>
                                    <td>0.0094</td>
                                </tr>
                                <tr>
                                    <td>COPY</td>
                                    <td>0.0021</td>
                                </tr>
                                <tr>
                                    <td>Audio</td>
                                    <td>0.0031</td>
                                </tr>
                                <tr>
                                    <td>H.265 4K (3840 x 2160)</td>
                                    <td>0.25</td>
                                </tr>
                                <tr>
                                    <td>H.264 4K (3840 x 2160)</td>
                                    <td>0.05</td>
                                </tr>
                                <tr>
                                    <td>H.265 2K (2560 x 1440)</td>
                                    <td>0.1875</td>
                                </tr>
                                <tr>
                                    <td>H.265 HD (1920 x 1080)</td>
                                    <td>0.125</td>
                                </tr>
                                <tr>
                                    <td>H.265 SD (1280 x 720)</td>
                                    <td>0.0625</td>
                                </tr>
                                <tr>
                                    <td>H.265 LD (640 x 480)</td>
                                    <td>0.0469</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <div class="cont">
                    <p>Description:</p>
                    <p>1. The output specification is determined by the long and short sides of the output video resolution. For example, output video resolutions where the horizontal side does not exceed 1280 and the vertical side does not exceed 720 are regarded as the SD (1280 x 720) specification. If the horizontal side of the output video exceeds 1280 or the vertical side exceeds 720, this video provides a higher specification.</p>
                    <p>2. Above price is for normal transcoding, the price of narrowband HD 1.0 is triple the normal price.</p>
                </div>
                <div class="cont">
                    <p>Considerations</p>
                    <p>1. Service suspension mechanism</p>
                    <p>When your current account balance is insufficient, Planetshare Cloud will suspend your service within 15 days. After service is suspended, you cannot submit any new tasks, and Planetshare does not provide Media Processing for tasks you have already submitted for execution. However, tasks that are currently in the state of transcoding will continue until they are complete. If you top up your account within 15 days (360 hours (15 x 24) from the time of account suspension), your suspended Media Processing service is restored and can continue to use the service. After 15 days, tasks you have submitted for execution are released, and your data cannot be recovered.</p>
                    <p>2. Other considerations</p>
                    <p>Transcoding resources are allocated through mutually independent pipelines. A single transcoding resource can only process one task at a time. Media Processing supports shared transcoding resources, and each user is given a quota of such resources. The maximum number of tasks simultaneously processed for a single user cannot exceed the quota. When the system is busy, the number of jobs simultaneously processed may be less than the quota of the shared transcoding resources.</p>
                </div>
            </div>
        </div>
        <div class="trans_layout banefit">
            <div class="container">
                <div class="gud_res_lnks row">
                    <div class="box col-md-4">
                        <a href="javascript:">
                            <span class="ttl">Quickstart Guide</span>
                            <span class="txt">Video for Media Processing getting started guide</span>
                        </a>
                    </div>
                    <div class="box col-md-4">
                        <a href="javascript:">
                            <span class="ttl">Resources</span>
                            <span class="txt">API & SDKs for developers</span>
                        </a>
                    </div>
                    <div class="box col-md-4">
                        <a href="javascript:">
                            <span class="ttl">Products</span>
                            <span class="txt">See more Planetshare</span>
                        </a>
                    </div>
                </div>
                <div class="buttons">

              {/*  <button type="button" class="btndefault" onClick={()=>cogoToast.error('Will Be Available By End Of This Month',{position:'bottom-center'})}>Get Started for Free</button>*/}
                    <button type="button" class="btndefault" onClick={()=>this.props.history.push('/web/services/transcoding/upload')}>Get Started for Free</button>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
      </section>
      </div>
    )
}
}
export default Transcoding;
