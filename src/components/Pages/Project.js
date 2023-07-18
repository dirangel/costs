import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from  '../project/ProjectForm'
import Message from '../layout/Message'


function Project(){

        const { id } = useParams()

        const [project, setProject] = useState([])
        const [showProjectForm, setShowProjectForm] = useState(false)
        const [showServiceForm, setShowServiceForm] = useState(false)
        const [message, setMessage] = useState()
        const [type, setType] = useState()

        useEffect(() => {
          setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
            }).then((resp) => resp.json())
              .then((data) => {
                setProject(data)
              })
              .catch((err) => console.log(err))
          }, 500);
        }, [id])



        function editPost(project){
          setProject('')

          console.log('Budget: ', project.budget)
          console.log('Cost: ', project.cost)
          if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('error')
            return false
          }

          const fet = fetch(`http://localhost:5000/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(project),
        }).then(resp => resp.json())
          .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
          })
          .catch((err) => console.log(err))

        }

        function toggleProjectForm(){
          setShowProjectForm(!showProjectForm)
        }

        function toggleServiceForm(){
          setShowServiceForm(!showServiceForm)
        }

        return(
            <>
             {project.name ? (
               <div className={styles.project_details}>
                  <Container customClass="column"></Container>
                    {message && <Message  type={type} msg={message}/>}
                    <div className={styles.details_container}>
                      <h1>Projeto: {project.name}</h1>
                      <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                      </button>
                      {!showProjectForm ? (
                        <div className={styles.project_info}>
                          <p>
                            <span>Categoria: </span> {project.category.name}
                          </p>
                          <p>
                            <span>Total de orçamento: </span> {project.budget}
                          </p>
                          <p>
                            <span>Total Utilizado: </span> R${project.cost}
                          </p>
                        </div>
                      ) : (
                        <div className={styles.project_info}>
                          <ProjectForm
                            handleSubmit={editPost}
                            btnText="Concluir edição"
                            projectData={project}
                          />
                        </div>
                      )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                      </button>
                      <div className={styles.project_info}>
                        {showServiceForm &&
                          <div>Formulário do serviço</div>
                        }
                      </div>
                      <h2>Serviços</h2>
                      <Container>
                        <p>Itens de serviços</p>
                      </Container>
                    </div>
               </div>
              ) : (<Loading/>)}
           </>

        )
    }

export default Project