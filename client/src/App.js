import { Routes, Route } from "react-router-dom"

import { PostList } from "./components/PostLists"
import { PostProvider } from "./contexts/PostContext"
import { Post } from "./components/Post"
import { Login } from './components/Login';

function App() {
  return (
    <div className="container">
      
      <Routes>
      <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<PostList />} /> */}
        <Route
          path="/posts"
          element={
            <PostProvider>
              <PostList />
            </PostProvider>
          }
        />
        <Route
          path="/posts/:id"
          element={
            // use Post provider context for rendering
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </div>
  )
}

export default App

