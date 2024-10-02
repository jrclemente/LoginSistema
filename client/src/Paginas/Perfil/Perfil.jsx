import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, Form } from 'react-router-dom';
import './Perfil.css';
import perfilPadrao from '../../../public/blank-profile.PNG';

const Perfil = () => {
    const [imgPerfil] = useState(perfilPadrao);
    const [foto, setfoto] = useState('');

    const [campos, setCampos] = useState({
        dtNascimento: '',
        fotoPerfil: '',
        fotoPerfilPath: ''
    });

    const navegar = useNavigate();

    function handleChange(e) {
        if (e.target.name === "fotoPerfil") {
            const file = e.target.files[0]
            const path = URL.createObjectURL(file)
            setfoto(path)
            campos[e.target.name] = file
            campos['fotoPerfilPath'] = path
            // setfoto(URL.createObjectURL(e.target.files[0]));
        } else {
            campos[e.target.name] = e.target.value
        }
        setCampos(campos)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navegar('/Cadastro', { state: { name: campos } });
    };

    return (
        <div className='perfil'>
            <Form method="post" onSubmit={handleSubmit} autoComplete='off'>
                <h1>Perfil Usuário</h1>
                <div className='campoInput'>
                    <label htmlFor="dtNascimento">Data Nascimento</label>
                    <input
                        id='dtNascimento'
                        name='dtNascimento'
                        placeholder='dd/mm/aaaa'
                        type="date"
                        minLength="8" maxLength="8"
                        onChange={handleChange}
                    />
                </div>
                <div className='imgPerfil'>
                    {foto ? <img src={foto} alt='Imagem do perfil do Usuário' width="200px" height="200px" title="Define a foto do perfil do usuário" /> : <img src={imgPerfil} alt="Imagem Perfil Padrão" width="200px" height="200px" title="Define a foto do perfil do usuário" />}
                </div>
                <div className='campoInput'>
                    <label className="lbFotoPerfil" htmlFor="fotoPerfil">Escolha Foto do Perfil</label>
                    <input
                        type="file"
                        name="fotoPerfil"
                        id="fotoPerfil"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div className='btnPerfil'>
                    {/* <button><Link to='/Cadastro' className="linkVoltar">Voltar Cadastro</Link></button> */}
                    <button type="submit">Voltar Cadastro</button>
                </div>
            </Form>
        </div>
    )
}

export default Perfil
