import { router } from './app.routes.jsx'
import './style.scss'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { RouterProvider } from 'react-router'
import { PostContextProvider } from './features/post/post.context.jsx'


const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  )
}

export default App 