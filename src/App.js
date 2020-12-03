import React from 'react';
import imageList from './lib/carouselImages.json'
import Selector from './components/Selector';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import { ImageViewer } from './components/ImageViewer';
class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      carouselItems: [],
      pickerList: []
    }

    this.imageList = imageList.carouselImages.sort( (a, b) => { return (a.imageCaption > b.imageCaption) ? 1 : -1 } )
    this.pushToCarousel = this.pushToCarousel.bind(this);
    this.pushToViewer = this.pushToViewer.bind(this);
    this.queueCarouselRemoval = this.queueCarouselRemoval(this);
  }

  //Bridge between <Picker /> and <Carousel />
  pushToCarousel( selectedItems, itemsArray ){
    let carouselCandidates = itemsArray.filter((item, idx) => {
      return ( selectedItems.indexOf( idx ) > -1 )
    })

    this.setState({ carouselItems: 
      this.state.carouselItems.concat(
        carouselCandidates.map( this.propagateCarouselItems.bind(this) )
      ),
      pickerList: itemsArray
    });
  }

  //Bridge between <Carousel /> and <ImageViewer />
  pushToViewer( { imageName, imageCaption } ){
    this.setState({ viewerImageName: imageName, viewerImageCaption: imageCaption });
  }

  /* todo: Filter this.state.carouselItems by item.props.index
     Add <SelectorItem>(s) back to this.state.pickerList,
     Pickerlist will be read as new authoritative source
     on <Selector> re-render.
  */
  queueCarouselRemoval( removalCandidates ){
    //Stub
    return true;
  }

  //Generate <CarouselItem />(s) from raw list.
  propagateCarouselItems( item, index ){
    index = this.state.carouselItems.length + index;
    return <CarouselItem editCarouselItem={this.queueCarouselRemoval} selectCarouselItem={this.pushToViewer} key={index} index={index} imageName={item.imageName} imageCaption={item.imageCaption} />
  }

  render(){
    return (
      <div className="App" style={styles.app}>
        <Selector pickerList={this.state.pickerList} imageList={this.imageList} pushToCarousel={this.pushToCarousel} />
        <Carousel carouselItems={this.state.carouselItems} />
        <ImageViewer imageName={this.state.viewerImageName} imageCaption={this.state.viewerImageCaption}/>
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
