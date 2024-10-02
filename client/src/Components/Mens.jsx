import React from 'react'
import './Mens.css'

const Mens = ({ nomeClasse, mensagem }) => {
  return (
    <div className='mensagens'>
      <label className={nomeClasse}>{mensagem}</label>
    </div>
  )
}

export default Mens