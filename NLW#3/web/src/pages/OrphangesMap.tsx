import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/pages/orphanges-map.css';
import mapMarketSvg from '../images/map-marker.svg';
import { FiPlus } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css'
import { Map, TileLayer } from 'react-leaflet';

const OrphangesMap = () => {
  return (
    <div id='page-map'>
      <aside>
        <header>
          <img src={mapMarketSvg} alt='' />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>

        </header>

        <footer>
          <strong>Minas Gerais</strong>
          <strong>Belo Horizonte</strong>
        </footer>
      </aside>
      <Map
        center={[-19.8790132, -44.0103913]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <Link to='' className='create-orphanage'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div>
  )
}

export default OrphangesMap;
//-19.8790132,-44.0103913,15z