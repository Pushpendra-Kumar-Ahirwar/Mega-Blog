import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Protected,Login, } from './components/index.js'
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import Home from './pages/Home.jsx'


const router=createBrowserRouter([{
  path:'/',
  element:<App/>,
  children:[
    {
      path:'/',
      element:<Home/>
    },

    {
      path:'/login',
      element:(
        <Protected authentication={false}>
          <Login/>
        </Protected>
      ),
    },

    {
      path:'/signup',
      element:(<Protected authentication={false}>
        <Signup/>
      </Protected>),
    },
    {
      path:'/all-posts',
      element:(<Protected>
          <AllPosts/>
      </Protected>),
    },
    {
      path:'/add-post',
      element:(<Protected>
          <AddPost/>
      </Protected>),
    },
    {
      path:'/edit-post/:slug',
      element:(<Protected>
          <EditPost/>
      </Protected>),
    },
    {
      path:'/post/:slug',
      element:
        <Post/>
    },

  ]
}])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
