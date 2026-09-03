
import './App.css'
// import Button from './components/ui/Button';
// import { useAuth } from './hooks/useAuth';
import Login from './pages/Login/Login';


function App() {

  return <Login />
  
  // const { token, login, logout, loading } = useAuth();

  // async function testarLogin() {
  //   try {
  //     await login ({
  //       email: "lucas@teste.com",
  //       senha: "123456",
  //     });

      
  //     console.log("Login funcionou");
      
      
  //   } catch (erro) {
  //     console.error(erro)
  //   }
  // }

  // if (loading) {
  //   return <p>Carregando...</p>;
  // }
  // return (
    
  //   <div className="p-8" >
  //     <p className="mb-4" >Token:</p>
  //     <p className='mb-4 break-all' >{token ?? "Nenhum token"}</p>
  //     <div className='flex gap-4' >
  //       <Button onClick={testarLogin} > 
  //         fazer login 
  //       </Button>
  //       <Button onClick={logout} >
  //         Logout
  //       </Button>
  //     </div>
  //   </div>
  // )

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
