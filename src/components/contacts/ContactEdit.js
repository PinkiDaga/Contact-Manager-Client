import React from 'react'
import ContactForm from './ContactForm'
import axios from '../../config/axios';

class ContactEdit extends React.Component{
    constructor(){
        super()
        this.state = {
            contact:{},
            isLoaded: false
        }
        this.handleContactSubmission = this.handleContactSubmission.bind(this)
    }

    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/contacts/${id}`,{
            headers:{
                'x-autho': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const contact = response.data
          //  console.log(contact)
            this.setState(()=>({
                contact : contact,
                isLoaded: true
            }))
           console.log('s',this.state.contact)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleContactSubmission(formData){  
      //   console.log(formData)
        // console.log('handles',this.state.contact._id)
        axios.put(`/contacts/${this.state.contact._id}`,formData,{
            headers:{
                'x-autho': localStorage.getItem('token')
            }
        })
        .then((response)=>{
            console.log('response',response.data)
            const contact = response.data
            this.props.history.push(`/contacts/${contact._id}`)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    render(){
        console.log('render',this.state.contact)
        return(
            <div>
                <h2>Edit Contact</h2>
               
                {
                    this.state.isLoaded && <ContactForm name = {this.state.contact.name}
                    email = {this.state.contact.email}
                    mobile = {this.state.contact.mobile}
                    handleContactSubmission  = {this.handleContactSubmission}
                    />
                }
                
            </div>
        )
    }
}

export default ContactEdit