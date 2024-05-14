import { Toaster, toast } from 'sonner'

function App() {

  return (
    //<h1 className="text-1xl font-bold underline">Josias fodão</h1>
    <div>
    <Toaster />
    <button onClick={() => toast('My first toast')}>
      Give me a toast
    </button>
  </div>
  )

}

export default App