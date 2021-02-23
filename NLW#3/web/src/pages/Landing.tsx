import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css'
import '../styles/pages/landing.css'
import logoSVG from '../images/logo.svg';
import { FiArrowRight } from 'react-icons/fi'

const Landing: React.FC<{}> = () => {
  return (<div id='page-landing'>

    <div className="content-wrapper">
      <img src={logoSVG} alt='logo' />
      <main>
        <h1>Leve felicidade para o mundo</h1>
        <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        <div className="location">
          <strong>Belo Horizonte</strong>
          <span>Minas Gerais</span>
        </div>
        <Link to='/app' className='enter-app'>
          <FiArrowRight size={26} color='rbga(0,0,0,0.)' />
        </Link>
      </main>
    </div>

  </div>);
}

export default Landing;