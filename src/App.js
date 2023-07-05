import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/style.scss'
import { AppIndex } from './pages/AppIndex'
import { AppHeader } from './components/AppHeader'

function App() {
  return (
    <Provider store={store}>
      <AppHeader />
      <AppIndex />
    </Provider>
  )
}

export default App
