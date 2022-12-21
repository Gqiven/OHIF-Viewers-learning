import { createContext, useCallback, useEffect, useState } from "react"
import { utils } from '@ohif/core'
import Draggable from 'react-draggable';

const DialogContext = createContext(null)
const { Provider } = DialogContext

const dismiss = () => {}

const dismissAll = () => {}

const DialogProvider = ({ children, service }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dialogs, setDialogs] = useState([])
  const [lastDialogId, setLastDialogId] = useState(null)
  const [lastDialogPosition, setLastDialogPosition] = useState(null)
  const [centerPositions, setCenterPositions] = useState([]);

  useEffect(() => {
    setCenterPositions(
      dialogs.map(dialog => ({
        id: dialog.id,
        ...getCenterPosition(dialog.id),
      }))
    );
  }, [dialogs]);

  const getCenterPosition = id => {
    const root = document.querySelector('#root');
    const centerX = root.offsetLeft + root.offsetWidth / 2;
    const centerY = root.offsetTop + root.offsetHeight / 2;
    const item = document.querySelector(`#draggableItem-${id}`);
    const itemBounds = item.getBoundingClientRect();
    return {
      x: centerX - itemBounds.width / 2,
      y: centerY - itemBounds.height / 2,
    };
  };

  const create = useCallback(props => {
    const { id } = props
  
    let dialogId = id
    if(!dialogId) {
      dialogId = utils.guid()
    }
    setDialogs(dialogs => [...dialogs, { ...props, id: dialogId }])
  
    setLastDialogId(dialogId)
  
    return dialogId
  },[])

  const dismiss = useCallback(
    ({ id }) =>
      setDialogs(dialogs => dialogs.filter(dialog => dialog.id !== id)),
    []
  );

  const dismissAll = () => {
    setDialogs([])
  }
  const isEmpty = () => dialogs && dialogs.length < 1

  const renderDialogs = () => {
    return dialogs.map(dialog => {
      const {
        id,
        content: DialogContent,
        contentProps,
        defaultPosition,
        centralize = false,
        preservePosition = true,
        isDraggable = true,
        onStart,
        onStop,
        onDrag,
        showOverlay,
      } = dialog;

      let position =
        (preservePosition && lastDialogPosition) || defaultPosition;
      if (centralize) {
        position = centerPositions.find(position => position.id === id);
      }

      const dragableItem = () => (
        <Draggable
          key={id}
          disabled={!isDraggable}
          position={position}
          defaultPosition={position}
          bounds="parent"
          onStart={event => {
            const e = event || window.event;
            const target = e.target || e.srcElement;
            const BLACKLIST = [
              'SVG',
              'BUTTON',
              'PATH',
              'INPUT',
              'SPAN',
              'LABEL',
            ];
            if (BLACKLIST.includes(target.tagName.toUpperCase())) {
              return false;
            }

            if (validCallback(onStart)) {
              return onStart(event);
            }
          }}
          onStop={event => {
            setIsDragging(false);

            if (validCallback(onStop)) {
              return onStop(event);
            }
          }}
          onDrag={event => {
            setIsDragging(true);
            _bringToFront(id);
            _updateLastDialogPosition(id);

            if (validCallback(onDrag)) {
              return onDrag(event);
            }
          }}
        >
          <div
            id={`draggableItem-${id}`}
            className={classNames(
              'DraggableItem',
              isDragging && 'dragging',
              isDraggable && 'draggable'
            )}
            style={{ zIndex: '999', position: 'absolute' }}
            onClick={() => _bringToFront(id)}
          >
            <DialogContent {...dialog} {...contentProps} />
          </div>
        </Draggable>
      );

      return showOverlay ? (
        <div className="Overlay" key={id}>
          {dragableItem()}
        </div>
      ) : (
        dragableItem()
      );
    });
  }

  const validCallback = callback => callback && typeof callback === 'function';

  const _bringToFront = useCallback(id => {
    setDialogs(dialogs => {
      const topDialog = dialogs.find(dialog => dialog.id === id);
      return topDialog
        ? [...dialogs.filter(dialog => dialog.id !== id), topDialog]
        : dialogs;
    });
  }, []);

  const _updateLastDialogPosition = dialogId => {
    const draggableItemBounds = document
      .querySelector(`#draggableItem-${dialogId}`)
      .getBoundingClientRect();
    setLastDialogPosition({
      x: draggableItemBounds.x,
      y: draggableItemBounds.y,
    });
  };

  return (
    <Provider value={{ create, dismiss, dismissAll, isEmpty }}>
      {
        !isEmpty() &&
        <div className="DraggableArea">{ renderDialogs() }</div>
      }
      { children }
    </Provider>
  )
}

export default DialogProvider