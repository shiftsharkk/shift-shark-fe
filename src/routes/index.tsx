import {Route, Routes as RouterRoutes} from 'react-router-dom'

import Login from '../components/pages/login'
import Onboarding from '../components/pages/onboarding'

const Routes = () => {
  return (
    <RouterRoutes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/hirer/login" element={<Login />} />
      <Route path="/hirer/onboarding" element={<Onboarding />} />
      <Route path="/hirer/dashboard" element={<div>Dashboard</div>} />
    </RouterRoutes>
  )
}

export default Routes