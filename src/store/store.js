import { combineReducers, legacy_createStore as createStore } from 'redux'
import { appReducer } from './app.reducer'

const rootReducer = combineReducers({
    appModule: appReducer,
})

export const store = createStore(rootReducer)


store.subscribe(() => {
    console.log('storeState:\n', store.getState())
})



