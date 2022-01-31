import axios from "axios"
import React, {useState} from "react"
import Nav from '../components/Navbar'


const Speech = () =>{
  const [text, setText] = useState('')
  const send = () =>{
    // console.log(text)
    axios.post('/api/speech',{text})
      .then((data)=>document.getElementById('card').innerHTML=data.data.data)
  }
  return(
    <>
      <Nav />
      <div className='container mt-5'>
          <div className="card">
              <div className="card-body">
                  <nav className="navbar navbar-light bg-light">
                      <div className="container-fluid">
                          <span className="navbar-brand mb-0 h1">Selamat datang di Text To Speech</span>
                      </div>
                  </nav>
                  <div className="card" id="card" style={{
                          height:'350px',
                          maxHeight:'350px',
                          overflow:"auto"
                  }}>

                  </div>
                  <div className="d-flex mx-2 mt-2 mb-2">
                      <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Tulis Disini"
                          aria-label="Search"
                          onChange={(e)=>{
                            if(text.length<=100){
                              setText(e.target.value)
                            }else{
                              setText(e.target.value)
                              alert('Max 100 karakter')
                            }
                          }}/>
                      <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={()=>send()}
                          >Convert</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Speech

