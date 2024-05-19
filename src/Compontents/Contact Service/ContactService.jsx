import axios from "axios"

export class ContactService{
    static serverurl='http://localhost:5000'
    static getAllContact(){
        let dataurl=`${this.serverurl}/contact`
        return axios.get(dataurl)
    }
    static getContact(contactID){
        let dataurl=`${this.serverurl}/contact/${contactID}`
        return axios.get(dataurl)
    }
    static createContact(contact){
        let dataurl=`${this.serverurl}/contact`
        return axios.post(dataurl,contact)
    }
    static updateContact(contact,contactID){
        let dataurl=`${this.serverurl}/contact/${contactID}`
        return axios.put(dataurl,contact)
    }
    static deleteContact(contactID){
        let dataurl=`${this.serverurl}/contact/${contactID}`
        return axios.delete(dataurl,contactID)
    }
}