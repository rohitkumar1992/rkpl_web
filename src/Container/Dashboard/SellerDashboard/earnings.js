import React from 'react';
import LoadingGif from '../../../Component/Loader/loading_gif'
class Earnings extends React.Component{
  state={loading:false,loading_msg:'Please Wait'}
  componentDidMount(){
        setTimeout(()=>this.setState({loading:true}),1000)
  }
  render()
  {
    const {loading,loading_msg}=this.state
    if(loading)
    {
    return(<section class="dashb_cont top_div">
        <div class="container">
            <div class="content_dash earning_dash">
                <h2>Earnings <span>Expected Earnings: <i class="fa fa-inr"></i>0</span></h2>
                <div class="price_analys_box">
                    <ul>
                        <li>
                            <p>Net Income</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Withdrawn</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Used for Purchases</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Pending Clearance</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                        <li>
                            <p>Available for Withdrawal</p>
                            <span class="price"><i class="fa fa-inr"></i>0</span>
                        </li>
                    </ul>
                    <div class="clearfix"></div>
                </div>

                <form action="javascript:;" class="earn_comp">
                    <div class="rev_action">
                        <label>Withdraw</label>
                        <div class="earn_btns">
                            <button type="button" class="btndefault" data-toggle="tooltip" title="No Earnings to Withdraw">
                                <i class="fa fa-paypal" aria-hidden="true"></i>  Paypal Account
                            </button> &nbsp;
                             <button type="button" class="btndefault" data-toggle="tooltip" title="New! Bank Transfer withdrawals. Click the button to learn more.">
                                <i class="fa fa-university" aria-hidden="true"></i>Bank transfer
                            </button>
                        </div>
                    </div>
                    <div class="rev_action">
                        <label>Show</label>
                        <div class="selectbox">
                            <select class="select_i">
                                <option>Everything</option>
                                <option>Withdrawn</option>
                                <option>Pending Clearance</option>
                                <option>Cancelled Revenues</option>
                                <option>Cleared</option>
                                <option>Used for Purchases</option>
                            </select>
                            <select class="select_i">
                                <option>2019</option>
                                <option>2018</option>
                            </select>
                            <select class="select_i">
                                <option selected>All Months</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </select>
                        </div>
                    </div>
                </form>

                <div class="table-responsive">
                    <table class="table table-hover gigactive">
                        <tbody>
                            <tr>
                                <th><span>Date</span></th>
                                <th><span>For</span></th>
                                <th class="text-right"><span>Amount</span></th>
                            </tr>
                            <tr>
                                <td colspan="3" class="text-center">There are no transactions to show here...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
    </section>)
  }
  else {
    return(<LoadingGif message={loading_msg}/>)
  }
  }
}
export default Earnings;
