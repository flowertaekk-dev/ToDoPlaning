import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { createStore, combineReducers, applyMiddleware } from "redux"
import reduxThunk from "redux-thunk"
import { Provider } from "react-redux"

import App from "./Container/App/App"
import userReducer from "./store/reducers/userReducer"
import groupReducer from "./store/reducers/groupReducer"
import todoReducer from "./store/reducers/todoReducer"
import messageReducer from "./store/reducers/messageReducer"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  todo: todoReducer,
  message: messageReducer
})

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))

serviceWorker.unregister()
