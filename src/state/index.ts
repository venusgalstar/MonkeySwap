import { AnyAction, ThunkAction, configureStore, Middleware } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import multicall from 'lib/state/multicall'
import { load, save } from 'redux-localstorage-simple'
import application from './application/reducer'
import burn from './burn/v2/reducer'
import burnV3 from './burn/v3/reducer'
import { updateVersion } from './global/actions'
import lists from './lists/reducer'
import mint from './mint/v2/reducer'
import mintV3 from './mint/v3/reducer'
import { routingApi } from './routing/slice'
import swap from './swap/reducer'
import transactions from './transactions/reducer'
import user from './user/reducer'
import wallets from './wallets/reducer'
import zap from './zap/reducer'
import bills from './bills'
import protocolDashboard from './protocolDashboard'
import farms from './farms'
import stats from './stats'
import pools from './pools'

const PERSISTED_KEYS: string[] = ['user', 'transactions']

let middleware: Middleware[] = []

if (typeof window !== 'undefined') {
  middleware = middleware.concat(save({ states: PERSISTED_KEYS, debounce: 1000 }))
}

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    wallets,
    swap,
    mint,
    mintV3,
    burn,
    burnV3,
    multicall: multicall.reducer,
    lists,
    zap,
    bills,
    protocolDashboard,
    farms,
    stats,
    pools,
    [routingApi.reducerPath]: routingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(routingApi.middleware).concat(middleware),
  preloadedState: typeof window !== 'undefined' ? load({ states: PERSISTED_KEYS, disableWarnings: true }) : undefined,
})

store.dispatch(updateVersion())

setupListeners(store.dispatch)

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>
