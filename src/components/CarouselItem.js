import React from 'react';

/**
 * Simple component to render the carousel image.
 * @see Carousel
 */
class CarouselItem extends React.Component{

  render(){
    return(
      <div onClick={ () => this.props.selectCarouselItem(this.props) } style={{flex: 1}}>
        <img style={{maxWidth:'100%'}} alt={this.props.imageCaption} src={'/assets/img/'+this.props.imageName} />
      </div>
    )
  }

}

export default CarouselItem;