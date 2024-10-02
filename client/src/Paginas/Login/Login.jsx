import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import "./Login.css";

import api from '../../services/api';
import Mens from "../../Components/Mens";

const Login = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [materLogado, setmanterLogado] = useState(false)
  const [error, setError] = useState('');
  const [mens, setMens] = useState('');

  //#region Envia requisição de solicitação para Back-End
  async function signIn(event) {
    try {

      await api.get(`login/?email=${username}&senha=${password}`)
        .then(response => {
          if (JSON.parse(response.data.OK)) {/* Deviao à situação em que a variável OK vem como uma string ['true'/'false'] */
            /* Gera Controle no LocalStorage */
            const KEY_LS = import.meta.env.VITE_KEY_LS
            if (materLogado) {
              localStorage.setItem(KEY_LS, true)
            } else {
              localStorage.removeItem(KEY_LS)
            }
            setMens(response.data.mens)
          } else {
            setError(response.data.mens)
          }
        })
        .catch((error) => {
          if (error.response) {
            // console.log(error)
            alert(`Problema no processamento do login!\nCódigo Erro: ${error.response.data.status}\nErro: ${error.response.data.error}\nstacktrace : ${error.response.data.stack}`)
          } else {
            // Para a situação em que o servidor esteja offline
            alert('Erro: Tente mais tarde!!')
          }
        })

    } catch (error) {
      alert(`GET: ${error}`)
    }
  }
  //#endregion

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = async (event) => {
    setError('');
    setMens('');
    // Impede que a página seja recarregada
    // event.preventDefault();

    await signIn()
  };

  return (
    <div className="container">
      <Form method='GET' onSubmit={handleSubmit} autoComplete="off">
        <h1>Acesse o Sistema</h1>
        <div className="input-field">
          <label htmlFor="nome_login">E-mail ou número de telefone celular</label>
          <input
            id="nome_login" name="nome_login" autoComplete="nome_login" type="email"
            placeholder="E-mail"
            required
            // value={username}
            onChange={(e) => [setUsername(e.target.value), setError(''), setMens('')]}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <label htmlFor="senha_login">Senha</label>
          <input
            id="senha_login" name="senha_login" autoComplete="senha_login"
            type="password"
            placeholder="Senha"
            required
            // value={password}
            onChange={(e) => [setPassword(e.target.value), setError(''), setMens('')]}
          />
          <FaLock className="icon" />
        </div>
        {/* lembrar-esquecer */}
        <div className="recall-forget">
          <label>
            <input
              type="checkbox"
              onChange={(e) => [setmanterLogado(e.target.value)]}
            />
            Manter-me logado
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">Login</button>
        {/* link de inscrição */}
        <div className="signup-link">
          <p>
            {/* Não tem uma conta? <a href="#">Cadastre-se</a>{" "} */}
            Não tem uma conta? <Link to='/Cadastro'>Cadastra-se</Link>
          </p>
        </div>
        <Mens nomeClasse='mensErro' mensagem={error} />
        <Mens nomeClasse='mensagem' mensagem={mens} />
      </Form>
    </div>
  );
};

export default Login;