import React from 'react'
import { StatusBar } from 'react-native'

import Calculator from './src/screen/Calculator'

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Calculator />
    </>
  )
}

export default App
