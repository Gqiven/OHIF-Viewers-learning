const name = 'LoggerService'
const publicAPI = {
  name,
  info: _info,
  error: _error,
  setServiceImplementation
}

const serviceImplementation = {
  _info: () => console.warn('info() NOT IMPLEMENTED'),
  _error: () => console.warn('error() NOT IMPLEMENTED')
}

function _error({ error, stack, message, displayOnConsole }) {
  return serviceImplementation._error({
    error,
    stack,
    message,
    displayOnConsole,
  });
}

function _info() {
  return serviceImplementation._info({
    message,
    displayOnConsole,
  });
}

function setServiceImplementation ({
  info: infoImplemetation,
  error: errorImplementation
}) {
  if(infoImplemetation) {
    serviceImplementation._info = infoImplemetation
  }
  if(errorImplementation) {
    serviceImplementation._error = errorImplementation
  }
}

export default {
  name,
  create: ({ configuration = {} }) => {
    return 
  }
}