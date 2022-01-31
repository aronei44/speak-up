import React, {useState} from 'react'
import { Head } from '@inertiajs/inertia-react'
import Nav from '../components/Navbar'
import axios from 'axios'


const Left = ({body}) =>{
    
    return (
      <div className="row ms-3 mt-1 me-3 scroll">
        <div className="col-8 card left">
          <p>{body===undefined?'Sorry, My Master Not Tell Me The Answer':body}</p>
        </div>
      </div>
    )
  }
  const Right = ({body}) =>{
    
    return (
      <div className="row me-3 mt-1 ms-3 scroll">
        <div className="col-3">
        </div>
        <div className="col-8 card right first">
          <p>{body}</p>
        </div>
      </div>
    )
  }
  
export default function Index() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    // console.log(messages)
    const send = () =>{
        axios.post('/api/answer',{question:message})
            .then((data)=>{
                setMessages(messages => [...messages,{
                body:data.data.data.answer,
                from:'bot'
            }])
            // console.log(data.data.data)
        })
    }
    return (
      <>
        <Head title="Chat Room" />
        <Nav />
        <div className='container mt-5'>
            <div className="card">
                <div className="card-body">
                    <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid">
                            <span className="navbar-brand mb-0 h1">Selamat datang di chatbot</span>
                        </div>
                    </nav>
                    <div className="card" style={{
                            height:'350px',
                            maxHeight:'350px',
                            overflow:"auto"
                    }}>
                        <div className="list-group" id='scroll'>
                           {messages.map((data, index)=>{
                               if(data.from==='user'){
                                   return(
                                       <Right body={data.body} key={index}/>
                                   )
                               }else{
                                   return(
                                       <Left body={data.body} key={index}/>
                                   )
                               }
                           })}
                        </div>
                    </div>
                    <div className="d-flex mx-2 mt-2 mb-2">
                        <input 
                            className="form-control me-2" 
                            type="text" 
                            placeholder="Tulis Pesan Anda" 
                            aria-label="Search"
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}/>
                        <button 
                            className="btn btn-outline-success" 
                            type="button" 
                            onClick={()=>{
                                send()
                                setMessages([...messages, {
                                    body:message,
                                    from:'user'
                                }])
                                setMessage('')
                            }}
                            >Kirim</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}