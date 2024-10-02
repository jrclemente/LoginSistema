import { useRouteError, Link, useNavigate } from "react-router-dom"

// library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

import './Error.css'

function GeraMensErro(codError) {
  let mens;

  switch (codError) {
    case 404:
      mens = 'Essa página não pode ser encontrada'
      break;
    default:
      mens = `Código de erro ${codError} não definido`
      break;
  }

  return mens;

}

const Error = () => {
  const error = useRouteError();
  // console.log(error)
  const navigate = useNavigate();

  return (
    <div className="error">

      <h1>Opa! Temos um problema</h1>
      <p>{GeraMensErro(error.status)}</p>
      <p>{error.message || error.statusText}</p>

      <div className="flex-md">
        <button
          className="btn btn--dark"
          onClick={() => navigate(-1)}
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Voltar</span>
        </button>
        <Link
          to="/"
          className="btn btn--dark"
        >
          <HomeIcon width={20} />
          <span>Página Principal</span>
        </Link>
      </div>
    </div>
  )
}
export default Error