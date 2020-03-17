import React,{useEffect} from 'react';
import cogoToast from 'cogo-toast';
import $ from 'jquery'

function BuyOnPlanetshare(){
  useEffect(()=>{
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
  return(<section class="inner_cont buyon_planet top_div">
        <div class="container">
            <div class="main_cont">
                <div class="top_info">
                    <h2>How to start buying</h2>
                    <div class="clearfix"></div>
                </div>
                <div class="stepboxes">
                  <div class="stepbox">
                      <div class="box l">
                          <h3>Find what you want</h3>
                          <div class="desc">
                              <p>You have more than one thing to go for as a buyer! </p>
                          </div>
                          <ul class="ser_list">
                              <li>1. Browse what you are looking for and select the asset.</li>
                              <li>2. Find freelancers to get your task done.</li>
                              <li>3. Choose certain services on select videos.</li>
                          </ul>
                          <p>While Sign Up is not necessary to perform searches for your desired image (s), video (s), registration is required for making any purchases or to avail enhanced search features. </p>
                          {/*<a class="btndefault" href="javascript:;">Browse Services</a>*/}
                      </div>
                      <div class="box r">
                          <div class="video">
                              <video id="create_gig" controls>
                                  <source src="images/video/website_demo.mp4" type="video/mp4"/>
                              </video>
                          </div>
                      </div>
                  </div>
                  <div class="stepbox">
                      <div class="box l">
                          <h3>Sign Up</h3>
                          <div class="desc">
                              <p>Registration on Planetshare is smooth and easy. Complete the Sign Up process by entering your email address and creating a password. You will get your user ID as soon as your registration is done. </p>
                          </div>
                      </div>
                      <div class="box r">
                          <div class="video">
                              <video id="create_gig" controls>
                                  <source src="images/video/website_demo.mp4" type="video/mp4"/>
                              </video>
                          </div>
                      </div>
                  </div>
                  <div class="stepbox">
                      <div class="box l">
                          <h3>Profile Completeness and Email Verification</h3>
                          <div class="desc">
                              <p>You will have to complete your profile in the account section and verify your email to activate your account.</p>
                          </div>
                      </div>
                      <div class="box r">
                          <div class="video">
                              <video id="create_gig" controls>
                                  <source src="images/video/website_demo.mp4" type="video/mp4"/>
                              </video>
                          </div>
                      </div>
                  </div>
                  <div class="stepbox">
                      <div class="box l">
                          <h3>Find a Freelancer</h3>
                          <div class="desc">
                              <p>An image or video may always need something! Hire freelancers for transcoding, dubbing and subtitling whenever you need them. </p>
                              <p>Search for the services you are looking for entering service details in the search box or by navigating the website. </p>
                          </div>
                      </div>
                      <div class="box r">
                          <div class="video">
                              <video id="create_gig" controls>
                                  <source src="images/video/website_demo.mp4" type="video/mp4"/>
                              </video>
                          </div>
                      </div>
                  </div>
                </div>
                <div class="guide_box">
                    <h2>Buyer's Guide</h2>
                    <p>Whether you are an individual, a small business or a big layer, our buyer's guide will help you purchase Planetshare. </p>
                    <div class="buttons">
                        <a href="javascript:;" class="btndefault" onClick={()=>cogoToast.error('Wiil Provide You Soon',{position:'bottom-center'})}>Download Free Guide</a>
                    </div>
                    <div class="clearfix"></div>
                </div>
                {/*<div class="buyer_faq">
                    <h3>FAQ</h3>
                    <ul class="faq_list">
                        <li><strong>Can I pay with my credit card?</strong> Yes, you can pay with your credit card or debit card. For more information on payment methods, <a href="javascript:;">Paying for Services.</a></li>
                        <li><strong>What if I'm not happy with my delivery?</strong> If you are not happy with your delivery, you can always ask the seller for revisions. You can also resolve any further issues with your order through our Resolution Center.</li>
                        <li><strong>What do the seller levels mean?</strong> A seller level is a status earned by sellers based on ratings, performance, quality, and other factors. For more information, see <a href="javascript:;">Planetshare's Levels.</a></li>
                        <li><strong>How do I contact the seller before I place my order?</strong> Within the Gig page, you will see a "Contact Me" button. We recommend contacting your seller before placing your order, especially if you have specific requirements.</li>
                    </ul>
                    <div class="clearfix"></div>
                </div>*/}
                <div class="clearfix"></div>
            </div>
        </div>
        <div class="clearfix"></div>
    </section>)
}
export default BuyOnPlanetshare;
