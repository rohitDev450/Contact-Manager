import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../Contact Service/ContactService'
import toast from 'react-hot-toast'

const AddContact = () => {
  let navigate = useNavigate()
  let [state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      email:"",
      title:"",
      company:"",
      groupId:""
    },
    groups:[],
    errorMessage:""
  })
  let {loading,contact,groups,errorMessage}=state

  let updateInput=(event)=>{
    setState({...state,contact:{
      ...state.contact,
      [event.target.name]:event.target.value
    }})
  }

  let submitForm=(event)=>{
    event.preventDefault()
    let promise=new Promise((res,rej)=>{
      let response=ContactService.createContact(contact)
      res(response)
    })
    promise.then((res1)=>{
      if(res1){
        navigate("/contacts/list",{replace:true})
        toast.success("Contact is Added Successfully!!")
      }
      else{
        navigate("/contact/add",{replace:false})
      }
    }).catch(()=>{
      toast.error("Data not posted!!")
    })
  }
  return (
    <>
       {/* <pre>{JSON.stringify(contact)}</pre> */}
        <section className='edit-contact'>
        <div className="container p-3">
          <div className="row">
            <p className='fw-bold h4 text-success'>Add Contact</p>
            <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit repellendus facere ad excepturi nostrum deserunt sapiente necessitatibus ipsa voluptas eos dolore illum minus nihil, cum culpa rem aperiam placeat ea?</p>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
               <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" name="name" value={contact.name} onChange={updateInput} required={true} id="" placeholder='Enter Name' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="photo" value={contact.photo} onChange={updateInput} required={true} id="" placeholder='Photo url' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="contact" value={contact.contact} onChange={updateInput} required={true} id="" placeholder='Mobile Number' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="email" value={contact.email} onChange={updateInput} required={true} id="" placeholder='Email ' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="company" value={contact.company} onChange={updateInput} required={true} id="" placeholder='Comapny Name' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="title" value={contact.title} onChange={updateInput} required={true} id="" placeholder='Title Name' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="groupId" value={contact.groupId} onChange={updateInput} required={true} id="" placeholder='Comapny Group' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="submit" name="" value={"Create"} className='btn btn-success'/>
                  <Link to={'/'} className='btn btn-danger ms-2'>Cancle</Link>
                </div>
                
               </form>

            </div>
            <div className="col-md-8">
                <img src={contact.photo} alt=""  className='image-fulid contact-image'/>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default AddContact
