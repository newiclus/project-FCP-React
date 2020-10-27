import { createLogger } from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import rootReducer from './rootReducer'

let middleware = [thunk, promise]

/* eslint-disable no-undef */
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({})

  middleware = [...middleware, logger]
}
/* eslint-enable no-undef */


export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ...middleware
    )
  )
)
