import { router } from './app.routes.jsx'
import './style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { RouterProvider } from 'react-router'


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App 