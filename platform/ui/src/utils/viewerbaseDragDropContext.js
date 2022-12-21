import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

const isTouchDevice = !!('ontouchstart' in window || navigator.maxTouchPoints)

export default function viewerbaseDragDropContext(DecoratedClass) {
  const backend = isTouchDevice ? TouchBackend : HTML5Backend
  const opts = isTouchDevice ? { enableMouseEvent: true } : {}

  return (props) => (
    <DndProvider backend={backend} opts={opts}>
      <DecoratedClass {...props} />
    </DndProvider>
  )
}