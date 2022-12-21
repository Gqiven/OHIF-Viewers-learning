import { useEffect, useState } from "react";

export const retryImport = (fn, retriesLeft = 5, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn().then(resolve).catch(error => {
      setTimeout(() => {
        if(retriesLeft === 1) {
          reject(error)
          return
        }

        retry(fn, retriesLeft - 1, interval).then(resolve, reject)
      }, interval);
    })
  })
}

const asyncComponent = (importComponent, options = { onError }) => props => {
  // asyncComponent
  const [state, setState] = useState({ component: null })
  const isFuntion = v => typeof v === 'function'
  const isChunkError = error => error.toString().indexOf('ChunkLoadError') > -1

  useEffect(() => {
    const addDynamicallyLoadedComponentToState = async () => {
      try {
        const { default: component } = await importComponent()
        setState({ component })
        if(options.onError && isFunction(options.onError))
      } catch (error) {
        
      }
    }
    addDynamicallyLoadedComponentToState()
  }, [])
}

export default asyncComponent

// one hour and five minutes