import React from 'react';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import {SignUpContainer,SignUpTitle} from './sign-up.styles'

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    hundleSubmit=async event=>{
        event.preventDefault();

        const {displayName,email,password,confirmPassword} = this.state;

        if (password!==confirmPassword){
            alert("Password don't match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword:''
            });
        }catch (e) {
            console.log(e)
        }
    };
    handleChange=event=>{
        const {name,value} = event.target;
        this.setState({[name]:value});
    };

    render(){
        const {displayName,email,password,confirmPassword} = this.state;
        return(
            <SignUpContainer>
                <SignUpTitle>I donot have a account</SignUpTitle>
                <span>Sign up whith your email and password</span>
                <form className="sign-up-form" onSubmit={this.hundleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </SignUpContainer>
        )
    }
}

export default SignUp;
