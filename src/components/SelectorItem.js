import React from 'react'

/**
 * SelectorItem handles the items that appear in the image selector and their
 * onclick events, as fed by the Selector Parent Component
 * @see Selector
 */
export class SelectorItem extends React.Component{

  constructor(props){
    super(props);
    this.state = { selected: false }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(){
    this.props.onClick( { index: this.props.index, selected: this.props.selected } );
  }

  render(){
    return(
      <div style={this.props.selected ? styles.selected : styles.container } onClick={this.handleSelect} >
        <img style={styles.SelectorItem} alt={this.props.imageCaption} src={'/assets/img/'+this.props.imageName} />
        <span>{this.props.imageCaption}</span>
      </div>
    )
  }
}

const styles={
  container: {
    maxWidth: 100,
    margin: 10,
    border: '1px solid transparent'
  },
  selected: {
    border: '1px solid blue',
    borderRadius: 5,
    maxWidth: 100,
    margin: 10
  },
  SelectorItem: {
    width: 100
  }
}

export default { SelectorItem };