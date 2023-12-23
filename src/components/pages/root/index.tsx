import {Navigate} from 'react-router-dom'

const Root = () => {
  return (
    <Navigate to="/service-provider/auth?intent=login" />
  )
}

export default Root