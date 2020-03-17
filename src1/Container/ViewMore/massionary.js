import * as React from 'react';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Gallery extends React.Component {

    render() {
        const childElements = this.props.view_more_result.map((res,key)=>{
           return (
                <li className="image-element-class">
                    <img src={res.large_img} />
                </li>
            );
        });

        return (
          <div>
            <Masonry
               className="my-masonry-grid"
               style={{width:"100%"}}
                elementType={'ul'}
                options={masonryOptions}
                disableImagesLoaded={false}
                updateOnEachImageLoad={true}
                imagesLoadedOptions={imagesLoadedOptions}
            >
             <div className="row my-bg-image-el" style={{margin:20}}>{ this.props.view_more_result.map((res,key)=>{
                return (
                         <div class="col-md-3" style={{padding:10}}><img src={res.large_img} /></div>
                 );
             })}</div>
            </Masonry>
            </div>
        );
    }
}

export default Gallery;
