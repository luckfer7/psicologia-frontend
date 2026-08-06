import './components/ui/Button'
import './App.css'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Card from './components/ui/Card'
import Badge from './components/ui/Badge'
import Spinner from './components/ui/Spinner'
import Modal from './components/ui/Modal'
import Container from './components/layout/Container'
import PageHeader from './components/layout/PageHeader'
import NavBar from './components/layout/NavBar'
import SideBar from './components/layout/Sidebar'

function App() {
  
  return <AppRoutes />

  // return (
  //   <>
  //     <Container>
  //       <NavBar />
  //       <PageHeader title='Pacientes' subtitle="gerencie seus pacientes" >
  //         <Button>Novo paciente</Button>
  //       </PageHeader>
  //       <SideBar></SideBar>
  //       <Button>Salvar</Button>
  //       <Input placeholder='nome do paciente' />
  //       <Card>
  //         <h2>Paciente</h2>
  //         <Badge>Pendente</Badge>
  //         <Spinner />
  //       </Card>

  //       <Modal 
  //         isOpen={true}
  //         title="Novo paciente"
  //         onClose={() =>{}}
  //       >
  //         Conteúdo
  //       </Modal>
  //     </Container>
  //   </>
  // )
}

export default App
