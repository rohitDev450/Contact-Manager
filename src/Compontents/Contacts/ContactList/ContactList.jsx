import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../Contact Service/ContactService'
import Spinner from '../../Spinner/Spinner'
import toast from 'react-hot-toast'

const ContactList = () => {
  let navigate = useNavigate();
  let { contactID } = useParams();
  
  let [query, setQuery] = useState({
    text: "",
  });
  
  let [state, setState] = useState({
    loading: false,
    contacts: [], // Corrected state property name
    filteredContacts: [], // Corrected state property name
    errorMessage: "",
  });

  useEffect(() => {
    setState(prevState => ({ ...prevState, loading: true }));

    ContactService.getAllContact()
      .then(response => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        }));
      })
      .catch(error => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: "Data not found",
        }));
        toast.error("Data not found");
      });
  }, []);

  const deleteHandle = (contactID) => {
    ContactService.deleteContact(contactID)
      .then(response => {
        if (response.status === 200) {
          setState(prevState => ({
            ...prevState,
            contacts: prevState.contacts.filter(contact => contact.id !== contactID),
            filteredContacts: prevState.filteredContacts.filter(contact => contact.id !== contactID),
          }));
          toast.success("Contact Deleted Successfully!!");
        } else {
          toast.error("Failed to delete the contact");
        }
      })
      .catch(error => {
        toast.error("Error deleting contact");
      });
  };

  const SearchContact = (event) => {
    setQuery({ ...query, text: event.target.value });
    let filteredContacts = state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setState(prevState => ({ ...prevState, filteredContacts }));
  };

  let { loading, contacts, filteredContacts, errorMessage } = state;

  return (
    <>
      <section className='contact-search p-3'>
        <div className="container">
          <div className="grid">
            <div className="row">
              <p className='h3'>
                Contact Manager <Link to={'/contacts/add'} className='btn btn-primary'>
                  <i className='fa fa-plus-circle me-2'></i>New
                </Link>
              </p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus perferendis et saepe! Deleniti velit a ullam itaque nostrum omnis veritatis praesentium iusto? Accusantium sed iste quia incidunt, reprehenderit assumenda est?</p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-8">
                    <input 
                      type="search" 
                      name='text' 
                      value={query.text} 
                      onChange={SearchContact} 
                      placeholder='Search Name' 
                      className='form-control' 
                    />
                  </div>
                  <div className="col-md-4">
                    <input type="submit" name='submit' className='btn btn-outline-dark' />
                  </div>
                </div>
              </div>
            </div>

            <section className='contact-card'>
              <div className="container my-5">
                <div className="row">
                  {loading ? <Spinner /> : (
                    filteredContacts.length > 0 ? (
                      filteredContacts.map(cont => (
                        <div className="col-md-6 p-3" key={cont.id}>
                          <div className="card">
                            <div className="card-body">
                              <div className="row d-flex align-items-center">
                                <div className="col-md-4">
                                  <img src={cont.photo} alt="" className='image-fluid contact-image' />
                                </div>
                                <div className="col-md-7">
                                  <ul className='list-group'>
                                    <li className="list-group-item list-group-item-action">Name:<span className='fw-bold ms-1'>{cont.name}</span></li>
                                    <li className="list-group-item list-group-item-action">Email:<span className='fw-bold ms-1'>{cont.email}</span></li>
                                    <li className="list-group-item list-group-item-action">Contact:<span className='fw-bold ms-1'>{cont.contact}</span></li>
                                  </ul>
                                </div>
                                <div className="col-md-1 d-flex flex-column p-1">
                                  <Link to={`/contacts/view/${cont.id}`} className='btn btn-warning my-1 p-1'><i className='fa fa-eye' /></Link>
                                  <Link to={`/contacts/edit/${cont.id}`} className='btn btn-primary my-1 p-1'><i className='fa fa-pen' /></Link>
                                  <button className='btn btn-danger my-1' onClick={() => deleteHandle(cont.id)}><i className='fa fa-trash' /></button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-md-12">
                        <p className="text-center">No contacts found</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactList;
