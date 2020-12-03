
export function ImageViewer(props){
  if (!props.imageName){ return null; }
  return(
    <div style={{marginTop:64}}>
      <img style={styles.viewerImage} alt={props.imageCaption} src={'/assets/img/'+props.imageName} />
    </div>
  )
}

const styles = {
  viewerImage: {
    width: 500,
    display: 'block',
    margin: 'auto'
  }
}