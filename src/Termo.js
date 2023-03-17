import React, { useState, useEffect, useRef } from 'react'
import { palavras } from './palavras';
import './Termo.css';

const Termo = () => {

  const [palavra, setPalavra] = useState([])
  const [palavraDigitada, setPalavraDigitada] = useState([])
  const [palavrasTentativa, setPalavrasTentativa] = useState([])
  const [vencedor, setVencedor] = useState(false)
  const [perdedor, setPerdedor] = useState(false)

  const sorteiaPalavra = (min, max) => {
    const numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min
    const palavraSorteada = palavras[numeroAleatorio]
    const palavraSeparada = palavraSorteada.split("")
    setPalavra(palavraSeparada)
  }

  const digitaPalavra = (e) => {
    const palavraDigitadaSeparada = (e.target.value)
    setPalavraDigitada(palavraDigitadaSeparada)
  }

  const testarPalavra = (e) => {
    e.preventDefault()
    if (palavraDigitada.length !== 5) {
      console.log("")
    }
    else if (palavra.join("").includes(palavraDigitada)) {
      setPalavraDigitada('')
      setPalavrasTentativa([...palavrasTentativa, palavraDigitada])
      setVencedor(true)
    }
    else if (palavrasTentativa.length === 5) {
      setPalavraDigitada('')
      setPerdedor(true)
    }
    else {
      setPalavraDigitada('')
      setPalavrasTentativa([...palavrasTentativa, palavraDigitada])
    }
  }

  const classesDivisao = {
    correta: 'divisao_palavra_correta',
    existe: 'divisao_palavra_existe',
    errada: 'divisao_palavra_errada'
  }

  const defineClasseDivisao = (caractere, id) => {
    if (caractere === palavra[id]) {
      console.log(palavra)
      return classesDivisao.correta
    }
    else if (palavra.includes(caractere)) {
      return classesDivisao.existe
    }
    else if (!(palavra.includes(caractere))) {
      return classesDivisao.errada
    }
    else {
      return ''
    }
  }

  const resetarJogo = () => {
    setPalavrasTentativa([])
    setVencedor(false)
    setPerdedor(false)
  }

  useEffect(() => {
    sorteiaPalavra(0, palavras.length - 1)
  }, [])

  return (
    <section className='termo'>
      <h1 className='titulo_termo'>TERMO</h1>

      {perdedor === true && (
        <div>
          <h1 className='titulo_termo'>Você perdeu!</h1>
          <button onClick={resetarJogo} className='botao_enter'>JOGAR NOVAMENTE</button>
        </div>
      )}

      {vencedor === true && (
        <div>
          <h1 className='titulo_termo'>Você venceu!</h1>
          <button onClick={resetarJogo} className='botao_enter'>JOGAR NOVAMENTE</button>
        </div>
      )}

      {palavrasTentativa.map(palavras => {
        return (
          <div className='divisao_palavras'>
            {palavras.split('').map((caractere, id) => {
              return (
                <div key={id} className={`divisao_palavra ${defineClasseDivisao(caractere, id)}`}><span className='palavra'>{caractere}</span></div>
              )
            })}
          </div>
        )
      })}

      {vencedor || perdedor ? (
        <></>
      ) : (
        <form onSubmit={testarPalavra}>
          <input onChange={digitaPalavra} value={palavraDigitada} onDrop="return false" className='input_palavra' maxLength="5" type="text" />
          <button className='botao_enter'>ENTER</button>
        </form>
      )}
    </section>
  )
}

export default Termo
