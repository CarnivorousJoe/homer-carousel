import React from 'react';
import { SelectorImage } from './SelectorImage.js'

class Selector extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      images: this.props.imageList,
      candidates: []
    }

    this.selectImage = this.selectImage.bind(this);
    this.pushImage = this.pushImage.bind(this);
  }

  selectImage( { index, selected } ){
    let candidates = [ ...this.state.candidates ]
    selected ? candidates.splice( candidates.indexOf(index), 1 ) : candidates.push(index);

    this.setState( { candidates } ) ;
  }

  pushImage( ){
    let reducedArray = this.state.images.filter( (img, index) => this.state.candidates.indexOf(index) < 0 )
    
    this.props.pushToCarousel( this.state.candidates, this.state.images );
    
    this.setState({
      images: reducedArray,
      candidates: []
    });
  }

  mapSelectorImages(imageObj, index){
    return <SelectorImage selected={ this.state.candidates.indexOf(index) > -1 } onClick={this.selectImage} key={index} index={index} imageName={imageObj.imageName} imageCaption={imageObj.imageCaption} />
  }

  render(){
    return(
      <div>
        <div style={styles.selectorContainer}>
          { this.state.images.map( this.mapSelectorImages.bind(this) ) }
        </div>
        <div>
          <button onClick={this.pushImage} disabled={this.state.candidates.length ? false : true} >
            Add
          </button>
        </div>
      </div>
    )
  }
}

const styles = {
  selectorContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
}

export default Selector;