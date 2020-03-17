import React,{useEffect} from 'react';
import $ from 'jquery'
const PrivacyPolicy=()=>{
  useEffect(()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            $(".scrollTo").on('click', function(e) {
                 e.preventDefault();
                 var target = $(this).attr('href');
                 $('html, body').animate({
                   scrollTop: ($(target).offset().top-90)
                 }, 500);
              });
              $(window).scroll(function() {
                  var height = $(window).scrollTop();
                  if (height > 100) {
                      $('#back2Top').fadeIn();
                  } else {
                      $('#back2Top').fadeOut();
                  }
              });
              $(document).ready(function() {
                  $("#back2Top").click(function(event) {
                      event.preventDefault();
                      $("html, body").animate({ scrollTop: 0 }, "slow");
                      return false;
                  });

              });
  })
  return(    <section class="inner_cont terms_ser priv_poli">
        <div class="container">
            <div class="terms_box">
                <div class="box">
                    <h2>Privacy Policy</h2>
                    <div class="top_desc">
                        <p></p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="introduction">
                        <h3>Introduction</h3>
                        <p class="t">This is Planetshare's Privacy Policy page. Planetshare is a trademark of Planetcast Media Services Limited (formerly known as Essel Shyam Communication Limited). We at Planetshare, have the utmost respect for the privacy of our customers and visitors.</p>
                        <p class="t">Please note that for this Privacy Policy, wherever the context so demands, terms "<strong>Platform</strong>", <strong>We</strong> ", "<strong>Us</strong>" and "<strong>Our</strong>" shall mean the website (s), Mobile sites (s) and App (s) of Planetshare and its related entities such as Parent site, subsidiaries, etc. and "<strong>You</strong>" or "<strong>Your</strong>" shall mean Visitors.</p>
                        <p class="t">By visiting or entering the Website, Mobile Site or App, or making any purchase (s), you hereby agree with this Privacy Policy and the contents within. This Privacy Policy shall not apply to any third-party website(s), mobile site (s) and App (s), even if their websites or/and products are linked to Planetshare in any form.</p>
                        <p class="t">We recommend all users to take note that Information and Privacy Practices of our partners, advertisers, or other sites which find a mention or hyperlink on Planetshare, may be substantially different from our Privacy Policy. We at Planetshare, suggest you to review the Privacy Policies of any such third-party websites.</p>
                        <p class="t">We request you to view this Privacy Policy in conjunction and together with the <strong><a href="terms_services.html">Terms of Service</a></strong>. Please note that we collect Personal Information of User(s) if the User(s) registers on our website, enters the website or performs any action and buys our products and services on the Website or the App.</p>
                        <ul class="bullet_list">
                            <li>
                                <p>Giving Personal Information or any data to us is the user's choice.</p>
                            </li>
                            <li>
                                <p>We do not share your information with anyone unless it is under our business or legal obligation (s).</p>
                            </li>
                            <li>
                                <p>User (s) always has the option to opt-out of receiving communications from Planetshare.</p>
                            </li>
                            <li>
                                <p>User (s) can always write to us to raise concerns or get clarifications on this Privacy Policy.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="u_outsideindia">
                        <h3>Users outside India</h3>
                        <p class="t">The data provided to us shall be essentially processed within the Geographical Limits of India and such other domains where our service partners may process the data on our behalf. By consenting to this Privacy Policy, you are providing Planetshare with your clear permission to process your data for the purpose(s) outlined in this policy. Please note that the data security regulations in India or such other jurisdictions cited above may vary from those of your country.</p>
                        <p class="t">Please feel free to contact us at <a href="mailto:AMIT@PLANETSHARE.IN">AMIT@PLANETSHARE.IN</a> if you have any concerns regarding the processing of your personal information. However, if such processing of your personal information is necessary for us to be able to render the services to you, we may be unable to provide you with our products and services after the retraction of consent.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="information_data">
                        <h3>Collection of Information/Data</h3>
                        <p class="t">Before we list out the types of information we collect from users, it is important to mention that we collect and process your data only when it is essential for us to deliver the services opted by our users and fulfil our commitments towards our partners and legal obligations.</p>
                        <p class="t">Here's the list of Personal Information we may collect:</p>
                        <ul class="bullet_list">
                            <li>
                                <p>Registration details such as your Name, Email Address, Username, Mobile Number/Contact Details, Password, Location, Address, etc.</p>
                            </li>
                            <li>
                                <p>We may collect your Social Media Username and any information you share with us while accessing or engaging with our website and App through a Social Media Service.</p>
                            </li>
                            <li>
                                <p>Transactional history related to our products and services (excluding your banking details) available on our website and App.</p>
                            </li>
                            <li>
                                <p>Your Credit/Debit card details or other Bank details while purchasing any products and services in some cases when you choose to share with us.</p>
                            </li>
                            <li>
                                <p>Your clicks and visits to subpages while on our website, links followed here, service requests, orders details and open and completed transactions.</p>
                            </li>
                            <li>
                                <p>Your search terms, products or services viewed, service cart, responses, comments, pictures, videos or other related contents that you share with us or store on our website or the App.</p>
                            </li>
                            <li>
                                <p>Usage behaviour of the website or interests, purchasing derivatives, and other traceable activities.</p>
                            </li>
                            <li>
                                <p>Your preferences such as language.</p>
                            </li>
                            <li>
                                <p>Any information you have made public on Social Media platforms.</p>
                            </li>
                            <li>
                                <p>Details of your device, network, session, Uniform Resource Locator (URL), Date and Time of your visit and other commercially available services and details traced through cookies.</p>
                            </li>
                            <li>
                                <p>IP Address, Operating System (OS), browser details, Internet Service Provider (ISP), and other connection-related information.</p>
                            </li>
                            <li>
                                <p>Newsletter subscriptions, survey answers, reviews, ratings and feedback.</p>
                            </li>
                            <li>
                                <p>Consents, authorizations, agreements, etc.</p>
                            </li>
                            <li>
                                <p>Any communication performed on the website including but not limited to information posted in Social Communities on our platform, content of contact forms, and chat transcripts.</p>
                            </li>
                            <li>
                                <p>Details of software and other content downloaded from our platform.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="user_information">
                        <h3>Use of information</h3>
                        <p class="t">Planetshare may use your Personal Information or Data for various reasons including but not limited to:</p>
                        <ul class="bullet_list">
                            <li>
                                <p>Allow you to access our website with various features, and products and services available on the website or the App.</p>
                            </li>
                            <li>
                                <p>Send verification email(s) or message(s).</p>
                            </li>
                            <li>
                                <p>Contact you for any service-related or offer-related purposes.</p>
                            </li>
                            <li>
                                <p>Record your information and details as authorised to fulfil our service and legal obligations.</p>
                            </li>
                            <li>
                                <p>Validate/authenticate your account so that we can prevent any misuse or abuse.</p>
                            </li>
                            <li>
                                <p>Recommend contents, send transactional communication, provide you with information, conduct surveys, request for services, push direct marketing notifications and send you other marketing materials from time to time in connection with our website or its parent, subsidiaries, affiliated companies, service partners and its joint ventures.</p>
                            </li>
                            <li>
                                <p>Integrate certain third-party Software Development Kits (SDKs) within the Platform to aid advertisement display suited for you and to enhance the overall user experience. Such SDK's may directly collect certain data from you such as user preferences, behaviour, account activity, IP address, interactions with advertisements, Identifiers for Advertisers (IDFAs) and Google Advertising ID (AAID).</p>
                            </li>
                            <li>
                                <p>Collect and analyse several types of technical information and may include cookies and web beacons.</p>
                            </li>
                            <li>
                                <p>Request you to share feedback on our products or/and services.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="cookies">
                        <h3>Cookies</h3>
                        <p class="t">Planetshare may use your Personal Information or Data for various reasons including but not limited to:</p>
                        <ul class="bullet_list">
                            <li>
                                <p>A cookie is a small file or set of files and it saves a string of information on your device. Planetshare.in uses “Cookies” to help us provide you with customised information upon your revisit to the platform. It acts so to store your preferences and track your behaviour to pave the way for us to render you the best user experience on our site.</p>
                            </li>
                            <li>
                                <p>Please note that Cookies shall come into effect only if you allow the permission on your browser. If you grant permission to a “Cookie”, you hereby agree to our use of data collected through that Cookie.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="sharing_disclosure">
                        <h3>Information Sharing and Disclosure</h3>
                        <p class="t">We may grant permission to our service partners, agents and third-party vendors to access your Personal Information or Data to perform essential activities to enhance the quality of the services provided to you.</p>
                        <p class="t">We shall endeavour that such third-parties and others having access to your Personal Information or Data for the purposes detailed out in this Privacy Policy, remain under a contractual obligation to protect your data in accordance with the same standard and security parameters as Planetshare has agreed to be subject to herein.</p>
                        <p class="t">We may disclose your Personal Information only when it is absolutely necessary for us to do so to fulfil our obligations. Please note that recipients of your data may be located in any country including those nations or territories or jurisdictions where applicable data protection regulations provide a lesser degree of protection than your country's laws do.</p>
                        <p class="t">Please note that we shall exercise prudent commercial endeavours for the restriction of unauthorised disclosure of your Personal Information or data provided by our users, visitors and customers.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="law_inforcement">
                        <h3>Compliance with Laws and Law Enforcement</h3>
                        <p class="t">We cooperate with the government authorities, law enforcement agencies of the land, court or legal order and any other competent authority mandated by the law to enforce and comply with the law. We shall disclose any information including but not limited to your Personal Information to such government authorities and law enforcement agencies without your consent as we, in our sole discretion, deem necessary or appropriate to respond to valid claims and legal process, to protect the safety of the public, to guard the property and rights of our platform or a third-party, or any person, or to restrict or stop any unauthorised, unethical or unlawful activity.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="email_policies">
                        <h3>Email Policies</h3>
                        <p class="t">We may use data for the purposes stated in this Privacy Policy. You have full control concerning emails and other communications you want to receive. If you decide at any point in time during your association with Planetshare or otherwise you no longer wish to receive such communications from us, you have the option to opt-out. We hope you understand that once we receive your request, it may take a certain time for your opt-out to come into effect.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="data_security">
                        <h3>Data Security</h3>
                        <p class="t">We respect your data security and understand its importance as we want your user experience with us to be safe and secure. We would like to inform you that our platform has implemented reasonable precautionary measures to protect your Personal Information or Data, including technical and organisational means against unauthorized access, improper handling, modification, illegal or accidental destruction, and accidental loss.</p>
                        <p class="t">All payments and transactions on our website are secured. All your Personal Information are transmitted using Transport Layer Security (TLS) encryption.</p>
                        <p class="t">Please note that despite our best efforts to protect your data against potential risks, we cannot guarantee the 100% data protection as the internet world is not absolutely secure.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="data_retenction">
                        <h3>Data Retention:</h3>
                        <p class="t">We retain your Personal Information or data only for as long as we deem it to be essential for the purposes detailed out in this Privacy Policy. Please note that we may store your data for longer periods of time subject to any legal obligations.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="other_sites">
                        <h3>Links to Other Sites</h3>
                        <p class="t">We at Planetshare may provide links to other third-party websites including but not limited to payment gateway providers to ensure your convenience. Please note that we do not directly collect any financial information such as Net Banking details, Credit/Debit Card details and other related details from You. Such third-party websites are not governed by our Privacy Policy. We recommend you to review their privacy practices as they follow their own privacy and data collection guidelines. You shall visit such websites at your own risk and we shall not be responsible for anything that happens to your data while you are on such websites.</p>
                        <p class="t">Also, the Platform may contain several other links to third-party websites, including but not limited to ads, promotions and services. You shall visit these websites at your own risk and Planetshare shall not be responsible for any data loss of yours during your visit to such websites. Such third-party websites may prompt you to download their or foreign software or subscribe to certain services, etc. Please note that you shall follow these steps at your own risk. In no way, Planetshare shall be responsible for any data loss or damage to your device or attack on your network, etc.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="changes_policy">
                        <h3>Changes in Privacy Policy</h3>
                        <p class="t">Planetshare reserves the rights to revise, modify or completely change the Privacy Policy from time to time to fulfil various business, legal, and other related obligations. Please note that your acceptance of the then-current Privacy Policy shall be necessary to avail services and to visit our platform. Therefore, we encourage you to regularly visit our Privacy Policy to review any changes.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="concerning_data">
                        <h3>Your Rights Concerning Data</h3>
                        <p class="t">You may access your Personal Information or data from your user account with Planetshare. </p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="cont_us">
                        <h3>Contact Us</h3>
                        <p class="t">If you have any queries and concerns about this Privacy Policy or your dealings with the website or the App. Please feel free to contact us at <a href="mailto:AMIT@PLANETSHARE.IN">AMIT@PLANETSHARE.IN</a> or you can write and send a letter to us at the below address:-</p>
                        <p class="t">C-34, Sector-62, Electronic City, Noida-201 307 (UP), India.</p>
                        <div class="clearfix"></div>
                    </div>

                </div>
            </div>
            <aside class="sidebar_view sticky-top">
                <div class="box">
                    <h3>Contents</h3>
                    <ul class="sup_cont_link">
                        <li class="active">
                            <a href="#introduction" class="scrollTo">Introduction</a>
                        </li>
                        <li class="active">
                            <a href="#u_outsideindia" class="scrollTo">Users outside India</a>
                        </li>
                        <li class="active">
                            <a href="#information_data" class="scrollTo">Collection of Information/Data</a>
                        </li>
                        <li class="active">
                            <a href="#user_information" class="scrollTo">Use of information</a>
                        </li>
                        <li class="active">
                            <a href="#cookies" class="scrollTo">Cookies</a>
                        </li>
                        <li class="active">
                            <a href="#sharing_disclosure" class="scrollTo">Information Sharing and Disclosure</a>
                        </li>
                        <li class="active">
                            <a href="#law_inforcement" class="scrollTo">Compliance with Laws and Law Enforcement</a>
                        </li>
                        <li class="active">
                            <a href="#email_policies" class="scrollTo">Email Policies</a>
                        </li>
                        <li class="active">
                            <a href="#data_security" class="scrollTo">Data Security</a>
                        </li>
                        <li class="active">
                            <a href="#data_retenction" class="scrollTo">Data Retention</a>
                        </li>
                        <li class="active">
                            <a href="#other_sites" class="scrollTo">Links to Other Sites</a>
                        </li>
                        <li class="active">
                            <a href="#changes_policy" class="scrollTo">Changes in Privacy Policy</a>
                        </li>
                        <li class="active">
                            <a href="#concerning_data" class="scrollTo">Your Rights Concerning Data</a>
                        </li>
                        <li class="active">
                            <a href="#cont_us" class="scrollTo">Contact Us</a>
                        </li>

                    </ul>
                </div>
            </aside>
            <a id="back2Top" title="Back to top" href="javascript:;">&#10148;</a>
        </div>
        <div class="clearfix"></div>
    </section>)
}
export default PrivacyPolicy;
