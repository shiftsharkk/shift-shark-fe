import {Route, Routes as RouterRoutes} from 'react-router-dom'

import Root from '../components/pages/root'
import Login from '../components/pages/login'
import Onboarding from '../components/pages/onboarding'
import ComponentsTest from '../components/pages/compo'

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Root />} />
      <Route path="/compo" element={<ComponentsTest />} />
      <Route path="/hirer/login" element={<Login />} />
      <Route path="/hirer/onboarding" element={<Onboarding />} />
      <Route path="/hirer/dashboard" element={<div>Dashboard</div>} />
    </RouterRoutes>
  )
}

export default Routes