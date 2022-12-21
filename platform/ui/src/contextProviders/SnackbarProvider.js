import { createContext, useCallback, useEffect } from "react"

const SnackbarContext = createContext(null)
const { Provider } = SnackbarContext

const SnackbarProvider = ({ children, service }) => {
  const DEFAULT_OPTIONS = {
    title: '',
    message: '',
    duration: 5000,
    autoClose: true,
    position: 'bottomRight',
    type: SnackbarTypes.INFO,
    action: null,
  };

  const [count, setCount] = useState(1);
  const [snackbarItems, setSnackbarItems] = useState([]);

  useEffect(() => {
    const onLogHandler = ({ type, notify, title, message }) => {
      if (notify) {
        show({ type, title, message });
      }
    };

    LogManager.subscribe(LogManager.EVENTS.OnLog, onLogHandler);

    return () => {
      LogManager.unsubscribe(LogManager.EVENTS.OnLog, onLogHandler);
    };
  }, [show]);

  const show = useCallback(
    options => {
      if (!options || (!options.title && !options.message)) {
        console.warn(
          'Snackbar cannot be rendered without required parameters: title | message'
        );

        return null;
      }

      if (options.type === 'error') {
        console.error(options.error);
      }

      const newItem = {
        ...DEFAULT_OPTIONS,
        ...options,
        id: count,
        visible: true,
      };

      setSnackbarItems(state => [...state, newItem]);
      setCount(count + 1);
    },
    [count, DEFAULT_OPTIONS]
  )

  const hide = useCallback(
    id => {
      const hideItem = items => {
        const newItems= items.map(item => {
          if(item.id === id) {
            item.visible = false
          }
          return item
        })
      }

      setSnackbarItems(state => hideItem(state))

      setTimeout(() => {
        setSnackbarItems(state => [...state].filter(item => item.id !== id))
      }, 1000)
    },
    [setSnackbarItems]
  )

  const hideAll = () => {
    setCount(1)
    setSnackbarItems(() => [])
  }

  useEffect(() => {
    if(service) {
      service.setServiceImplementation({ hide, show })
    }
  },[service, hide, show])

  return <Provider value={ show, hide, hideAll, snackbarItems }>{ children }</Provider>
}

export default SnackbarProvider