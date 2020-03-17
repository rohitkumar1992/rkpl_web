import React from 'react';
import {
  EmailShareButton,
  FacebookShareCount,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  GooglePlusShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
class Share extends React.Component{
  render()
  {
    const shareLink=`http://planetshare.in/#${this.props.url}`;
    const title="test"
    return(
      <section className="c-network">
        <div className="network">
          <FacebookShareButton
            url={shareLink}
            className="network__share-button"
          >
            <FacebookIcon
              size={"2rem"} // You can use rem value isntead of numbers
              round
            />
          </FacebookShareButton>

        </div>

        <div className="network">
          <TwitterShareButton
            url={shareLink}
            className="network__share-button"
          >
            <TwitterIcon size={"2rem"} round />
          </TwitterShareButton>

          <div className="network__share-count">&nbsp;</div>
        </div>

        <div className="network">
          <WhatsappShareButton
            url={shareLink}
            separator=":: "
            className="network__share-button"
          >
            <WhatsappIcon size={"2rem"} round />
          </WhatsappShareButton>

          <div className="network__share-count">&nbsp;</div>
        </div>

        <div className="network">
          <LinkedinShareButton
            url={shareLink}
            windowWidth={750}
            windowHeight={600}
            className="network__share-button"
          >
            <LinkedinIcon size={"2rem"} round />
          </LinkedinShareButton>
        </div>


        {/*<div className="network">
          <PinterestShareButton
            url={shareLink}
            media={`${shareImage}`}
            windowWidth={1000}
            windowHeight={730}
            className="network__share-button"
          >
            <PinterestIcon size={"2rem"} round />
          </PinterestShareButton>

          <PinterestShareCount
            url={shareLink}
            className="network__share-count"
          />
        </div>*/}
        <div className="network">
        <TelegramShareButton
        url={shareLink}
        body="body"
      className="network__share-button"><TelegramIcon size={"2rem"} round /></TelegramShareButton>
      </div>
        <div className="network">
          <EmailShareButton
            url={shareLink}
            body="body"
            className="network__share-button"
          >
            <EmailIcon size={"2rem"} round />
          </EmailShareButton>
        </div>
        <button onClick={this.props.onClose}><i class="fa fa-times" aria-hidden="true"></i></button>
      </section>

)
  }
}
export default Share;
{/*<FacebookShareButton url={`http://planetshare.in${this.props.url}`} ><FacebookIcon/></FacebookShareButton>
<WhatsappShareButton url={`http://planetshare.in${this.props.url}`} ><WhatsappIcon/></WhatsappShareButton>
<TelegramShareButton url={`http://planetshare.in${this.props.url}`} ><TelegramIcon/></TelegramShareButton>
<TwitterShareButton url={`http://planetshare.in${this.props.url}`} ><TwitterIcon/></TwitterShareButton>
<EmailShareButton url={`http://planetshare.in${this.props.url}`} ><EmailIcon/></EmailShareButton>*/}
