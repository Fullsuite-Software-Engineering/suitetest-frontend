import { BrowserRouter, Routes, Route } from 'react-router'
import OnboardingPage from './pages/applicant/OnboardingPage' 
function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={ <OnboardingPage/> }/>
        {/* /admin */}
      </Routes>
   </BrowserRouter>
  )
}

export default App
