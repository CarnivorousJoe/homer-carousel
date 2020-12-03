import React from 'react';
import { SelectorItem } from './SelectorItem.js'

/**
 * Selector is responsible for handling selected items for addition to the carousel,
 * as well as proactively processing lists of items to generate it's child components.
 * When a list of items is confirmed, that information bubbles up to the root App,
 * where it will then be sent down the chain to the Carousel.
 */
class Selector extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      images: this.props.imageList || this.props.pickerList,
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

  mapSelectorItems(imageObj, index){
    return <SelectorItem selected={ this.state.candidates.indexOf(index) > -1 } onClick={this.selectImage} key={index} index={index} imageName={imageObj.imageName} imageCaption={imageObj.imageCaption} />
  }

  render(){
    let isAddButtonDisabled = !this.state.candidates.length ? false : true;
    return(
      <div style={{marginBottom: 64}}>
        <div style={styles.selectorContainer}>
          { this.state.images.map( this.mapSelectorItems.bind(this) ) }
        </div>
        <div>
          <button style={isAddButtonDisabled ? styles.addButton : styles.addButtonDisabled} onClick={this.pushImage} disabled={!isAddButtonDisabled} >
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
  },
  addButton: {
    border:'none',
    background: 'blue',
    color: 'white',
    fontSize: 18,
    fontWeight: 900,
    width: 210,
    padding: 16
  },
  addButtonDisabled: {
    border:'none',
    background: 'lightgrey',
    color: 'black',
    fontSize: 18,
    fontWeight: 900,
    width: 210,
    padding: 16
  }
}

export default Selector;