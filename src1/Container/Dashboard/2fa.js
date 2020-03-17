import React from 'react';
import axios from 'axios';
class TwoFactorAuth extends React.Component
{
  state={isLoading:false,data:''}
  componentDidMount()
  {
    axios.post('http://localhost/Shantanu_project/OTT_LIVE_WORK/LARAVEL_WORK/NEW_PLANETSHARE/Planetshare/public/api/2fa',{
      id:2,
      name:'shaan',
      email:'amark.sw@planetc.net'
    })
  .then(response=>{

    this.setState({isLoading:true,data:response.data.data})
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  formSubmit=(e)=>{
    e.preventDefault();
    var otp=e.target.otp.value.trim();
    axios.post(`http://localhost/Shantanu_project/OTT_LIVE_WORK/LARAVEL_WORK/NEW_PLANETSHARE/Planetshare/public/api/validateInput`,{
      code:otp,
      id:2,
      name:'shaan',
      email:'amark.sw@planetc.net'
    })
  .then(response=>{
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
  render()
  {
    const {isLoading}=this.state;
    if(isLoading)
    {
      return(<div>
        <img src={this.state.data} />
      <form onSubmit={this.formSubmit}>
      <input type="text" name="otp"/>
      <button type="submit">Send</button>
      </form></div>
    );
    }
    else
     {
      return(<div>Loading...</div>)
    }
  }
}
export default TwoFactorAuth;
