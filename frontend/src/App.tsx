import { useState } from 'react'
import './App.css'
import CadastroForm from './components/CadastroForm'
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {
  return (
    <div className="container">
      <h1>Sistema de Cadastro</h1>
      <CadastroForm />
    </div>
  )
}

export default App
