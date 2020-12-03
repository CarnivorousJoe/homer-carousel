import React from 'react';

//todo: Bubble up CarouselItem onClick() to display image in Viewer
class CarouselItem extends React.Component{

  render(){
    return(
      <div onClick={ this.props.selectCarouselItem } style={{flex: 1}}>
        <img style={{maxWidth:'100%'}} alt={this.props.imageCaption} src={'/assets/img/'+this.props.imageName} />
      </div>
    )
  }

}

export default CarouselItem;