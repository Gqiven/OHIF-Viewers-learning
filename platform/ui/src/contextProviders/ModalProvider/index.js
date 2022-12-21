import { createContext, useCallback } from "react"
import classnames from 'classnames'

const ModalContext = createContext(null)
const { Provider } = ModalContext

const ModalProvider = ({ children, modal: Modal, service }) => {
  const DEFAULT_OPTIONS = {
    content: null,
    contentProps: null,
    shouldCloseOnEsc: false,
    isOpen: true,
    onClose: null,
    closeButton: true,
    showScrollbar: false,
    title: null,
    customClassName: '',
    fullscreen: false,
  };
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const show = useCallback(props => setOptions({ ...options, ...props }), [
    options,
  ]);

  const hide = useCallback(() => setOptions(DEFAULT_OPTIONS), [
    DEFAULT_OPTIONS,
  ]);

  const {
    content: ModalContent,
    customClassName,
    showScrollbar,
    noScroll,
    shouldCloseOnEsc,
    isOpen,
    title,
    fullscreen,
    closeButton,
    onClose
  } = options

  return (
    <Provider value={{ show, hide }}>
      {
        ModalContent && 
        (
          <Modal className={classnames(
              customClassName,
              ModalContent.className,
              { visibleScrollbar: showScrollbar },
              { noScroll }
            )}
            shouldCloseOnEsc={shouldCloseOnEsc}
            isOpen={isOpen}
            title={title}
            fullscreen={fullscreen}
            closeButton={closeButton}
            onClose={() => {
              if(onClose) {
                onClose()
              }
              hide()
            }}
          >
            <ModalContent {...contentProps} show={show} hide={hide} />
          </Modal>
        )
      }
      { children }
    </Provider>
  )
}

export default ModalProvider