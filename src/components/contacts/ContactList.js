import React from 'react'
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

class ContactList extends React.Component{
    constructor(){
        super()
        this.state = {
            contacts: []
        }
    }

componentDidMount() {
    console.log('cdid')
    axios.get('/contacts', {
        headers: {
            'x-autho': localStorage.getItem('token')
        }
    })
    .then((response)=>{
        console.log(response.data)
        const contacts = response.data
        console.log('hi', contacts)
        this.setState(()=>({ contacts })  
    )})
    .catch((err)=>{
        console.log(err)
    })
}

    render() {
        return (
            <div>
                <h2> Listing Contacts - {this.state.contacts.length} </h2>
                <ul>
                    {this.state.contacts.map(function(contact){
                        return (
                        <li key = {contact._id}> <Link to={`/contacts/${contact._id}`}> {contact.name}</Link> - {contact.mobile}  </li> )
                    })}
                </ul>

                <Link to = "/contacts/new">Add Contact </Link>
            </div>
        )
    }
}

export default ContactList