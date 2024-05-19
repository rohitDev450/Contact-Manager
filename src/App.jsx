import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ContactList from './Compontents/Contacts/ContactList/ContactList'
import AddContact from './Compontents/Contacts/AddContact/AddContact'
import EditContact from './Compontents/Contacts/EditContact/EditContact'
import ViewContact from './Compontents/Contacts/ViewContact/ViewContact'
import NavBar from './Compontents/NavBar/NavBar'
import './index.css'
import Spinner from './Compontents/Spinner/Spinner'
import { Toaster } from 'react-hot-toast'



const App = () => {
  return (
    <>
     {/* <Spinner/> */}
      <NavBar/>
      <Routes>
          <Route path='/' element={<Navigate to={'/contacts/list'}/>}/>
          <Route path='/contacts/list' element={<ContactList/>}/>
          <Route path='/contacts/add' element={<AddContact/>}/>
          <Route path={`/contacts/edit/:ContactID`} element={<EditContact/>}/>
          <Route path={`/contacts/view/:ContactID`} element={<ViewContact/>}/>
      </Routes>
    <Toaster/>
    </>
  )
}

export default App
