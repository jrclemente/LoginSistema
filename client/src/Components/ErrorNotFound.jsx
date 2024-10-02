import React from 'react'
import './ErrorNotFound.css'

const ErrorNotFound = () => {
    return (
        <div id='error'>
            <h1 className="notFoundTitle">Opa! Essa página não pode ser encontrada.</h1>
            <p className="notFoundDesc">
                Parece que nada foi encontrado neste local.<br></br>
                Talvez tente um dos links no menu ou pressione voltar para ir para a página anterior.
            </p>
            <p>Erro: 404</p>
        </div>
    )
}

export default ErrorNotFound
