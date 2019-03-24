import React from 'react'
import axios from '../../config/axios';
import { Redirect } from 'react-router-dom'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            redirectList: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //creating one event handler for all input fileds - for this to work ,name prop in imp
    //regular u will still need to bind the this keyword
    //this will work if we do validation all at once, filed wise validation won't work

    handleChange(e){

        //to stop synthetic event error bcoz we are directly reading value from target

        e.persist()
        this.setState(()=>({
            //dynamically setting 
            [e.target.name] : e.target.value
        }))
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
            //cleint side validations
            //TODO

            axios.post('/users/login', formData)
            .then((response)=>{
                console.log(response.data)
                const token = response.data.token
                localStorage.setItem('token',token) //store token
                this.setState(()=>({
                    email:'',
                    password:'',
                    redirectList: true
                }))
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    

    render(){
        if (this.state.redirectList){
            return <Redirect to = '/contacts'/>
        }
        
        return (
            <div>
                <h2> Login </h2>
                <form onSubmit = {this.handleSubmit} > 
                    <label>email <input type = 'text' value = {this.state.email} name = 'email' onChange = {this.handleChange} /> </label> <br/>
                    <label>password <input type = 'password' value = {this.state.password} name = 'password' onChange = {this.handleChange} /> </label> <br/>
                    <input type = 'submit' />
                </form>
            </div>
        )
    }
}

export default Login