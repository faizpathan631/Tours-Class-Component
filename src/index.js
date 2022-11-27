import React from 'react'
import Routing from './Routes'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
)
