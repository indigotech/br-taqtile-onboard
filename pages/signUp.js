import React, {Component} from 'react'
import {Text, View, Switch} from 'react-native'
import {Input, LoadingToken, Button, LabeledSwitch} from '../components/index'

import Authorizer from '../authorizer'


export default class SignUp extends Component{
    constructor(props){
        super(props)
        this.state={
            name: '',
            admin: false,
            email: '',
            pass: '',
            invalidEmail: false,
            invalidPassword: false,
            invalidName: false,
            serverResponse: {
              isLoading: false,
              error: false,
              message: ""
            }
        }
        this.Authorizer = new Authorizer();
    }

    //each of them is responsible for checking the validity, setting it onto the state and returning it
    validateName(){
        let pat = /^[A-z]+$/
        if(!pat.test(this.state.name)){
            this.setState({
                invalidName: true
            })
            return false
        }else{
            this.setState({
                invalidName: false
            })
            return true
        }
    }

    validateEmail(){
        //regex that matches 99.99% of emails 
        let pat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //check email
        if(!pat.test(this.state.email)){
            this.setState({invalidEmail: true})
            return false
        }else{
            this.setState({invalidEmail: false})
            return true
        }

    }

    validatePassword(){
        //check password
        if(this.state.pass.length < 4){
            this.setState({invalidPassword: true})
            return false
        }else{
            this.setState({invalidPassword:false})
            return true
        }
    }


    validate(){
        return (this.validateName() && this.validateEmail() && this.validatePassword())
    }

    sendData(){
        console.log(this)
        if(this.validate()){
            //send data
            //let url = "";

            //this.Authorizer.authFetch()
        }
    }

    render_loading(){
        if(this.state.serverResponse.isLoading){
          return (
            <LoadingToken >Loading... </LoadingToken>
          )
        }
        return < Button onPress={()=>this.sendData()}>Sign Up</Button>
      }

    render(){
        ({container, title, switchLabel} = styles)
        console.log(this.state)
        return(
            <View style={container}>
                <Text style={title}> Sign Up! </Text>
                <Input 
                    label="Name"
                    onChangeText={(text) => this.setState({name: text})}
                    value={this.state.name}
                    placeholder='John Doe'
                    invalid={this.state.invalidName}
                    errorMessage = "Names should have only letters!"
                />


                <Input 
                    label="Email"
                    onChangeText={(text) => this.setState({email: text})}
                    value={this.state.email}
                    placeholder='example@me.com'
                    invalid={this.state.invalidEmail}
                    errorMessage = "Invalid email address!"
                />
    
                <Input
                    label="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({pass: text})}
                    value={this.state.pass}
                    placeholder='password'
                    invalid={this.state.invalidPassword}
                    errorMessage = "Password is too short"
                />



                <View style={styles.buttonCenter}>
                    <LabeledSwitch offLabel="Default" onLabel="Admin" onTintColor='#0af' value={this.state.admin} onValueChange={
                    (value) => this.setState({
                            admin: value
                        })
                    }/>
                    {this.render_loading()}
                </View>
          </View>
        )
    }
}

const styles = {
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      paddingLeft: 20,
      paddingRight: 20
    },
    title: {
      fontSize: 23,
      textAlign: 'center',
      color:'#333',
      marginTop: 60,
      marginBottom: 30
    },
    buttonCenter: {
      justifyContent: "center",
        alignItems: 'center',
    },
    errorMessage: {
      color: '#e50',
      marginBottom: 10
  }
  }

//   <Switch onTintColor='#0af' onValueChange={(value) => {
//     this.setState({
//         admin: value
//     })
// }} value={this.state.admin}/>