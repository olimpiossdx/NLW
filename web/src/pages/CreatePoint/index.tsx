import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import api from '../../service/api';

import { IitemView } from './Iitem';
import Dropzone from '../../components/Dropzone';

import Logo from '../../assets/logo.svg';
import './styles.css';
import IUF from './Iuf';
import IMunicipios from './Imunicicio';

const CreatePoint = () => {
  const history = useHistory();
  const [items, setItems] = React.useState<IitemView[]>([]);
  const [ufs, setUfs] = React.useState<IUF[]>([]);
  const [selectedFile, setselectedFile] = React.useState<File>();
  const [selectedCity, setSelectedCity] = React.useState('0');
  const [selectedUf, setSelectedUf] = React.useState<String>('0');
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const [formData, setFormData] = React.useState({ name: '', email: '', whatsapp: '' });
  const [municipios, setMunicipios] = React.useState<IMunicipios[]>([]);
  const [seletecPosition, setSeletecPosition] = React.useState<[number, number]>([0, 0]);
  const [initialPosition, setInitialPosition] = React.useState<[number, number]>([0, 0]);

  const handleChangeUF = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUf(event.currentTarget.value);
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('event.currentTarget.value', event.currentTarget.value);
    setSelectedCity(event.currentTarget.value);
  };

  const fetchItems = () => {
    api.get<IitemView[]>('items').then((response) => setItems(response.data));
  };

  const fetchUfs = () => {
    axios.get<IUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => setUfs(response.data));
  };

  const fetchMunicipios = () => {
    axios.get<IMunicipios[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => setMunicipios(response.data));
  };

  const handleMapClick = (event: LeafletMouseEvent) => {
    setSeletecPosition([event.latlng.lat, event.latlng.lng]);
  };

  const fetchInitialPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSelectedItem = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const id = Number(event.currentTarget.value);
    if (!selectedItems.includes(id)) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, name, whatsapp } = formData;
    const [latitude, longitude] = seletecPosition;

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', String(selectedUf));
    data.append('city', selectedCity);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', selectedItems.join(','));

    if (!selectedFile) {
      alert("Por favor preencha todos os campos");
      return;
    } else {
      data.append('image', selectedFile);
    }
    
    const response = await api.post('points', data);
    alert('Ponto de coleta criado !');
    history.push('/');
  };

  React.useEffect(fetchInitialPosition, [initialPosition]);
  React.useEffect(fetchItems, []);
  React.useEffect(fetchUfs, []);
  React.useEffect(fetchMunicipios, [selectedUf]);

  return (<div id="page-create-point">
    <header>
      <img src={Logo} alt='Ecoleta' />
      <Link to='/'>
        <FiArrowLeft> Voltar para home</FiArrowLeft>
      </Link>
    </header>

    <form onSubmit={handleSubmit}>
      <h1>Cadastro do <br /> ponto de coleta</h1>

      <Dropzone handleFile={setselectedFile} />

      <fieldset>
        <legend>
          <h2>Dados</h2>
        </legend>
        <div className="field">
          <label htmlFor="name">Nome da Entidade</label>
          <input type='text' name='name' id='name' onChange={handleInput} />
        </div>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input type='text' name='email' id='email' onChange={handleInput} />
        </div>
        <div className="field">
          <label htmlFor="whatsapp">Whatsapp</label>
          <input type='text' name='whatsapp' id='whatsapp' onChange={handleInput} />
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>Endereço</h2>
          <span>Selecione o endereço no mapa</span>
        </legend>

        <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={seletecPosition} />
        </Map>


        <div className='field-group'>
          <div className='field'>
            <label htmlFor="uf">Estado (UF)</label>
            <select name="uf" id="uf" onChange={handleChangeUF}>
              <option value="0">Selecione uma UF</option>
              {ufs.map((uf: IUF) => <option value={uf.sigla} key={uf.id}>{uf.sigla}</option>)}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='city'>Cidade</label>
            <select name='city' id='city' onChange={handleChangeCity}>
              <option value="0">Selecione uma cidade</option>
              {municipios.map((uf: IMunicipios) => <option value={uf.nome} key={uf.id}>{uf.nome}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <h2>ítens de coleta</h2>
          <span>Selecione um ou mais ítens abaixo</span>
        </legend>
        <ul className="items-grid">
          {items.map((item: IitemView) => (<li className={selectedItems.includes(Number(item.id)) ? 'selected' : ''} key={item.id} value={item.id} onClick={handleSelectedItem}>
            <img src={item.image_url} alt={item.title} />
            <span>{item.title}</span>
          </li>))}
        </ul>
      </fieldset>

      <button type='submit'>
        Cdastrar ponto de coleta
      </button>
    </form>
  </div>)
}

export default CreatePoint;
