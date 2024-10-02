import React, { useState, useEffect, } from 'react';
import { Link, Form, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import './Cadastro.css'
import Mens from './../../Components/Mens';
import Error from './../../Components/Error';
import api from '../../services/api';
import { ExisteUsuario } from '../../Validacao/cadastro';

const Cadastro = () => {

    const navigate = useNavigate();

    //#region  Monta Nome de Campos API
    async function MontaDadosAPI(camposForm) {
        const formData = new FormData();
        Object.keys(camposForm).forEach(key => {

            let newkey;
            switch (key) {
                case 'nomeUsu':
                    newkey = 'username'
                    break;
                case 'emailUsu':
                    newkey = 'email'
                    break;
                case 'telUsu':
                    newkey = 'telefone'
                    break;
                case 'senhaUsu':
                    newkey = 'password'
                    break;
                case 'confirSenhaUsu':
                    newkey = 'confirmpassword'
                    break;
                case 'dtNascimento':
                    newkey = 'data_nascimento'
                    break;
                case 'fotoPerfil':
                    newkey = 'foto_perfil'
                    break;
                case 'fotoPerfilPath':
                    newkey = 'fotoPerfilPath'
                    break;
                default:
                    newkey = ''
                    break;
            }
            if (newkey != '') {
                formData.append(newkey, camposForm[key])
            }
        });
        return formData
    }
    //#endregion

    const location = useLocation();
    const dadosPerfil = location.state?.name
    // console.log(dadosPerfil?.dtNascimento, dadosPerfil?.fotoPerfil, dadosPerfil?.fotoPerfilPath)

    const [campos, setCampos] = useState({
        nomeUsu: '',
        emailUsu: '',
        telUsu: '',
        senhaUsu: '',
        confirSenhaUsu: '',
        dtNascimento: dadosPerfil?.dtNascimento,
        fotoPerfil: dadosPerfil?.fotoPerfil,
        fotoPerfilPath: dadosPerfil?.fotoPerfilPath
    });

    const [materLogado, setmanterLogado] = useState(false)
    const [error, setError] = useState('');
    const [mens, setMens] = useState('');
    const [vaiPaginaLogin, setVaiPaginaLogin] = useState(false);
    const [envioDados, setEnvioDados] = useState(true)
    const [emailOri, setEmailOri] = useState('')

    const [erroProcessamento, setEP] = useState(({
        type: '',
        status: '',
        mensagem: '',
        stack: ''
    }))

    //Para uso interno(Teste)
    let enviaPaginaLogin = false;
    let temErro = false;

    async function handleChange(event) {
        campos[event.target.name] = event.target.value;
        setCampos(campos)
        setError('')
        setMens('')
        setVaiPaginaLogin(false)
        setEnvioDados(true)
        /*
        Verifica se existe um usuário associado ao email. Para cada alteração realizada no formulário - independente do campo alterado - sempre será verificado a existência de usuário vinculado ao email informado.  
        Portanto, sempre será realizado acesso ao servidor para cada alteração realizada no formulário. 
        */
        if (emailUsu.name == 'emailUsu') {
            if ((emailUsu.value != null) && (emailUsu.value != '') && (typeof emailUsu.value != 'undefined')) {
                /** 
                Se não colocar estas condições acima, é enviada uma requisição sem o email, gerando erro 404, quando a página do formulário está sendo carregada. Mesmo tendo ja tendo dados gerados automaticamente no formulário.
                GET /login/email/ 404 1.796 ms - 1084 - *** ERROR ***
                GET /login/email/jrclemente0465@hotmail.com1 304 2.295 ms
                **/
                // Para evitar nova verificação da existência de usuário com email, quando da alteração dos demais campos do formulário
                if (emailOri != emailUsu.value) {
                    await existeUsuario(emailUsu.value)
                    setEmailOri(emailUsu.value)
                }
            }
        }
    }

    function InicializaCampos() {
        campos[nomeUsu] = ''
        campos[emailUsu] = ''
        campos[telUsu] = ''
        campos[senhaUsu] = ''
        campos[confirSenhaUsu] = ''
        setCampos(campos)
    }

    //#region Envia requisição de solicitação para Back-End
    async function register(event) {
        let teveErro = false;
        let formData = new FormData();
        // Object.keys(campos).forEach(key => formData.append(key, campos[key]));
        formData = await MontaDadosAPI(campos);

        try {
            await api.post('/users/register',
                formData,
                {
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                    }
                })
                // .then(response => { alert(JSON.stringify(response.data)); })
                .then(response => {
                    // alert(JSON.stringify(response.data))

                    /* Gera Controle no LocalStorage */
                    const KEY_LS = import.meta.env.VITE_KEY_LS
                    if (materLogado) {
                        localStorage.setItem(KEY_LS, true)
                    } else {
                        localStorage.removeItem(KEY_LS)
                    }
                    
                    /***/
                    /* Não estava sendo possível ir para a página de Login, utilizando apenas a opção padrão[navigate('/')].
                    Esta solução foi identificada no link abaixo com a inclusão: navigate(0)
                    https://stackoverflow.com/questions/68825965/react-router-v6-usenavigate-doesnt-navigate-if-replacing-last-element-in-path
                    Parece ser um artifício técnico provisório(ATP/Gambiarra)
                    */
                    navigate('/')
                    navigate(0)
                })
                .catch((error) => {
                    if (error.response) {
                        // temErro = true
                        // console.log(error)
                        teveErro = true
                        // alert(`Problema no processamento dos dados do cadastro!\nCódigo Erro: ${error.response.data.status}\nErro: ${error.response.data.error}\nstacktrace : ${error.response.data.stack}`)
                        setEP({
                            type: 'error',
                            status: error.response.data.status,
                            mensagem: error.response.data.error,
                            stack: error.response.data.stack
                        })
                        alert(`Problema no processamento dos dados do cadastro!\n
                            Código Erro: ${erroProcessamento.status}\n
                            Erro: ${erroProcessamento.mensagem}\n
                            stacktrace : ${erroProcessamento.stack}`)
                    } else {
                        teveErro = true
                        // Para a situação em que o servidor esteja offline
                        alert('Erro: Tente mais tarde!!')
                    }
                })
        } catch (error) {
            console.log(error)
            teveErro = true
            alert(`POST: ${error}`)
        }
        // if (teveErro) { event.preventDefault(); }
        return teveErro;
    }
    //#endregion

    const handleSubmit = async (event) => {
        setError('');
        setMens('');
        // event.preventDefault();
        if (campos.senhaUsu !== campos.confirSenhaUsu) {
            event.preventDefault();
            setError('Confirmação da senha inválida!');
            return;
        }

        const erroEnvioDados = await register(event)
        setEnvioDados(erroEnvioDados);

        if (erroEnvioDados) {
            alert('Favor preencher novamente os dados e enviar!')
            event.preventDefault()
            setError('Falha na inclusão do Usuário!');
            return
        } else {
            alert('Usuário criado com sucesso!')
            setVaiPaginaLogin(true)
            setError('')
        }
    };

    function Login(enviaPaginaLogin) {
        useEffect(() => {
            if (enviaPaginaLogin) {
                navigate('/')
            }
        }, [])
    }

    const RedirectToLogin = () => {
        navigate('/')
    }

    const existeUsuario = async (emailAux) => {
        // const emailAux = emailUsu.value - Caso seja utilizado o onBlur
        setError('')
        const existe = await ExisteUsuario(emailAux)
        if (existe) {
            setError('Este email já está sendo utilizado!')
        }
    }

    return (
        <div className='cadastro'>
            {/* <form onSubmit={handleSubmit} autoComplete="off"> */}
            <form method='POST' autoComplete="off">

                {/* {temErro ? <Error /> : ""} */}

                <h1>Cadastro Usuário</h1>
                <div className='dadosUsuario'>
                    <div className='campoInput'>
                        <label htmlFor="nomeUsu">Nome Completo</label>
                        <input
                            id='nomeUsu'
                            autoComplete='nomeUsu'
                            name='nomeUsu'
                            required
                            pattern="[A-Za-z ']{3,}"
                            type="text"
                            placeholder="Nome e sobrenome"
                            onChange={handleChange}
                        />
                    </div>
                    <div className='campoInput'>
                        <label htmlFor="emailUsu">E-mail</label>
                        <input
                            id='emailUsu'
                            name='emailUsu'
                            autoComplete='emailUsu'
                            required
                            type="email"
                            onChange={handleChange}
                        // onBlur={existeUsuario} - Só realiza a verificação se o campo receber foco(onFocus)
                        />
                    </div>
                    <div className='campoInput'>
                        <label htmlFor="telUsu">Telefone Celular</label>
                        <input
                            id='telUsu'
                            autoComplete='telUsu'
                            name='telUsu'
                            type="tel"
                            placeholder="(99) 99999-9999"
                            minLength="11"
                            maxLength="15"
                            size="15"
                            // pattern="(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})"
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='campoInput'>
                        <label htmlFor="senhaUsu">Senha</label>
                        <input
                            id='senhaUsu'
                            name='senhaUsu'
                            autoComplete='new-password'
                            type="password"
                            placeholder='senha'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='campoInput'>
                        <label htmlFor="confirSenhaUsu">Confirmação Senha</label>
                        <input
                            id='confirSenhaUsu'
                            name='confirSenhaUsu'
                            autoComplete='new-password'
                            type="password"
                            placeholder='senha'
                            // onChange={(e) => [setconfirSenhaUsu(e.target.value), setError(''), setMens('')]}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='btnCriarPerfil'>
                    <button><Link to='/Perfil' className="linkPerfil">Criar Perfil</Link></button>
                </div>
                <div className="manterLogado">
                    <label>
                        <input
                            type="checkbox"
                            onChange={(e) => [setmanterLogado(e.target.value)]}
                        />
                        &nbsp;Manter-me logado
                    </label>
                </div>
                <div className='btn_Form_Cadastro'>
                    {/* <button type="submit">Cadastrar</button> */}
                    <button type="button" onClick={handleSubmit}>Cadastrar</button>
                    <button> <Link to='/' className="btn_linkLogin">Login</Link></button>
                </div>
                <Mens nomeClasse='mensErro' mensagem={error} />
                <Mens nomeClasse='mensagem' mensagem={mens} />
            </form>

        </div>
    )
}

export default Cadastro