import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../Contact Service/ContactService'
import toast from 'react-hot-toast'


const EditContact = () => {
  let navigate=useNavigate()
  let {ContactID}=useParams()
  let [state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:"",
      email:"",
      title:"",
      company:"",
      groupID:""
    },
    groups:[],
    errorMessage:""
  })

  useEffect(()=>{
    let promise=new Promise((res,rej)=>{
      setState({...state,loading:true})
      let response=ContactService.getContact(ContactID)
      res(response)
    })
    promise.then((res1)=>{
      setState({...state,loading:false,contact:res1.data})
    }).catch(()=>{
      setState({...state,loading:false,errorMessage:toast.error("Data not Found")})
    })
  },[ContactID])

  let updateInput=(event)=>{
    setState({...state,contact:{
      ...state.contact,
      [event.target.name]:event.target.value
    }})
  }
  let submitForm=(event)=>{
    event.preventDefault()
    let promise=new Promise((res,rej)=>{
      let response=ContactService.updateContact(contact,ContactID)
      res(response)
    })
    promise.then((res1)=>{
      if(res1){
        navigate("/contacts/list",{replace:true})
        toast.success("Contact Update successfully!!!")
      }
      else{
        navigate(`/contact/edit/${ContactID}`,{replace:false})
      }
    }).catch(()=>{
      toast.error("Data not Update!!")
    })
  }
 let {loading,contact,groups,errorMessage}=state
  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
      <section className='edit-contact'>
        <div className="container p-3">
          <div className="row">
            <p className='fw-bold h4 text-primary'>Edit Contact</p>
            <p className='fst-italic'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit repellendus facere ad excepturi nostrum deserunt sapiente necessitatibus ipsa voluptas eos dolore illum minus nihil, cum culpa rem aperiam placeat ea?</p>
          </div>
          <div className="row d-flex align-items-center">
            <div className="col-md-4">
               <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" name="name" id="" onChange={updateInput} value={contact.name} placeholder='Enter Name' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="photo" onChange={updateInput} id="" value={contact.photo} placeholder='Photo url' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="contact" onChange={updateInput} id="" value={contact.contact} placeholder='Mobile Number' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="email" onChange={updateInput} id="" value={contact.email} placeholder='Email ' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="company" onChange={updateInput} id="" value={contact.company} placeholder='Comapny Name' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="title" onChange={updateInput} id="" value={contact.title} placeholder='Title Name' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="text" name="groupId" onChange={updateInput} id="" value={contact.groupID} placeholder='Comapny Group' className='form-control'/>
                </div>
                <div className="mb-2">
                  <input type="submit" name="" value={"Update"} className='btn btn-primary'/>
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

export default EditContact
