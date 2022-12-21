const SessionStorage = window.sessionStorage
const sessionStorageKey = 'state'

export const loadState = () => {
  try {
    const seriallizedState = SessionStorage.getItem(sessionStorageKey)
    if(!seriallizedState) return undefined
    return JSON.parse(seriallizedState)
  } catch (error) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const seriallizedState = JSON.stringify(state)
    SessionStorage.setItem(seriallizedState)
  } catch (error) {
    console.log('sessionStorage setItem\'s error: ', error)
  }
}

const sessionStorage = {
  loadState,
  saveState
}

export default sessionStorage