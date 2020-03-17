import React from 'react';
import {Link} from 'react-router-dom'
const Review=()=>{
  return(<section class="vendor_verf">
        <div class="msg_box">
            <h2>Thank You!</h2>
            <p>Thanks for filling out the Seller Registration Form and showing your interest in Planetshare. Your request has been successfully submitted and, our team is reviewing the same. Please wait for our team to complete the verification process. We shall get back to you within 24 hours.</p>
            <div class="buttons">
                <Link to="/web" class="btndefault">Go back to home</Link>
            </div>
        </div>
    </section>)
}
export default Review
