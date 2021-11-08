import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './app/theme'
import { logout, reloadToken } from './features/auth/authSlice'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      // handle expired token
      if (typeof error.response !== 'undefined' && error.response.status === 401) {
        store.dispatch(logout())
      }
    },
  }),
})

store.dispatch(reloadToken())

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
