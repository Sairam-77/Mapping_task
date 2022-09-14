import {React, useState,useContext} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import covidData from '../data.json'
import icon1 from '../images/icon.png'
import { useNavigate } from 'react-router-dom';
import { Context } from '../App'


const covidIcon = new Icon({
  iconUrl: icon1,
  iconSize: [25, 25]
})


function Map() {
    const navigate = useNavigate();
    const {setSelected} = useContext(Context);
    const [ activeCovid, setActiveCovid ] = useState( null );
  return <>
  <h2 className='text-center p-3'>Covid Details</h2>
  <div className='main'>

      <MapContainer 
          center = { [ 20.593683, 78.962883 ] }
          zoom = { 5 }
          scrollWheelZoom = { true } 

      >
      <TileLayer 
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />

       {/* <TileLayer 
          attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' 
          url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> */}
       { covidData.map(eachData => (
         <Marker 
            key={eachData.Id} 
            position= {[eachData.Latitude, eachData.Longitude]}
            eventHandlers={{
              click: () => {
                setSelected(eachData)
                navigate('/detail')
              },
              mouseover:()=>{
                setActiveCovid(eachData)
              }
            }}
            icon= {covidIcon}
          />
       ))}

      { activeCovid && (
        <Popup 
          position={ [ activeCovid.Latitude, activeCovid.Longitude ] }
          onClose={()=>{
            setActiveCovid(null)
          }}
        >
          <div>
            <h3>{ activeCovid.Location }</h3>
            <p>Population:                { activeCovid.Population }</p>
            <p>Male:         { activeCovid.Male}</p>
            <p>Female: { activeCovid.Female }</p>
          </div>
        </Popup>
      )}

      </MapContainer> 

      <table className='table table-hover t1 text-center'>
        <thead>
            <tr>
            <th scope="col">State</th>
            <th scope="col">Death Rates</th>
            </tr>
        </thead>
        <tbody>
            {
               covidData.map((e)=>{
                return <tr>
                    <td onClick={()=>{
                        setSelected(e)
                        navigate('/detail')
                    }} style={{cursor:"pointer"}}>{e.Location}</td>
                    <td className='text-danger'>{e.death}</td>
                </tr>
               }) 
            }
        </tbody>
      </table>
  
      </div>
      </>
}

export default Map;

