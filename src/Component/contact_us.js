import React,{useState} from 'react';
import {CONTACTUS,TAG} from '../url';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import $ from 'jquery';
const Contact=()=>{
  const [btndisable,changebtnDisable]=useState(false);
  const [warningmsg,getWarningmsg]=useState([])
  const sendQuery=(e)=>{
    e.preventDefault();
    changebtnDisable(true);
    getWarningmsg([]);
    var emailid=e.target.email.value.trim();
    var name=e.target.name.value.trim();
    var subject=e.target.subject.value.trim();
    var phone=e.target.phone.value.trim();
    var message=e.target.message.value.trim();
      axios.post(CONTACTUS, {
        user_id:localStorage.getItem('user_id'),
        email:emailid,
        name:name,
        phone_number:phone,
        message:message,
        subject:subject,
        tag:TAG
    })
    .then(response=>{
        if(response.data.success==3)
        {
          getWarningmsg(response.data.error);
          changebtnDisable(false);
        }
        else if(response.data.success=='1'){
          cogoToast.success('Your query has been submitted',{position:'bottom-center'});
          $('#contactForm').trigger("reset");
          changebtnDisable(false);
        }
        else {
          cogoToast.error('Something Went Wrong Please Try After Sometime',{position:'bottom-center'});
          changebtnDisable(false);
        }
    })
    .catch( (error)=> {
      changebtnDisable(false);
      console.log(error);
    });
  }
  return(<div>
    <section class="inner_banner1">
    <div class="box">
        <img src="images/banner_contact.jpg" alt="" />
    </div>
    <div class="clearfix"></div>
</section>
<section class="inner_cont contct_page">
    <div class="breadcrumb">
        <div class="container">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><span>Contact us</span></li>
            </ul>
        </div>
    </div>
    <div class="contct_cont">
        <div class="container">
            <div class="addr_box">
                <div class="box l">
                    <h2>Corporate Head Office</h2>
                    <address>C-34, Sector-62, Electronic City, <br/>Noida-201 307 (UP), India.</address>
                    <p>Fax: <a href="faxto:911202400474">+91-120-2400474</a></p>
                    <p><a href="callto:911202400780">+91-120-2400780</a>, <a href="callto:911202402301">911202402301-10</a></p>
                </div>
                <div class="box r">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.632375197353!2d77.36569645017387!3d28.610803491729676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5663c97e9cd%3A0xb22c763430e09779!2sPlanetcast%20Media%20Services%20Limited!5e0!3m2!1sen!2sin!4v1576840912541!5m2!1sen!2sin" width="" height="" frameborder="0" style={{border:"0"}} allowfullscreen=""></iframe>
                </div>
            </div>
            <div class="addr_box flip">
                <div class="box l">
                    <h2>Registered Office</h2>
                    <address>1121, Hemkunt Chambers, 11th Floor, <br/>89 Nehru Place, New Delhi-110019, India</address>
                </div>
                <div class="box r">
                    <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7374604728266!2d77.25022551549395!3d28.547609994669312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c55fcb6929%3A0xc1915416d869c7ed!2sHemkunt+Towers%2C+Nehru+Pl+Market+Rd%2C+Nehru+Place%2C+New+Delhi%2C+Delhi+110048!5e0!3m2!1sen!2sin!4v1536324104635" width="" height="" frameborder="0" style={{border:"0"}} allowfullscreen=""></iframe>
                </div>
            </div>
            <div class="addr_box sub_add">
                <div class="box">
                    <div class="cont">
                        <h2>Mumbai</h2>
                        <address>Unit No. 109-114, Ground floor B-wing, ORM Mall, Royal Palms Mayur Nagar, Goregaon East Mumbai-400065</address>
                        <p>Fax: <a href="faxto:912228766475">91-22-28766475</a></p>
                        <p><a href="callto:912228766473">+91-22-28766473</a></p>
                    </div>
                </div>
                <div class="box">
                    <div class="cont">
                        <h2>Cochin</h2>
                        <address>Door No : 174/a, Kottappuram Road,Near Aroor Church, Aroor Post, Alappuzha Dist Kerala-688 534</address>
                    </div>
                </div>
                <div class="box">
                    <div class="cont">
                        <h2>Hyderabad</h2>
                        <address>3-3-111/62, Sirimalle Nagar Hyderguda, Attapur Hyderabad-500 048, India</address>
                    </div>
                </div>
            </div>
            <div class="feed_form">
                <form onSubmit={sendQuery} id="contactForm">
                    <h2>Give Us Feedback</h2>
                    <div class="row">
                        <div class="col col-md-6">
                            <div class="inputbox">
                                <input type="text" placeholder="Name*" name="name" required/>
                            </div>
                        </div>
                        <div class="col col-md-6">
                            <div class="inputbox">
                                <input type="email" placeholder="Email*" name="email" required/>
                            </div>
                        </div>
                        <div class="col col-md-6">
                            <div class="inputbox">
                                <input type="text" placeholder="Phone no.*"  name="phone" required/>
                            </div>
                        </div>
                        <div class="col col-md-6">
                            <div class="inputbox">
                                <input type="text" placeholder="Subject*" name="subject" required/>
                            </div>
                        </div>
                        <div class="col col-md-12">
                            <div class="inputbox">
                                <textarea placeholder="Leave Your Message here" name="message" required></textarea>
                            </div>
                        </div>
                        <div class="buttons">
                            <button type="submit" class="btndefault" disabled={btndisable}>Submit</button>
                        </div>
                        {warningmsg.length>0 && <div class="error_box" id="err_msg_effect">
                                <ul>
                                  {warningmsg.map((res,key)=>{
                                    return(<li key={key}><p>{res}</p></li>)
                                  })}
                                </ul>
                              </div>}
                    </div>
                </form>
            </div>
            <div class="addr_box sub_add q">
                <div class="box">
                    <div class="cont">
                        <h2>General Queries</h2>
                        <address>Unit No. 109-114, Ground floor B-wing, ORM Mall, Royal Palms Mayur Nagar, Goregaon East Mumbai-400065</address>
                        <p><a href="mailto:info@planetc.net">info@planetc.net</a></p>
                    </div>
                </div>
                <div class="box">
                    <div class="cont">
                        <h2>Public Relations</h2>
                        <p>Satyandre Yadav</p>
                        <p><a href="mailto:satyandrey@planetc.net">satyandrey@planetc.net</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
</section>
    </div>)
}
export default Contact;
