import React from 'react'

class ContactForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: props.name ? props.name : '', //value for edit. undefined for new
            email: props.email ? props.email: '',
            mobile: props.mobile ? props.mobile: ''
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName = (e)=>{
        const name = e.target.value
        this.setState(() =>({ name }))
    }

    handleEmail(e){
        const email = e.target.value
        this.setState(() =>({ email }))
    }

    handleMobile(e){
        const mobile = e.target.value
        this.setState(() =>({ mobile }))
    }

    handleSubmit(e){
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            mobile: this.state.mobile
        }

        this.props.handleContactSubmission(formData)
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        name <input type='text' value = {this.state.name} onChange = {this.handleName} />
                    </label><br/>
                    <label>
                        email <input type='text' value = {this.state.email} onChange = {this.handleEmail} />
                    </label><br/>
                    <label>
                        mobile <input type='text' value = {this.state.mobile} onChange = {this.handleMobile.bind(this)} />
                    </label><br/>
                    <input type='submit' value = 'submit'/>
                </form>
            </div>
        )
    }
}

export default ContactForm