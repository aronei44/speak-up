import React,{useState} from 'react'
import { Head } from '@inertiajs/inertia-react'
import Nav from '../components/Navbar'
import axios from 'axios'

export default function Welcome({chat}) {
  // console.log(chat)
  const [answer, setAnswer] = useState('')
  const [id, setId] = useState(0)
  const send = () =>{
    // console.log(answer, id)
    axios.post(`/api/question/${id}`,{answer:answer})
    .then(window.location.reload())
  }
  const deleteQuestion = (id) =>{
    axios.delete(`/api/question/${id}`)
    .then(window.location.reload())
    }
  return (
      <>
        <Head title="Admin Room" />
        <Nav />
        <div className='container'>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Pertanyaan</th>
                <th scope="col">Jawaban</th>
                <th scope="col">Banyak Ditanyakan</th>
                <th scope="col">Tambah Jawaban</th>
                <th scope="col">Hapus Pertanyaan</th>
              </tr>
            </thead>
            <tbody>
              {chat.map((data, index)=>{
                return(
                  <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{data.question}</td>
                    <td>{data.answer===null?'Not Answered':data.answer}</td>
                    <td>{data.faq}</td>
                    <td>
                      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#exampleModal"+data.id}>
                        Tambah
                      </button>
                      <div className="modal fade" id={"exampleModal"+data.id} tabIndex={-1} aria-labelledby={"exampleModalLabel"+data.id} aria-hidden="true">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={"exampleModalLabel"+data.id}>Tambah Jawaban {data.id}</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                              <h3>Pertanyaan : {data.question}</h3>
                              <textarea className='form-control' onChange={
                                (e)=>{
                                  setAnswer(e.target.value)
                                  setId(data.id)
                                }
                              }></textarea>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" onClick={()=>send()} className="btn btn-primary">Save changes</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button type="button" className="btn btn-danger" onClick={()=>deleteQuestion(data.id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

      </>
  )
}
