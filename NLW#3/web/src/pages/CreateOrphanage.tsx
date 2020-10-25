import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from 'react-icons/fi';
import * as Leaflet from 'leaflet';

import '../styles/pages/create-orphanage.css';
import Sidebar from '../components/Sidebar';
import happyMapIcon from '../utils/mapIcon';
import { LatLngLiteral } from 'leaflet';
import Api from '../service/api';
import { AxiosError, AxiosResponse } from 'axios';

const CreateOrphanage: React.FC<{}> = () => {
  const [position, setPosition] = React.useState<LatLngLiteral>({ lat: 0, lng: 0 });
  const [openOnWeekends, setOpenOnWeekends] = React.useState(false);
  const [images, setImages] = React.useState<HTMLInputElement['files']>(null);
  const [previewImages, setPreviewImages] = React.useState<string[]>([]);

  const handleMapClick = (event: Leaflet.LeafletMouseEvent) => setPosition(event.latlng);

  const handleSubmitAsync = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const sendData = new FormData();

    form.forEach((value, key) => sendData.append(key, value));

    sendData.append('latitude', position.lat.toString());
    sendData.append('longitude', position.lng.toString());
    sendData.append('open_on_weekends', `${openOnWeekends}`);

    if (images) {
      Array.from(images).map(image => sendData.append('images', image));
    };

    await Api.post('/orphanages', sendData)
      .then((response: AxiosResponse) => {
        alert('Cadastro realizado com sucesso!')
      }).catch((error: AxiosError) => {
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };

  const handleSelectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setImages(event.target.files);

    setPreviewImages(Array.from(event.target.files).map(image => URL.createObjectURL(image)));
  };

  return (
    <div id='page-create-orphanage'>
      <Sidebar />

      <main>
        <form onSubmit={handleSubmitAsync} className='create-orphanage-form'>
          <fieldset>
            <legend>Dados</legend>

            <Map
              //TODO: Alterar para pegar de acordo com a localização
              center={[-19.9026615, -44.1041363]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.lat !== 0 && (<Marker interactive={false} icon={happyMapIcon} position={[position.lat, position.lng]} />)};

            </Map>

            <div className='input-block'>
              <label htmlFor='name'>Nome</label>
              <input id='name' name='name' />
            </div>

            <div className='input-block'>
              <label htmlFor='about'>Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea name='about' id='about' maxLength={300} />
            </div>

            <div className='input-block'>
              <label htmlFor='images'>Fotos</label>

              <div className='images-container'>

                {previewImages.map(image => <img src={image} key={image} alt={image} />)}

                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#15b6d6' />
                </label>

              </div>
              <input multiple type='file' id='image[]' onChange={handleSelectImages} accept='image/*' />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className='input-block'>
              <label htmlFor='instructions'>Instruções</label>
              <textarea id='instructions' name='instructions' />
            </div>

            <div className='input-block'>
              <label htmlFor='opening_hours'>Horário de funcionamento</label>
              <input id='opening_hours' name='opening_hours' />
            </div>

            <div className='input-block'>
              <label htmlFor='open_on_weekends'>Atende fim de semana</label>

              <div className='button-select'>
                <button type='button' className={openOnWeekends ? 'active' : ''} onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type='button' className={!openOnWeekends ? 'active' : ''} onClick={() => setOpenOnWeekends(false)} >Não</button>
              </div>
            </div>
          </fieldset>

          <button className='confirm-button' type='submit'>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateOrphanage;

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
