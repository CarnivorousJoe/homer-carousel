import React from 'react'

export class SelectorImage extends React.Component{

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
        <img style={styles.selectorImage} alt={this.props.imageCaption} src={'/assets/img/'+this.props.imageName} />
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
  selectorImage: {
    width: 100
  }
}

export default { SelectorImage };