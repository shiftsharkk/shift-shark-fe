import {Navigate} from 'react-router-dom'

const Root = () => {
  return (
    <Navigate to="/auth?intent=login" />
  )
}

export default Root