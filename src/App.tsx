import './components/ui/Button'
import './App.css'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Card from './components/ui/Card'
import Badge from './components/ui/Badge'
import Spinner from './components/ui/Spinner'
import Modal from './components/ui/Modal'

function App() {
  

  return (
    <>
      <Button>Salvar</Button>
      <Input placeholder='nome do paciente' />
      <Card>
        <h2>Paciente</h2>
        <Badge>Pendente</Badge>
        <Spinner />
      </Card>

      <Modal 
        isOpen={true}
        title="Novo paciente"
        onClose={() =>{}}
      >
        Conteúdo
      </Modal>
    </>
  )
}

export default App
