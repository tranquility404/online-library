import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const ErrorPage = React.lazy(() => import('./ui/pages/ErrorPage.jsx'));
const AuthenticationPage = React.lazy(() => import('./ui/pages/LoginPage/AuthenticationPage.jsx'));
const MainLayout = React.lazy(() => import('./ui/pages/MainLayout.jsx'));
const HomePage = React.lazy(() => import('./ui/pages/HomePage.jsx'));


// import BookDetails from './ui/pages/BookDetails.jsx'
// import QuizPage from './ui/pages/QuizPage/QuizPage.jsx'
// import EpubReader from './ui/pages/EpubReader.jsx'
import { AuthStatusProvider } from './ui/pages/LoginPage/AuthStatusContext.jsx';
import { AuthProvider } from './ui/pages/LoginPage/AuthContext.jsx';
import ProtectedRoute from './ui/components/ProtectedRoute.jsx';

function App() {
  // console.log("env", import.meta.env.VITE_BACKEND);

  return (
    <AuthStatusProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/login' element={
            <AuthProvider>
              <AuthenticationPage />
            </AuthProvider>
          } />

          <Route path='*' element={<ErrorPage />} />

          <Route element={<ProtectedRoute />} >

            <Route path='/' element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            {/* <Route path='/book-details' element={<BookDetails />} /> */}

            {/* <Route path='/quiz' element={<QuizPage />} /> */}
            {/* <Route path='/epub-reader' element={<EpubReader />} /> */}
            {/**/}
          </Route>


          {/* <Route path='/book-details' element={<BookDetails />} /> */}
          {/* <Route path='/chat-bot' element={<ChatBot />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthStatusProvider>

  )
}

export default App
