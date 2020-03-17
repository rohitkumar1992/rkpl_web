import React from 'react';
import {Link} from 'react-router-dom';
import cogoToast from 'cogo-toast';
function Footer()
{
  return(
    <footer class="h_footer">
        <article class="f_top">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="box">
                            <h5>Categories</h5>
                            <ul class="links">
                                <li><Link to="/web/videocategorydata/business/3">Business</Link></li>
                                <li><Link to="/web/videocategorydata/fashion/4">Fashion</Link></li>
                                <li><Link to="/web/videocategorydata/holiday/5">Holidays</Link></li>
                                <li><Link to="/web/videocategorydata/science/6">Science</Link></li>
                                <li><Link to="/web/videocategorydata/sports/7">Sports</Link></li>
                                <li>
                                  <a href="#more_links" data-toggle="collapse">More <i class="fa fa-angle-down"></i></a>
                                  <ul class="collapse" id="more_links">
                                    <li><Link to="/web/videocategorydata/wildlife/8">- Wildlife</Link></li>
                                    <li><Link to="/web/videocategorydata/snowfall/12">- Snowfall</Link></li>
                                    <li><Link to="/web/videocategorydata/travels/14">- Travel</Link></li>
                                    <li><Link to="/web/videocategorydata/city/19">- City</Link></li>
                                  </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box">
                            <h5>About</h5>
                            <ul class="links">
                                <li><Link to="/web/aboutus/overview">Overview</Link></li>
                                <li><Link to="/web/aboutus/leadership">Leadership</Link></li>
                                <li><Link to="/web/aboutus/awards">Awards and Achievements</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box">
                            <h5>Support & Solutions</h5>
                            <ul class="links">
                                <li><Link to="/web/sell_on_planetshare">Selling on Planetshare</Link></li>
                                <li><Link to="/web/buy_on_planetshare">Buying on Planetshare</Link></li>
                                <li><Link to="/web/partner_with_us">Partner with Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box">
                            <h5>Other</h5>
                            <ul class="links">
                                <li><Link to="/web/term_condition">Terms & Conditions</Link></li>
                                <li><Link to="/web/privacy_policy">Privacy Policy</Link></li>
                                <li><Link to="/web/contact_us">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col">
                        <div class="box">
                            <h5>Services</h5>
                            <ul class="links">
                                <li><Link to="/web/services/transcoding">Transcoding</Link></li>
                                <li><Link to="/web/services/dubbing">Dubbing</Link></li>
                                <li><a href="javascript:;" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>Automatic Tagging</a></li>
                                <li><a href="javascript:;" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>Subtitling</a></li>
                                <li><a href="javascript:;" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>Archiving</a></li>
                                <li><a href="javascript:;" onClick={()=>cogoToast.error('Coming Soon',{position:'bottom-center'})}>Streaming</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <article class="f_bot">
            <div class="container">
                <div class="row">
                    <div class="col col-md-6">
                        <div class="box">
                            <div class="f_logo">
                                <Link to="/"><img src="images/logo.png" alt="" /></Link>
                            </div>
                            <div class="copy">
                                <p>© 2019 COPYRIGHT @ PLANETCAST ALL RIGHTS RESERVED.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col col-md-6">
                        <div class="box r">
                            <ul class="foot_social">
                                <li>
                                    <a href="https://www.facebook.com/Planetshare/" target="_blank"><i class="fa fa-facebook"></i></a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/Planetshare_" target="_blank"><i class="fa fa-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="   https://www.linkedin.com/company/planetshare" target="_blank"><i class="fa fa-linkedin"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.youtube.com/channel/UC3WZWabEFmWwwkZtwGoRfVA" target="_blank"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
                                </li>
                            </ul>

                            <div class="p_apps">
                              <ul>
                                  <li>
                                      <a href="javascript:" class="btn btn_gp"></a>
                                  </li>
                                  <li>
                                      <a href="javascript:" class="btn btn_ap"></a>
                                  </li>
                              </ul>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <div class="clearfix"></div>
    </footer>
  );
}
export default Footer;
