import React,{useEffect} from 'react';
import $ from 'jquery'

function PartnerWithUs(){
  useEffect(()=>{
    $('.sellon_planet .step_box .video').click(function() {
      $(this).addClass('play_vdo');
      $(this).children('video')[0].play();
    });
    var lastId,
     topMenu = $(".sellon_planet .sidebar_view .sup_cont_link"),
     topMenuHeight = topMenu.outerHeight()+150,
     // All list items
     menuItems = topMenu.find("a"),
     // Anchors corresponding to menu items
     scrollItems = menuItems.map(function(){
         var currentLink = $(this);
       var item = $(currentLink.attr('href'));
       if (item.length) { return item; }
     });

 // Bind click handler to menu items
 // so we can get a fancy scroll animation
 menuItems.click(function(e){
   var href = $(this).attr("href")
    var offsetTop = href == "#" ? 0 : $(href).offset().top-80;
   $('html, body').stop().animate({
       scrollTop: offsetTop
   }, 300);
   e.preventDefault();
 });

 // Bind to scroll
 $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems.parent().removeClass("active").end().filter("[href='#"+id+"']").parent().addClass("active");
    }
 });
  })
  return( <section class="inner_cont sellon_planet top_div">
        <div class="container">
            <article class="main_cont">
                <div class="box">
                    <h2>How to Start Offering your Services on Planetshare</h2>
                    <p>Planetshare, a renowned online marketplace for content and digital services, provides you with an opportunity to create and render your services. Use this platform to showcase your creative skills and make presence felt.</p>
                    <p>With Planetshare, you can create and list out your services, customise them to ensure you everything is as per you and take control of your entire service cycle.</p>
                    <p>Here's how you can get started as a Vendor on Planetshare.</p>
                    <div class="step_box" id="c_signup">
                        <h3>Sign Up</h3>
                        <p>Sign Up is the first step! Complete the Sign Up process as you enter your email address and create a password. The Sign Up process is the same for all.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="createsellerprofile">
                        <h3>Create your Vendor Profile</h3>
                        <p>Go to the Vendor's Dashboard and fill out your details as asked in the provided form to begin your registration as a vendor.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        {/*<p class="info">For more information, see <a href="javascript:;">Creating Your Seller Profile.</a></p>*/}
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="getverify">
                        <h3>Get Verified</h3>
                        <p>Getting your email verified is an important action to move to the next step! Check your email and follow the verification procedure to get your email confirmed.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="stepverify">
                        <h3>Complete 2-Step Verification</h3>
                        <p>To make your account more secure, complete the 2-step verification process. Scan the displayed bar code using Google Authenticator.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="creatinglist">
                        <h3>Create your Gig</h3>
                        <p>Your Gig is the service that you offer on Planetshare. Go to 'Gigs' and Click on 'Create a Gig' in the Vendor Dashboard to start creating it. Fill out the Basic Details, Compose the Package, enter the Description and Build Your Gig Gallery.</p>
                        <div class="video">
                            <video id="create_gig" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="savacontinue">
                        <h3>Save & Continue</h3>
                        <p>Almost done! Click on 'Save & Continue' to submit your Gig. </p>
                        <div class="video">
                            <video id="create_gig" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="approval">
                        <h3>Please Wait for the Approval</h3>
                        <p>You have done your part! Our team will review your Gig and approve the same or communicate to you within 24 hours.</p>
                        <div class="video">
                            <video id="create_gig" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </article>
            <aside class="sidebar_view sticky-top">
                <div class="box">
                    <h3>Contents</h3>
                    <ul class="sup_cont_link">
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#c_signup">Sign Up</a>
                        </li>
                        <li class="active">
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#createsellerprofile">Create your Vendor Profile</a>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#getverify">Get Verified</a>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#stepverify">Complete 2-Step Verification</a>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#creatinglist">Create your Gig</a>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#savacontinue">Save & Continue</a>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#approval">Please Wait for the Approval</a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
        <div class="clearfix"></div>
    </section>)
}
export default PartnerWithUs;
