import { router } from './app.routes.jsx'
import './features/shared/global.scss'
import { AuthProvider } from './features/auth/store/auth.context.jsx'
import { RouterProvider } from 'react-router'
import { PostContextProvider } from './features/post/store/post.context.jsx'


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