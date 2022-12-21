import classNames from "classnames"

const customStyle = {
  overlay: {
    zIndex: 1071,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const OHIFModal = ({
  className,
  shouldCloseOnEsc,
  isOpen,
  title
}) => {
  const renderHeader = () => {

  }

  const classes = fullscreen
  ? classNames('OHIFModal', className, 'OHIFModal-fullscreen')
  : classNames('OHIFModal', className)

  return (
    <Modal
      className={classes}
      data-cy="modal"
      shouldCloseOnEsc={shouldCloseOnEsc}
      isOpen={isOpen}
      title={title}
      style={customStyle}
    >
      <>
        {renderHeader()}
        <div className="OHIFModal__content" data-cy="modal-content">
          {children}
        </div>
      </>
    </Modal>
  )
}

export default OHIFModal