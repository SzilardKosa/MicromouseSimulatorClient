import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './app/theme'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
