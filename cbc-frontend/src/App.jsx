import { useState } from 'react'
import './App.css'
import ProductCard from './components/productCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductCard name="i pad" price="$499" image="https://onei.lk/wp-content/uploads/2023/04/iPad-Air-5th-Space-Grey-700x700.jpg"/>
    </>
  )
}

export default App
