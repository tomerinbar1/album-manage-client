import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/style.scss'
import { AppIndex } from './pages/AppIndex'

function App() {
  return (
    <Provider store={store}>
        <AppIndex />
    </Provider>
  )
}

export default App
