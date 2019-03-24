import React from 'react'
import ContactForm from './ContactForm'
import { Link } from 'react-router-dom'
import axios from '../../config/axios';

class ContactNew extends React.Component{

    constructor(){
        super()

        this.handleContactSubmission = this.handleContactSubmission.bind(this)
    }

    handleContactSubmission(data){
        console.log(data)
       // console.log(this) // refers to handleContactSubmission but now ContactNew
      
        axios.post('/contacts',data,{
            headers: {
                'x-autho' : localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log(response.data)
            const contact = response.data
            //redirect
            this.props.history.push(`/contacts/${contact._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })

    }
    render(){
        return(
            <div> 
            <h2> Add Contact </h2>
            <ContactForm handleContactSubmission = {this.handleContactSubmission} />
            <Link to = '/contacts'> back </Link>
            </div>
        )
    }
}
export default ContactNew