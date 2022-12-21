const name = 'UIModalService'

const publicAPI = {
  name,
  hide: _hide,
  show: _show,
  setServiceImplementation
}

const serviceImplementation = {
  _hide: () => console.warn('hide() NOT IMPLEMENTED'),
  _show: () => console.warn('show() NOT IMPLEMENTED')
}

function setServiceImplementation({
  hide: hideImplementation,
  show: showImplementation
}) {
  if(hideImplementation) {
    serviceImplementation._hide = hideImplementation
  }
  if(showImplementation) {
    serviceImplementation._show = showImplementation
  }
}

export default {
  name,
  create: ({ configuration = {} }) => {
    return publicAPI
  }
}
