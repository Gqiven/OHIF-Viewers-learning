const LocalStorage = window.localStorage
const localStorageKey = 'state'

// 获取
export const loadState = () => {
  try {
    const serializedState = LocalStorage.getItem(localStorageKey)
    if(!serializedState) return undefined

    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
}

// 保存
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    LocalStorage.setItem(localStorageKey, serializedState)
  } catch (error) {
    console.log('localStorage setItem\'s error: ', error)
  }
}

const localStorage = {
  loadState,
  saveState
}

export default localStorage