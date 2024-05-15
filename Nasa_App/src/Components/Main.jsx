

function Main(props) {
  const {data}  = props;
 

    return (
      <div className="imageContainer">
        <img src={data.url} alt={data.title || 'bg-img'} className="bgImage"/>
      </div>
    )
  }
  
  export default Main