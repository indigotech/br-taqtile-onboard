;
import React, {Component} from 'react'
import {Text, View, Switch} from 'react-native'
import {Input, LoadingToken, Button, LabeledSwitch} from '../components/index'

import authFetch from '../authorizer'


export default class SignUp extends Component{
    constructor(props){
        super(props);
        ({getParam} = props.navigation)
        this.state={
            name: getParam("name", ""), // this.props.name,
            admin: (getParam("admin", false) === 'admin'), //this.props.admin,
            email: getParam("email", ""), //this.props.email,
            pass: getParam("password", ""), //this.props.password,
            invalidEmail: false,
            invalidPassword: false,
            invalidName: false,
            serverResponse: {
                isLoading: false,
                error: false,
                message: ""
            },
            modify : (getParam("modify", false) != undefined)
        }
    }

    //each of them is responsible for checking the validity, setting it onto the state and returning it
    validateName(){
        let pat = /^[A-z ]+$/
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
            let url = "https://tq-template-server-sample.herokuapp.com/users";
            let bodyStr = JSON.stringify({
                name: this.state.name,
                password: this.state.pass,
                role: (this.state.admin?'admin':'user'),
                email: this.state.email
            })

            console.log(bodyStr)

            let options= {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: bodyStr
            }

            if(this.state.modify){
                options.method =  'PUT'
            }

            authFetch(url, options)
            .then(res => {console.log(res); this.props.navigation.navigate('welcome')})
            .catch(console.log)
        }
    }

    //decide if it is loading, editing or creating and renders the button appropriately 
    render_loading(){
        if(this.state.serverResponse.isLoading){
          return (
            <LoadingToken >Loading... </LoadingToken>
          )
        }else if (this.state.modify){
            return <Button onPress={()=>this.sendData()}>Finish</Button>
        }
        return < Button onPress={()=>this.sendData()}>Sign Up</Button>
      
    }

    renderTitle(){
        if(this.state.modify){
            return <Text style={title}>Edit User</Text>
        }
        return <Text style={title}> Sign Up! </Text>
    }


    render(){
        ({container, title, switchLabel} = styles)
        console.log(this.state)
        return(
            <View style={container}>
                {this.renderTitle()}}
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
                    <LabeledSwitch 
                        offLabel="Default" 
                        onLabel="Admin" 
                        onTintColor='#0af' 
                        value={this.state.admin} 
                        onValueChange={
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