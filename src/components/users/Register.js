import React from 'react'
import axios from '../../config/axios'

class Register extends React.Component{
    constructor() {
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            noticeMsg: ''
        }

        //3rd handle this binding in construcor
        this.emailChange = this.emailChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        //formdata fields = mongodb schema
        

        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        console.log(formData)

        //client side validations
        //TODO
        //axios.post('http://localhost:3001')

        axios.post('/users/register',formData)
        .then((response)=>{
            console.log(response.data)
            const { notice } = response.data
            this.setState(()=>({
                username: '',
                email: '',
                password: '',
                noticeMsg: notice
            }))
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    //1st: es6 arrow functions for event handles where we donot have to bind this keyword

    userNameChange = ((e) =>{
        const username = e.target.value
        this.setState (()=> ({ username : username }))
    })

    //2nd way: Regular method used for event handlers bound in constructor
    //- binding issue only for event handlers
    emailChange(e){
       // console.log(e.target.value)
        //console.log(this) //= undefined bcoz this refers to global variable not register object
        const email = e.target.value
        this.setState(()=>({email: email}))
    }

    //bound the this keyword in method invocation

    passwordChange (e){
        //console.log(this) //refers to register object
        const password = e.target.value
        this.setState(()=>({password: password}))
    }

    render(){
        return(
            <div>
                <h2> Register with us </h2>
                {this.state.noticeMsg && <p> {this.state.noticeMsg} </p>}

                <form onSubmit = {this.handleSubmit} >
                    <label>username <input type='text' value={this.state.username} onChange={this.userNameChange} /> </label> <br/>
                    <label>email <input type='text' value={this.state.email} onChange = {this.emailChange} /></label> <br />
    {/* another approach to bind the this keyword is setting while calling the event handle function*/ }
                    <label>password <input type='password' value={this.state.password}  onChange = {this.passwordChange.bind(this)} /></label> <br />
           {/*         <label>password confirmation <input type='password'/></label> <br /> */}
                    <input type='submit' />
                </form>
            </div>
        )
    }
}

export default Register