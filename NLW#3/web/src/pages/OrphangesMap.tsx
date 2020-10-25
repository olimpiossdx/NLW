import React from 'react'
import { Link } from 'react-router-dom';

import '../styles/pages/orphanges-map.css';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarketSvg from '../images/map-marker.svg';
import happyMapIcon from '../utils/mapIcon';
import Api from '../service/api';

export interface IImage {
  id: number;
  url: string;
}

export interface IOrphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: IImage[];
};

const OrphangesMap = () => {
  const [orphanages, setOrphanages] = React.useState<IOrphanage[]>([]);

  React.useEffect(() => {
    Api.get<IOrphanage[]>('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

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
      </aside >

      <Map
        center={[-19.8790132, -44.0103913]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
        {orphanages.map(orphanage => <Marker icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
          <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>
            {orphanage.name}
            <Link to={`orphanges/${orphanage.id}`}>
              <FiArrowRight />
            </Link>
          </Popup>
        </Marker>)}
      </Map>
      <Link to='/orphanges/create' className='create-orphanage'>
        <FiPlus size={32} color='#FFF' />
      </Link>
    </div >
  )
}

export default OrphangesMap;
//-19.8790132,-44.0103913,15z