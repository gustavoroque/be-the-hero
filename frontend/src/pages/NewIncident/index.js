import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';



import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  async function handleNewIncident(e) {
    /**
    * preventDefault Evita recarregar a paginao ao submit do conteudo do form 
    */
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    const ongId = localStorage.getItem("ongId");

    try {
      await api.post(`incidents`, data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (error) {
      alert(`Erro ao criar novo caso`);      
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
          placeholder="Título do caso"
          value={title}
          // e.target.value representa o valor do input
          onChange={ e => setTitle(e.target.value)}
          />
          <textarea 
          placeholder="Descrição" 
          value={description}
          // e.target.value representa o valor do input
          onChange={ e => setDescription(e.target.value)}
          />
          <input 
          placeholder="Valor em reais" 
          value={value}
          // e.target.value representa o valor do input
          onChange={ e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}