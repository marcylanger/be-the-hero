import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../Services/api';

export default function Profile(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();
    
    async function hadleNewIncident(e) {
        e.preventDefault();
        
        const data = {
            title,
            description,
            value
        };
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
            
        }
    }
    return (
        <div className="new-incident-container">

            <div className="content">
                <section className="">
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile"><FiArrowLeft size="16" color="#E02041" /> 
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={hadleNewIncident}>
                    <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="Título do caso"/>
                    <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Descrição"/>
                    <input 
                    value={value} 
                    onChange={e => setValue(e.target.value)} 
                    placeholder="Valor em reais"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
            
        </div>
    )
}