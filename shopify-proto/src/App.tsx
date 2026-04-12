import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppShell } from './app/AppShell'
import { BuildABoxRoute } from './app/routes/BuildABoxRoute'
import { CartLabRoute } from './app/routes/CartLabRoute'
import { LowStockRoute } from './app/routes/LowStockRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />} path="/">
          <Route element={<Navigate replace to="/build-a-box" />} index />
          <Route element={<BuildABoxRoute />} path="build-a-box" />
          <Route element={<CartLabRoute />} path="cart-lab" />
          <Route element={<LowStockRoute />} path="low-stock" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
