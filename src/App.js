import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import Header from './components/Header'
import TechItemDetails from './components/TechItemDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={TechItemDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
