import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios';
class ContactShow extends React.Component{
    constructor(){
        super()
        this.state = {
            contact : {}
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        const id = this.props.match.params.id //provided by react router
        axios.get(`/contacts/${id}`,{
            headers:{
                'x-autho':localStorage.getItem('token')
            }
        })
        .then((response)=>{
            const contact = response.data
            console.log(contact)
            this.setState(()=>({ contact }))
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    handleDelete(){
        const confirmDelete = window.confirm('Are you sure?')
        if (confirmDelete){
            axios.delete(`/contacts/${this.state.contact._id}`,{
                headers: {
                    'x-autho': localStorage.getItem('token')
                }
            })
            .then((response)=>{
                console.log(response)
                //redirect
                this.props.history.push('/contacts')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    render(){
        return(
            <div>
                <h2> {this.state.contact.name} </h2>
                <p> {this.state.contact.email} - {this.state.contact.mobile} </p>
                <Link to = {`/contacts/edit/${this.state.contact._id}`}> Edit </Link>
                <button onClick ={this.handleDelete} > Delete </button>
                <Link to = '/contacts'> Back </Link>
            </div>
        )
    }
}

export default ContactShow