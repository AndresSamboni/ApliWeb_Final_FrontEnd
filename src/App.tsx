import './App.css'

function App() {
  let var1: string;
  var1 = 'hola';
  var1 += ' como estas'; 
  return (
    <>
      <h1 className="font-semibold text-red-400">Vite + React + Tailwind CSS</h1>
      <h2>{ var1 }</h2>
    </>
  )
}

export default App
