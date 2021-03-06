import React,{useEffect} from 'react';
import $ from 'jquery'

function TermCondition(){
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
  return( <section class="inner_cont terms_ser">
        <div class="container">
            <div class="terms_box">
                <div class="box">
                    <h2>Terms of Services</h2>
                    <div class="top_desc">
                        <p>The "<strong>Terms of Service</strong>" described here form the Terms and conditions for the use of services and products of Planetshare, a brand of Planetcast Media Services Limited (PMSL). Please note that these Terms of Service govern your access to and use of Planetshare.in, Planetshare's mobile App (s) or any such platform (s) available on the Internet.</p>
                        <p>We at Planetshare encourage all visitors and users to carefully read the Terms of Service before navigating or accessing the website (s) further or opting for our products and services.</p>
                        <p>Any person who visits our platform (s), inquires about or opts for or purchases any products or services of Planetshare through its website (s), Mobile App (s), sales executives, and physical offices, call centres, etc., agrees to be governed by these Terms of Service. </p>
                        <p>For these Terms of Service whosesoever the context so requires the term "<strong>us</strong>", "<strong>we</strong>", "<strong>our</strong>" will refer to Planetshare and PMSL and the term "<strong>your</strong>", "<strong>you</strong>" will mean User.</p>
                        <p>Both the User and PMSL are individually referred to as 'Party' and collectively referred to as 'Parties' to the Terms of Services.</p>
                        <p>Planetshare's website (s) and App (s) are offered and made available to users who are aged 13 or older. Please note that if you are under 13, you may not consider using this Site or our App (s) or our products and services. By using this Site, you convey and warrant that you are aged 13 or older. Please note that you should not access our website (s) and App (s) in case you do not meet eligibility requirements. </p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="keyterms">
                        <h3>Content & Key Terms</h3>
                        <p>All content provided to you or made available to you through our website (s), Mobile App(s) or any other platform (electronic or otherwise) including but not limited to video, audio, images, icons, text, software, and such similar contents, are either owned and maintained by PMSL and its brands or by our Partners and protected under applicable intellectual property laws unless attained rights to use or process them. </p>
                        <p>Please note that by purchasing or opting for our products and services, user agrees to follow all instructions provided by PMSL and its brands which will prescribe the way such User may use the Content.</p>
                        <p>Please note that there may be a number of proprietary logos, trademarks, service marks and other rightful content displayed on the Website (s), Mobile App (s) and other platforms, as may be applicable. PMSL does not grant the User permission, right, license, or authority to use and process such content in any manner. Any unauthorised usage of such Content will be in violation of the applicable law and PMSL's terms.</p>
                        <p>PMSL also respects the intellectual property rights of others. If you see any act of infringement on our website (s), Mobile App (s) or other platforms, you are requested to send us a written intimation. Please note that any such intimation or notice must be authenticated through these points:</p>
                        <ul class="keyterm_list keylist2">
                            <li>
                                <p>Clear identification of such copyrighted content that you deem has been infringed or violated;</p>
                            </li>
                            <li>
                                <p>Section of the Website (s) where such content is located, including but not limited to the link of the content in question;</p>
                            </li>
                            <li>
                                <p>The proof that the alleged content is owned by you;</p>
                            </li>
                            <li>
                                <p>Contact information;</p>
                            </li>
                            <li>
                                <p>Key Terms</p>
                            </li>
                        </ul>
                        <ul class="keyterm_list">
                            <li>
                                <p><strong>PMSL</strong> Planetcast Media Services Limited</p>
                            </li>
                            <li>
                                <p><strong>Buyer</strong> user or visitor who purchases our products and services</p>
                            </li>
                            <li>
                                <p><strong>Seller</strong> visitor who sells her/his services</p>
                            </li>
                            <li>
                                <p><strong>Vendor</strong> visitor who offers her/his products and services on our platform</p>
                            </li>
                        </ul>
                        <p>Please note that we shall add "<strong>Key Terms</strong>" to this section as and when new terms find their mention on our website (s).</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="gen_terms">
                        <h3>General Terms</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Only registered users can buy, offer services and sell on Planetshare. Registration is absolutely free subject to the rendering of required information on the Sign Up page.</p>
                            </li>
                            <li>
                                <p>Vendors have the authority to set a Base Price for each service and users must comply with the same.</p>
                            </li>
                            <li>
                                <p>Buyers pay Planetshare in advance to place an order.</p>
                            </li>
                            <li>
                                <p>Vendors must fulfil their orders, and may not reject orders on a regular basis or without a valid reason.</p>
                            </li>
                            <li>
                                <p>Please note that Order Rejections will affect a Vendor’s reputation and status on our platform.</p>
                            </li>
                            <li>
                                <p>It is the buyer who provides reviews to the Vendor and the same is a vital component of deciding Vendor Rankings.</p>
                            </li>
                            <li>
                                <p>Vendor earns account status or reputation here termed as Level based on their performance. </p>
                            </li>
                            <li>
                                <p>Please note that Advanced Levels provide Vendors with several benefits, including but not limited to, establishing reputation among buyers, gaining visibility on our platform.</p>
                            </li>
                            <li>
                                <p>Buyers have all rights for the delivered work like downloads, usage, processing and sharing of the purchased material. </p>
                            </li>
                            <li>
                                <p>Planetshare retains the right to use all delivered works for its marketing, advertising and promotion purposes.</p>
                            </li>
                            <li>
                                <p>Planetshare's website (s), Mobile App (s) and other platforms are meant to be used by bonafide User (s) for a lawful use.</p>
                            </li>
                            <li>
                                <p>User (s) must not sell, distribute, exchange, modify, or transmit anything from our platforms, including but not limited to any video, and audio for any business or commercial purposes unless attained rights or ownership of such content.</p>
                            </li>
                            <li>
                                <p>We at PMSL through our Terms of Service grant a limited, non-transferable, non-exclusive, right to the user to use our website (s), Mobile App (s) or other platforms. By accessing our website (s) user agrees not to interrupt or attempt to interrupt the operation of the website (s), Mobile App (s) or other platforms in any manner whatsoever.</p>
                            </li>
                            <li>
                                <p>Please note that access to certain features of the website (s) or the App (s) may only be available to registered User (s). The method of registration or sign up may require the user to enter personal details including but not limited to Name, Email Address, Mobile Number, etc. Some of such fields may be mandatory to get your profile activated. User confirms and warrants that all such information supplied to us is true and accurate.</p>
                            </li>
                            <li>
                                <p>PMSL reserves the right, in its sole discretion, to partially or fully terminate the access to the website (s), Mobile App (s) or other platforms and the services offered on the same or any portion thereof at any time, without notice, for maintenance purposes or any other reason whatsoever.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="orders">
                        <h3>Orders</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Any purchase of a product or service made here on Planetshare will be termed as an Order. </p>
                            </li>
                            <li>
                                <p>An attempt to opt or make a purchase on our platform will not be termed as an Order unless the payment gets confirmed. </p>
                            </li>
                            <li>
                                <p>Upon payment confirmation, your order will be created and given a unique Order ID.</p>
                            </li>
                            <li>
                                <p>The Order ID can be used for future references throughout the Order Cycle and otherwise.</p>
                            </li>
                            <li>
                                <p>Vendors receive Order notification when they are logged into the Planetshare account and through an email.</p>
                            </li>
                            <li>
                                <p>A Vendor must accept the order within 12 hours of the payment confirmation.</p>
                            </li>
                            <li>
                                <p>In the event of no confirmation from the vendor, the order will be automatically cancelled and the buyer will receive notification for the same.</p>
                            </li>
                            <li>
                                <p>Vendors agree to deliver completed file/work using the Submit button according to the service that was purchased and advertised by them on Planetshare.</p>
                            </li>
                            <li>
                                <p>Vendors always have an option to seek an extension from the buyer in case they need more time to deliver the order or be sure on order acceptance. Please note that grant or approval of any extension or such request is solely depends on the buyer. Also, Vendors may be charged or limited by Planetshare for such extensions and they might have to compensate the buyer to the extent of buyer’s satisfaction.</p>
                            </li>
                            <li>
                                <p>Vendors must mark an order as late in the event of their inability to deliver the order within the said time.</p>
                            </li>
                            <li>
                                <p>Vendors must render and comply with all services and service related terms including but not limited to Revisions, Timely Delivery, Self-Created or Authentic Files as displayed and promised by them on our platform. Failing to deliver order on time will allow the Buyer to cancel the order when an order is marked as late and may harm the Seller's status.</p>
                            </li>
                            <li>
                                <p>An order is marked as Complete after it is marked as Delivered and then accepted by the Buyer. An order will be automatically marked as Complete if we do not hear anything from the buyer and no request for modification is submitted within 3 days after the order was marked as Delivered by the Vendor.</p>
                            </li>
                            <li>
                                <p>Buyers are responsible for scanning all transferred files from the Vendor for viruses and malware. In no way Planetshare can be held responsible for any harms/damages which might occur due to site/content usage or file transferred or downloaded.</p>
                            </li>
                            <li>
                                <p>Buyers may use the “Revisions" option on the Order page after an order is marked as Delivered if the delivered file (s) does not match the Seller's description on their listing page or they do not meet the accepted customer's requests sent to the Vendor at the time of the order processing.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>

                    <h2>Service Overview</h2>
                    <div class="cont_box" id="sellers">
                        <h3>Sellers</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Any individual or company may register themselves as a Seller.</p>
                            </li>
                            <li>
                                <p>Sellers list out their Assets on Planetshare.in.</p>
                            </li>
                            <li>
                                <p>A Seller needs to verify her/his email address and mobile number to complete the registration process.</p>
                            </li>
                            <li>
                                <p>A Seller may need to provide us with additional details as and when required to complete the account verification process.</p>
                            </li>
                            <li>
                                <p>Sellers can create and list out their assets as per their convenience.</p>
                            </li>
                            <li>
                                <p>Sellers can manage their listings and services in their account section subject to certain applicable restrictions.</p>
                            </li>
                            <li>
                                <p>The order/service amount displayed against the service is termed as Seller Listing Value.</p>
                            </li>
                            <li>
                                <p>The Seller Listing Value is determined by the seller.</p>
                            </li>
                            <li>
                                <p>Each order/asset a seller successfully completes or sells, fetches the seller a net revenue of TBD % of the Seller Listing Value.</p>
                            </li>
                            <li>
                                <p>In case of order cancellation, the complete amount would be refunded to the buyer and hence no revenue or commission will be credited to the seller.</p>
                            </li>
                            <li>
                                <p>An order is termed as Successful only after the cancellation time is over.</p>
                            </li>
                            <li>
                                <p>Revenues are credited to a seller's account within 24 hours of the completion of Cancellation timeline.</p>
                            </li>
                            <li>
                                <p>Please note that the bank transaction would be initiated to the seller's account only after a due process of verification.</p>
                            </li>
                            <li>
                                <p>For security concerns or in response to reports from other users or firms, PMSL may temporarily disable a Seller’s account to create a listing/order, withdraw money or make changes to the existing listings.</p>
                            </li>
                            <li>
                                <p>PMSL may permanently disable a seller's account as a result of suspicious behaviour.</p>
                            </li>
                            <li>
                                <p>Sellers are required to pay any direct or indirect taxes, including but not limited to GST, VAT, etc., which may apply to them depending on residency or location.</p>
                            </li>
                            <li>
                                <p>The Seller Listing Value shown on the planetshare.in is inclusive of all such taxes and charges that may apply to the Seller.</p>
                            </li>
                            <li>
                                <p><strong>Appointment as Limited Payment Collection Agent:</strong> Seller hereby appoints PMSL her/his limited authorized payment collection agent solely to accept payments electronically or otherwise from Buyers/Customers, and remit those payments to Seller after deducting the commission wherever applicable. Seller agrees that payment from Buyer to PMSL is be considered the same as a payment made directly to the Seller. </p>
                            </li>
                            <li>
                                <p>PMSL partners with Payment Services Providers for purposes of collecting payments from Buyers/Customers. Please note that all payment collections are done via our payment partners and not directly by Planetshare.</p>
                            </li>
                            <li>
                                <p><strong>User Licence & Copyright:</strong> All assets/contents listed out here on Planetshare.in are made live only after getting a confirmation from the seller on the rights and user licenses. Any asset present on our website (s) will be taken down in the event of a valid report (asset claimed with documents showing full rights or licences) from any user about the rights of the asset and the Seller fails to prove she/he has the rights to sell or process the content in question.</p>
                            </li>
                            <li>
                                <p>It is the seller’s responsibility to list out only those assets for which they have the required rights to sell or monetise. While we have mechanism in place to ensure that a Seller lists out only self-produced or owned assets, Planetshare is not liable to produce licences or prove the ownership documents on behalf of the seller. Please note that in no way Planetshare and its parent company (s) are responsible for the rights of the contents that we have on our website (s) as they are listed out by our service partners. </p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="vendors">
                        <h3>Vendors</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Any individual or a company may register themselves as a Vendor.</p>
                            </li>
                            <li>
                                <p>Vendors list out their services on Planetshare.in.</p>
                            </li>
                            <li>
                                <p>A Vendor needs to verify her/his email address and mobile number to complete the registration process.</p>
                            </li>
                            <li>
                                <p>A Vendor may need to provide us with additional details as and when required to complete the account verification process.</p>
                            </li>
                            <li>
                                <p>A Vendor can create and list out their services as per their convenience.</p>
                            </li>
                            <li>
                                <p>Vendors can manage their listings and services in their account section.</p>
                            </li>
                            <li>
                                <p>The order/service amount displayed against the service is termed as Sell Listing Value</p>
                            </li>
                            <li>
                                <p>The Vendor Listing Value is determined by the Vendor.</p>
                            </li>
                            <li>
                                <p>Each order/service a vendor successfully completes or sells, fetches the vendor a net revenue of TBD % of the Vendor Listing Value.</p>
                            </li>
                            <li>
                                <p>Vendors can edit, change and manage their listings subject to certain applicable restrictions.</p>
                            </li>
                            <li>
                                <p>The Vendor Listing Value is determined by a Vendor.</p>
                            </li>
                            <li>
                                <p>Each order/service a vendor successfully completes or renders fetches the Vendor a net revenue of TBD % of the Vendor Listing Value.</p>
                            </li>
                            <li>
                                <p>Vendors can determine the numbers of revisions they can offer against a listing.</p>
                            </li>
                            <li>
                                <p>Vendors agree to execute the numbers revisions requested by the customers to the extent it has been stated in the listing.</p>
                            </li>
                            <li>
                                <p>An order is termed as Successful only after it is marked as complete by the customer or it reaches the permitted revisions.</p>
                            </li>
                            <li>
                                <p>Revenues are credited to a Vendor's Planetshare account within 24 hours of the order completion time. </p>
                            </li>
                            <li>
                                <p>For security reasons or in response to any reports from other users or firms, PMSL may temporarily disable a Seller’s account to create a listing/order, withdraw money or make changes to the existing listing. </p>
                            </li>
                            <li>
                                <p>PMSL may permanently disable a Vendor's account as a result of suspicious behaviour.</p>
                            </li>
                            <li>
                                <p>Vendors agree to pay any direct or indirect taxes, including but not limited to GST, VAT or any other taxes applicable, which may apply to them depending on residency or location.</p>
                            </li>
                            <li>
                                <p>Please note that the Vendor Listing Value shown on the planetshare.in is inclusive of all such taxes and charges that may apply to the Vendor.</p>
                            </li>
                            <li>
                                <p>Appointment as Limited Payment Collection Agent: Vendor hereby appoints Planetshare, a brand of PMSL, Vendor’s limited authorized payment collection agent solely to accept payments electronically or otherwise from Buyers/Customers, and remit those payments to the Vendor after deducting the commission wherever applicable. Vendor agrees that the payment from the Customer to Planetshare is to be considered the same as a payment made directly to the Vendor.</p>
                            </li>
                            <li>
                                <p>Planetshare partners with Payment Services Providers for purposes of collecting payments from Buyers/Customers. Please note that all payment collections are done via our payment partners and not directly by the company.</p>
                            </li>
                            <li>
                                <p><strong>User Licence & Copyright:</strong> All contents/services listed out here by the Vendor on Planetshare.in are made live only after getting a confirmation from the Vendor on the rights and user licenses. Any service/content present on our website (s) will be taken down in the event of a valid report (content claimed with documents showing full rights or licences) from any user about the rights of the asset and the Vendor fails to prove that they have the rights to render or process the content in question.</p>
                            </li>
                            <li>
                                <p>It is the Vendor’s responsibility to render only those services for which they have the required rights to monetize. While we have a mechanism in place to ensure that a Vendor lists out only self-produced services, Planetshare is not liable to produce licences or prove the ownership documents on behalf of the Vendor. Please note that in no way Planetshare and its parent company (s) is responsible for the rights of the contents that we have on our website (s) as they are listed out by our service partners. </p>
                            </li>
                            <li>
                                <p>Please note that buyers can also place a custom request while executing an order which addresses specific Buyer requirements. Vendor agrees to accept and implement all points as long as they are within the vendor’s scope.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="buyers">
                        <h3>Buyers</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Any visitor can register themselves as a buyer/customer subject to age limits.</p>
                            </li>
                            <li>
                                <p>A buyer may not offer direct payments to Sellers or Vendors using payment systems outside of the Planetshare Order Peripheries.</p>
                            </li>
                            <li>
                                <p>Buyers pay Planetshare to execute an order with a Seller or a Vendor. The payment made by the buyer reaches Planetshare via our Payment Services Partner. Please note that such payments are transferred to our Service Partners after due completion of order cycle.</p>
                            </li>
                            <li>
                                <p>Please note that buyers can also place a custom request while executing an order which addresses specific Buyer requirements. While these requests or requirements are taken into consideration and all efforts are made by our service partners to implement these points to the best of our knowledge as part of our service agreement, all such requests may not be fully addressed at times or regularly if they stretch themselves beyond our service provider’s scope.</p>
                            </li>
                            <li>
                                <p>In most territories, orders may be purchased on Planetshare by using any of the following payment methods: Credit Card, Debit card and PayPal. However, additional payment methods may be incorporated in certain locations.</p>
                            </li>
                            <li>
                                <p>Please note that we at Planetshare do not store your payment details as we collect payments via our Payment Services Providers. Our Payment Services Provider may collect such information as necessary for proposes of processing the transaction or to fulfil their service obligations. Please read their Privacy Policies for more information on what details they store or get access to.</p>
                            </li>
                            <li>
                                <p>By using any payment method stated above or otherwise present on Planetshare and/or providing payment details for making purchases here on our website (s) or Mobile App (s), you represent and warrant that: (a) you are an authorised person to provide such information to our Payment Services Providers; (b) you are authorised to make payments or have the necessary permissions to execute financial transactions using the provided payment method (s); (c) your organisation has granted you the required permissions to make payments; and (d) in no way such actions violate any applicable law.</p>
                            </li>
                            <li>
                                <p>Buyers agree to pay indirect taxes (such as Sales Tax, VAT, GST or any other applicable taxes) depending on their residency or country.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="levels">
                        <h3>Levels</h3>
                        <p>Firstly, Levels are aimed at promoting an overall healthy environment and not to favour anybody. We want our users to directly rate Vendors and Sellers to let other users know about the skills and qualities of a Vendor or a Seller. We feel that by providing our users with an option to rate a Seller or a Vendor, we empower them to have their say about what they have experienced and availed. This also promotes user engagements and motivates Vendors and Sellers to take their work to the next level.</p>
                        <ul class="bullet_list">
                            <li>
                                <p>Please note that Levels are gained based on overall performance and not by any paid promotions or advertisements.</p>
                            </li>
                            <li>
                                <p>The current Levels a Seller or Vendor can achieve are, Level 1, 2, 3, 4, 5, 6, 7, and TOP RATED.</p>
                            </li>
                            <li>
                                <p>Advancement in Levels involves no manual interventions but updated periodically by an automated system.</p>
                            </li>
                            <li>
                                <p>Levels are neither fixed nor one-directional but can move both ways (Up and Down) depending upon the ratings received from buyers. Please note that a Vendor or a Seller can lose their Levels if not performed well after achieving a certain Level.</p>
                            </li>
                            <li>
                                <p>TOP RATED Sellers and Vendors are chosen manually by Planetshare experts through an ongoing review process based on several indices including but not limited to ratings, volume of completed orders, high order completion rate, etc.</p>
                            </li>
                            <li>
                                <p>Please note that TOP RATED Sellers and Vendors have access to some of the most extensive features than previous levels including but not limited to VIP Customer Support and Website Features.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="cancel_rejection">
                        <h3>Cancellation/Service Rejections</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Cancellation feature is not available for the users purchasing products from the Sellers.</p>
                            </li>
                            <li>
                                <p>Users can cancel an order placed with a Vendor only in case of Vendor services are not as per the description provided on Vendor’s listing page or if the order delivery gets delayed.</p>
                            </li>
                            <li>
                                <p>We do not encourage Vendors to reject orders. However, they can approach our Customer Support to seek help regarding cancellation.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="revenue_withdraw">
                        <h3>Revenue Withdrawals</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>As a Vendor or a Seller, you can withdraw your revenues from your Planetshare account and receive the same to your bank account. To withdraw your revenue, you must have an account with a bank. You can update your bank details in the space provided in your account section and send us your bank details to help us verify the details. Please note that we shall initiate a bank transfer to your account only.</p>
                            </li>
                            <li>
                                <p>You can opt for a bank transfer after 2 days from the time it was the fund was credited to your Planetshare account.</p>
                            </li>
                            <li>
                                <p>Revenues are only made available to place a withdrawal request from your Planetshare account page following a safety clearance period of 7 days after the amount was credited to your Planetshare account.</p>
                            </li>
                            <li>
                                <p>Please note that the bank transaction would be initiated to the Vendor's/Seller’s account only after a due process of verification.</p>
                            </li>
                            <li>
                                <p>Withdrawal requests can only be made in the amount available in the Planetshare account.</p>
                            </li>
                            <li>
                                <p>Your withdrawals may invite transfer fees depending on your residency and bank fees.</p>
                            </li>
                            <li>
                                <p>Withdrawal requests are final and cannot be taken back. We at Planetshare will not be able to reverse this process once it has begun.</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="cont_policies">
                        <h3>Content Policies</h3>
                        <p>Planetshare’s content policies are in place to ensure a positive experience for both our Users and Sellers. We invite you to please join us in this effort by respecting and adopting these guidelines. We may consider exceptions to these policies subject to public benefits.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="what_encourage">
                        <h3>What we encourage</h3>
                        <p>Original & Authentic Content</p>
                        <p>Planetshare is all about respecting user’s interest and promoting skilled creators. We request you to upload independent, original and purposeful content.</p>
                        <div class="clearfix"></div>
                    </div>
                    <div class="cont_box" id="do_not_allow">
                        <h3>What we do not allow</h3>
                        <ul class="bullet_list">
                            <li>
                                <p>Ads and sponsored content</p>
                            </li>
                            <li>
                                <p>Personal and confidential information</p>
                            </li>
                            <li>
                                <p>Misleading content</p>
                            </li>
                            <li>
                                <p>Copyrighted content</p>
                            </li>
                            <li>
                                <p>Sexually explicit content</p>
                            </li>
                            <li>
                                <p>Hateful content</p>
                            </li>
                            <li>
                                <p>Content that provokes or glorifies violence</p>
                            </li>
                            <li>
                                <p>Potentially dangerous and illegal content</p>
                            </li>
                            <li>
                                <p>Spam and malware</p>
                            </li>
                        </ul>
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <aside class="sidebar_view sticky-top">
                <div class="box">
                    <h3>Contents</h3>
                    <ul class="sup_cont_link">
                        <li class="active">
                            <a href="#keyterms" class="scrollTo">Key Terms</a>
                        </li>
                        <li>
                            <a href="#gen_terms" class="scrollTo">General Terms</a>
                        </li>
                        <li>
                            <a href="#orders" class="scrollTo">Orders</a>
                        </li>
                        <li>
                            <h4 data-target="#service_list" data-toggle="collapse" class="sub_lnk">Service Overview</h4>
                            <ul id="service_list">
                                <li>
                                    <a href="#sellers" class="scrollTo">Sellers</a>
                                </li>
                                <li>
                                    <a href="#vendors" class="scrollTo">Vendors</a>
                                </li>
                                <li>
                                    <a href="#buyers" class="scrollTo">Buyers</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#levels" class="scrollTo">Levels</a>
                        </li>
                        <li>
                            <a href="#cancel_rejection" class="scrollTo">Cancellation/Service Rejections</a>
                        </li>
                        <li>
                            <a href="#revenue_withdraw" class="scrollTo">Revenue Withdrawals</a>
                        </li>
                        <li>
                            <a href="#cont_policies" class="scrollTo">Content Policies</a>
                        </li>
                        <li>
                            <a href="#what_encourage" class="scrollTo">What we encourage</a>
                        </li>
                        <li>
                            <a href="#do_not_allow" class="scrollTo">What we do not allow</a>
                        </li>
                    </ul>
                </div>
            </aside>
            <a id="back2Top" title="Back to top" href="javascript:;">&#10148;</a>
        </div>
        <div class="clearfix"></div>
    </section>)
}
export default TermCondition;
