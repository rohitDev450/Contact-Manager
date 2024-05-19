// import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ContactService } from '../../Contact Service/ContactService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ViewContact = () => {
  let { ContactID } = useParams();
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      contact: "",
      email: "",
      title: "",
      company: "",
      groupID: ""
    },
    groups:[],
    errorMessage: ""
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(ContactID);
        setState({ ...state, loading: false, contact: response.data });
      } catch (error) {
        setState({ ...state, loading: false, errorMessage: "Data not Found" });
        toast.error("Data not Found");
      }
    };
    fetchContact();
  }, [ContactID]);

  let { loading, contact, errorMessage } = state;

  return (
    <>
      <section className='view-contact'>
        <div className="container align-items-center">
          <div className="row">
            <div className="col-md-4 my-3">
              <img src={contact.photo || "default-image-url"} alt="" className='img-fluid contact-image' />
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <ul className='list-group'>
                <li className="list-group-item list-group-item-action">Name: <span className='fw-bold ms-1'>{contact.name}</span></li>
                <li className="list-group-item list-group-item-action">Email: <span className='fw-bold ms-1'>{contact.email}</span></li>
                <li className="list-group-item list-group-item-action">Contact: <span className='fw-bold ms-1'>{contact.contact}</span></li>
                <li className="list-group-item list-group-item-action">Company: <span className='fw-bold ms-1'>{contact.company}</span></li>
                <li className="list-group-item list-group-item-action">Title: <span className='fw-bold ms-1'>{contact.title}</span></li>
                <li className="list-group-item list-group-item-action">Company Group: <span className='fw-bold ms-1'>{contact.groupID}</span></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <Link to={'/'} className='btn btn-warning my-1'>Back</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewContact;
