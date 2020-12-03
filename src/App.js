import React from 'react';
import imageList from './lib/carouselImages.json'
import Selector from './components/Selector';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      carouselItems: []
    }

    this.imageList = imageList.carouselImages.sort( (a, b) => { return (a.imageCaption > b.imageCaption) ? 1 : -1 } )
    this.pushToCarousel = this.pushToCarousel.bind(this);
    this.pushToViewer = this.pushToViewer.bind(this);
  }

  pushToCarousel( selectedItems, itemsArray ){
    let carouselCandidates = itemsArray.filter((item, idx) => {
      return ( selectedItems.indexOf( idx ) > -1 )
    })

    this.setState({ carouselItems: 
      this.state.carouselItems.concat(
        carouselCandidates.map( this.propagateCarouselItems.bind(this) )
      )
    });
  }

  //todo: apply this to the image viewer
  pushToViewer( { imageName, imageCaption } ){
    this.setState({ viewerImageName: imageName, viewerImageCaption: imageCaption });
  }

  propagateCarouselItems( item, index ){
    index = this.state.carouselItems.length + index;
    return <CarouselItem selectCarouselItem={this.pushToViewer} key={index} index={index} imageName={item.imageName} imageCaption={item.imageCaption} />
  }

  render(){
    return (
      <div className="App" style={styles.app}>
        <Selector imageList={this.imageList} pushToCarousel={this.pushToCarousel} />
        <Carousel carouselItems={this.state.carouselItems} />
      </div>
    );
  }
}

const styles = {
  app: {
    textAlign: 'center'
  }
}

export default App;
