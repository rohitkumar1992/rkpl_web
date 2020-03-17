import React, { Component } from 'react';
import Authentication from '../../Container/Authentication/Authentication';
import {BrowserRouter, Router,Link,Route,Switch,HashRouter,Redirect} from "react-router-dom";
import BreadCrumb from '../../Component/breadcrumb';
import HomeBanner from '../../Component/homebanner';
import SecondaryContent from '../HomeData/homedata';
class Home extends Component {
  render() {
    return (
      <div>
        <HomeBanner/>
        <section class="learn_bar">
        <div class="container">
            <div class="l_more">
                <p>Does your business or project need images, videos and fresh content?<span>PlanetShare can help.</span></p>
                {/*<a href="javascript:" class="btndefault">Learn more</a>*/}
            </div>
        </div>
        <div class="clearfix"></div>
    </section>
        <SecondaryContent/>
      </div>
    );
  }
}

export default Home;
