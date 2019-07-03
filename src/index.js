import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { createStore, combineReducers } from "redux"
import { Provider } from "react-redux"

import App from "./Container/App/App"
import userReducer from "./store/reducers/userReducer"
import groupReducer from "./store/reducers/groupReducer"
import todoReducer from "./store/reducers/todoReducer"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  todo: todoReducer
})

const store = createStore(rootReducer)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))

serviceWorker.unregister()
