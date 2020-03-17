import React from 'react';
class Bidding extends React.component{
  render()
  {
    return(<section class="view_detail gig_preview bid_preview">
        <article class="top_links sticky-top">
            <nav>
                <ul>
                    <li>
                        <a href="#overview">Overview</a>
                    </li>
                    <li>
                        <a href="#description">Description</a>
                    </li>
                    <li>
                        <a href="#prod_detail">Production Details</a>
                    </li>
                    <li>
                        <a href="#cast_crew">Cast & Crew</a>
                    </li>
                    <li>
                        <a href="#make_offer">Make an Offer</a>
                    </li>
                </ul>
                <div class="actions">
                    <div class="fav_links">
                        <div class="fav">
                            <a href="javascript:;"><i class="fa fa-pencil" aria-hidden="true"></i> Edit Bid</a>
                        </div>
                    </div>
                </div>
            </nav>
        </article>
        <article class="view_page">
            <div class="container">
                <div class="main_cont">
                    <div class="box">
                        <div class="overview" id="overview">
                            <h2>The Turning Point <span>Movie</span></h2>
                            <div class="user_overview">
                                <div class="user_img">
                                    <div class="name">
                                        <p>
<span>Movie</span> | <span>0hr30m</span> | <span>4K</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="user_rating">
                                    <div class="star">
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star checked"></span>
                                        <span class="fa fa-star"></span>
                                        <span class="fa fa-star"></span>
                                    </div>
                                    <div class="ttl_rat">5.0</div>
                                </div>
                            </div>
                            <div class="video_area">
                                <div class="img">
                                    <img src="images/bidding_img1.jpg" />
                                </div>
                            </div>
                        </div>
                        <div class="desc" id="description">
                            <h3>About This Bid</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <div class="lang">
<label>Department:</label>
                                <p>Planetcast Media - General</p>
                            </div>
                            <div class="lang">
<label>Languages:</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="lang">
                                <label>Dubbing Languages:</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="lang">
                                <label>Subtitle Languages:</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="lang">
<label>Genre(s):</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="lang">
<label>Keywords:</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="prof_card" id="prod_detail">
                            <h3>Production Details</h3>
                            <div class="stats_desc">
                                <ul class="user_stats">
                                    <li>Production Studios: <strong>Israel</strong></li>
                                    <li>Year of Release: <strong>July 2016</strong></li>
                                    <li>Country(ies) of origin: <strong>India</strong></li>
                                </ul>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="desc" id="cast_crew">
                            <h3>Cast & Crew</h3>
                            <div class="lang">
                                <label>Cast members:</label>
                                <p>Planetcast Media - General</p>
                            </div>
                            <div class="lang">
<label>Producer(s):</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="lang">
<label>Director(s):</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="lang">
                                <label>Writer(s) :</label>
                                <p>Albanian, Arabic, Bengali, Bulgarian, Czech</p>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <div class="desc makeoffr" id="make_offer">
                            <h3>Make an Offer</h3>
                            <div class="lang">
                                <label>Offer Price:</label>
                                <p><i class="fa fa-inr" aria-hidden="true"></i>3000</p>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
                <aside class="sidebar_view sticky-top">
                   <div class="bid_trial">
                        <h2>Trial Video</h2>
                        <video controls>
                          <source src="images/video/transcoding.mp4" type="video/mp4" />
                        </video>
                    </div>
                </aside>
            </div>
        </article>
        <div class="clearfix"></div>
    </section>
)
  }
}
export default Bidding;
