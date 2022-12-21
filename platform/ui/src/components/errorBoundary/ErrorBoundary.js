
import React from 'react';
import PropTypes from 'prop-types'
import { ErrorBoundary } from 'react-error-boundary'

const ErrorFallback = ({ error, componentStack, resetErrorBoundary }) => {
  return (
    <div className="ErrorFallback" role="alert">
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
      <pre>{componentStack}</pre>
    </div>
  );
};

const OHIFErrorBoundary = ({
  context = 'OHIF',
  onReset = () => { },
  onError = () => { },
  fallbackComponent,// 出错的应急展示组件
  children
}) => {
  // 错误处理函数
  const onErrorHandler = (error, componentStack) => {
    console.error(`${context} Error Boundary`, error, componentStack);
    onError(error, componentStack);
  }
  // 重置函数
  const onResetHandler = () => {
    onReset();
  }

  return (
    <ErrorBoundary
    FallbackComponent={fallbackComponent || ErrorFallback}
      onReset={onResetHandler}
      onError={onErrorHandler}
    >
      {children}
    </ErrorBoundary>
  )
}

OHIFErrorBoundary.propTypes = {
  context: PropTypes.string,
  onReset: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node.isRequired,
  fallbackComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]),
};

export default OHIFErrorBoundary;