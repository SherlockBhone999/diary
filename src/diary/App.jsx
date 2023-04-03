
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Aboutpage from './pages/Aboutpage'
import ThisMonthpage from './pages/ThisMonthpage'
import Allpage from './pages/Allpage'
import Quotespage from './pages/Quotespage'
import Readpage from './pages/Readpage'

function App(){
  
  return <BrowserRouter >
  <Routes>
  <Route exact path='/' element={<Homepage/>} />
  <Route path='/this_month' element={<ThisMonthpage/>} />
  <Route path='/all' element={<Allpage/>} />
  <Route path='/quotes' element={<Quotespage/>} />
  <Route path='/about' element={<Aboutpage/>} />
  <Route path='/read' element={<Readpage />} />
  </Routes>
  </BrowserRouter>
}

export default App