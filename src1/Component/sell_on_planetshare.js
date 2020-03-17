import React,{useEffect} from 'react';
import $ from 'jquery'

function SellOnPlanetshare(){
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
                    <h2>How to Start Selling on Planetshare</h2>
                    <p>Planetshare is a leading global online marketplace for content and digital services. There are many ways to showcase your skills and earn good rewards for your crafty work, and one of the best ways is to list your creations here on Planetshare. Explore, Learn and Earn at Planetshare!</p>
                    <p>Planetshare offers you an excellent platform to exhibit and share your creation with our buyer community and make money while you are at it. From those Broadcaster, Studios, Content Aggregators & Owners to Writers, we have got all creative minds covered.</p>
                    <p>Here's how you can start your journey as a Seller on Planetshare.</p>
                    <p>Be a part of this Online Marketplace and witness the change.</p>
                    <p>Here's how you can start your journey as a Seller on Planetshare:</p>
                    <div class="step_box" id="c_signup">
                        <h3>Sign Up</h3>
                        <p>First things first! Make a regular Sign Up on Planetshare to register yourself. The Sign Up process is the same for Buyers, Sellers and Vendors.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="createsellerprofile">
                        <h3>Creating Your Seller Profile</h3>
                        <p>Enter the required details in the space provided in the account section to formally become a Seller. Creating your Seller Profile is one of the ways to present yourself to the Planetshare community.</p>
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
                        <p>One of the easiest and most important steps to complete! Verify your profile by following the procedure laid out in the email received on your registered email address.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="stepverify">
                        <h3>Complete 2-Step Verification</h3>
                        <p>Security of your account is our topmost priority! Complete the 2-Step Verification process by scanning the displayed barcode using Google Authenticator.</p>
                        <div class="video">
                            <video id="seller_profile" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="creatinglist">
                        <h3>Create your Listing</h3>
                        <p>Your listing is your product or the asset that you intend to sell on Planetshare. This step enables you to present your assets to our craft-loving Planetshare community and subsequently open a new revenue stream. Upload your images and videos that you want to sell on Planetshare. You can select a maximum of six images at one go.</p>
                        <div class="video">
                            <video id="create_gig" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="assetdesc">
                        <h3>Enter Asset Description</h3>
                        <p>After the upload is finished, you need to enter the asset description in the given space. </p>
                        <div class="video">
                            <video id="create_gig" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="savacontinue">
                        <h3>Save & Continue</h3>
                        <p>The final step is always a joy! Click on ‘Save and Continue’ to send it to us. </p>
                        <div class="video">
                            <video id="create_gig" controls>
                                <source src="images/video/website_demo.mp4" type="video/mp4"/>
                            </video>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="step_box" id="approval">
                        <h3>Please Wait for the Approval</h3>
                        <p>Your job is done! Our team of experts will review the uploaded content and approve the same or communicate to you within 24 hours.</p>
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
                            <a href="#createsellerprofile">Creating Your Seller Profile</a>
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
                            <a href="#creatinglist">Create your Listing</a>
                        </li>
                        <li>
                            <span class="icon"><i class="fa fa-life-ring"></i></span>
                            <a href="#assetdesc">Enter Asset Description</a>
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
export default SellOnPlanetshare;
