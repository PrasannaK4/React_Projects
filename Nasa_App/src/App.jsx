import { useEffect, useState } from "react";
import Main from "./Components/Main"
import Footer from "./Components/Footer"
import SideBar from "./Components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loadind, setLoading] = useState()
  const [showModal, setShowModal] = useState(false);
  function handleToggleModal(){
    setShowModal(!showModal)
  }

  useEffect(()=>{
    
    async function fetchApiData(){
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=c6ynAfBEAX22JqNMghqiHz4O4ljXXatBhnRoZ0my`
      try{
        const res = await fetch(url)
        const apiData = await res.json();
        setData(apiData)
        console.log(apiData)

      }
      catch{
        console.log(error.message)
      }
    }
    fetchApiData();

  },[])

  return (
    <>
      {data ? (<Main  data={data}/>) : (<div className="loadingState">
      <i className="fa-solid fa-gears"></i>
      </div>)}
      {showModal &&
        (<SideBar data= {data} handleToggleModal={handleToggleModal}/>)
      }
      {data && (<Footer data= {data} showModal={showModal} handleToggleModal={handleToggleModal}/>)}
    </>
  )
}

export default App
