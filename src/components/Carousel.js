import React from 'react';

class Carousel extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentStep: 0,
      visible: 3,
    }
  }

  /* Sort carousel items by their caption and filter to ensure we 
  are only displaying correct quantity starting at the current step index. */
  prepareCarouselItems(){
    return this.props.carouselItems
    .sort( (a, b) => (a.props.imageCaption > b.props.imageCaption) ? 1 : -1)
    .filter( (e, idx) => { return (idx >= this.state.currentStep * this.state.visible) && (idx < (this.state.currentStep * this.state.visible) + this.state.visible ) } )
  }

  render(){
    if (!this.props.carouselItems.length){ return null; }
    
    let isForwardDisabled = ( (this.state.currentStep + 1) * this.state.visible >= this.props.carouselItems.length | 0 );
    let isReverseDisabled = !this.state.currentStep;

    return(
      <div>
        <div style={styles.carouselContainer}>
          <button disabled={ isReverseDisabled } style={styles.carouselButton} onClick={() => this.setState({currentStep: this.state.currentStep-1})}> &#x25c0; </button>
          <div style={{
            ...styles.carousel, gridTemplateColumns: 'repeat('+ this.state.visible+', 1fr)'
            }}>
          { this.prepareCarouselItems() }
          </div>
          <button disabled={ isForwardDisabled } style={styles.carouselButton} onClick={() => this.setState({currentStep: this.state.currentStep+1})}> &#x25B6; </button>
        </div>
        <div>
          <select defaultValue={3} onChange={(e) => this.setState({ visible: parseInt(e.target.value) })}>
            <option value={2}> 2 </option>
            <option value={3}> 3 </option>
            <option value={4}> 4 </option>
            <option value={5}> 5 </option>
          </select>
        </div>
      </div>
    )
  }
}

const styles = {
  carousel: {
    display: 'grid',
    maxWidth: 500,
    margin: 'auto'
  },
  carouselContainer: {
    display: 'inline-flex',
    margin: 'auto'
  },
  carouselButton: {
    width: 110,
    background: 'none',
    border: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '36px',
    cursor: 'pointer'
  }
}

export default Carousel;