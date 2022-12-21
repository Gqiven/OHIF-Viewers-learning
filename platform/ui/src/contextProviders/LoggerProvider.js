import { createContext, useEffect, useState } from "react"

const LoggerContext = createContext(null)
const { Provider } = LoggerContext

const LoggerProvider = ({ children, service }) => {
  const [state, setState] = useState({
    errors: [],
    infos: []
  })

  useEffect(() => {
    const onErrorHandler = ({ error: errorObject, message }) => {
      error({ error: errorObject, message })
    }
    window.addEventListener('error', onErrorHandler)

    return () => {
      window.removeEventListener('error', onErrorHandler)
    }
  }, [])


  const error = ({
    error = {},
    stack = '',
    message = '',
    displayOnConsole = true
  }) => {
    const errorObject = { error, stack, message, displayOnConsole }
    setState(state => ({ ...state, errors: [...state.errors, errorObject] }))

    if (displayOnConsole) {
      console.error(error)
    }
  }

  const info = ({ message = '', displayOnConsole = true }) => {
    setState(state => ({
      ...state,
      infos: state.infos.push({ message, displayOnConsole })
    }))
    if(displayOnConsole) {
      console.info(message)
    }
  }

  useEffect(() => {
    if(service) {
      service.setServiceImplementation({ error, info })
    }
  }, [error, service, info])

  return <Provider value={{ info, error, state }}>{ children }</Provider>
}

export default LoggerProvider