import './components/ui/Button'
import './App.css'
import { login } from './services/auth.service'
import Button from './components/ui/Button';


function App() {
  
  async function testarLogin() {
    try {
      const resposta = await login({
        email: "admin@teste.com",
        senha: "123456"
      });

      console.log(resposta);
      
    } catch (erro) {
      console.error(erro)
    }
  }

  return (
    <Button onClick={testarLogin} >Testar Login</Button>
  )

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
