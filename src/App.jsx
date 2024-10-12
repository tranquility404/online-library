import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './ui/pages/MainLayout.jsx'
import HomePage from './ui/pages/HomePage.jsx'
import ErrorPage from './ui/pages/ErrorPage.jsx'
import BookDetails from './ui/pages/BookDetails.jsx'
// import ChatBot from './ui/pages/ChatBot.jsx'
import QuizPage from './ui/pages/QuizPage/QuizPage.jsx'
import EpubReader from './ui/pages/EpubReader.jsx'
import LoginPage from './ui/pages/LoginPage/LoginPage.jsx'
import { AuthProvider } from './ui/pages/LoginPage/AuthContext.jsx'
import ProtectedRoute from './ui/components/ProtectedRoute.jsx'

function App() {
  console.log("env", import.meta.env.VITE_BACKEND);
    
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<ErrorPage />} />

          <Route element={<ProtectedRoute />} >
          
            <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            <Route path='/book-details' element={<BookDetails />} />

            <Route path='/quiz' element={<QuizPage />} />
            <Route path='/epub-reader' element={<EpubReader />} />
            {/**/}
          </Route>


          {/* <Route path='/book-details' element={<BookDetails />} /> */}
          {/* <Route path='/chat-bot' element={<ChatBot />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
