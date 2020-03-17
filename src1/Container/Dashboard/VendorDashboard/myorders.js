import React from 'react';
import LoadingGif from '../../../Component/Loader/loading_gif'
class Analytics extends React.Component{
  render()
  {
    return( <section class="dashb_cont orders_page top_div">
        <div class="container">
            <div class="db_cont_head">
                <h2>Manage Sales</h2>
                <div class="searchbox">
                    <form action="javascript:;">
                        <div class="inputbox">
                            <i class="fa fa-search" aria-hidden="true"></i>
                            <input type="text" placeholder="Search my history" />
                            <button type="submit">Search</button>
                        </div>
                        <div class="clearfix"></div>
                    </form>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="db_tabs">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#order_priority">Priority <span>1</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_new">New</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_active">Active</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_late">Late</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_del">Delivered</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_comp">Completed</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_can">Cancelled</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#order_star">Starred</a>
                    </li>
                </ul>
            </div>
            <div class="db_tab_cont">
                <div class="tab-content">
                    <div class="tab-pane active" id="order_priority">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Priority Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>

                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_new">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">New</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_active">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Active Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_late">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Late Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_del">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Delivered Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_comp">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Completed Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_can">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Cancelled Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane" id="order_star">
                        <div class="table-responsive">
                            <table class="table table-hover gigactive">
                                <thead>
                                    <tr>
                                        <th colspan="9"><span class="title">Starred Orders</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        <th colspan="2">buyer</th>
                                        <th><span>Gig</span></th>
                                        <th></th>
                                        <th><span>Due On</span></th>
                                        <th><span>Total</span></th>
                                        <th><span>Note</span></th>
                                        <th><span>Status</span></th>
                                    </tr>
                                    <tr>
                                        <td colspan="9" class="text-center">No priority orders to show.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
    </section>)
  }
}
export default Analytics;
