import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
//import firebase from 'firebase'

import {Input, Button, LoadingToken} from '../components/index'

import authFetch from '../authorizer'



export default class LoginPage extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      pass: '',
      invalidEmail: false,
      invalidPassword: false,
      serverResponse: {
        isLoading: false,
        error: false,
        message: ""
      }
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

    //break to speedup development
    const { navigate } = this.props.navigation;

    if(this.state.email == "" && this.state.pass == ""){
      navigate('Welcome')
      return
    }
    
    if(this.validateEmail() && this.validatePassword()){
      console.log("enviando dados")
      // send the user forward
      this.setState({
        serverResponse: {
          isLoading : true
        }
      })

      authFetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.pass,
          rememberMe: false,
        }),
      })    
      .then(resJson => {
        console.log(resJson)
        this.setState({
          serverResponse: {
            data: resJson.data,
            errorMessage: resJson.errors && resJson.errors[0].message,
            error: (resJson.data == undefined),
            isLoading: false,
          }
        })
        return resJson.data
      })

      .then(() => { // using the data
        let data = this.state.serverResponse.data
        if(data){//sucess from server response
          //saving the user name 
          AsyncStorage.setItem("user_name", data.user.name)
          .catch(console.error)
            
          navigate('Welcome')
        }

      })
      .catch(console.error)
  }
}

  render_loading(){
    if(this.state.serverResponse.isLoading){
      return (
        <LoadingToken >Loading... </LoadingToken>
      )
    }
    return < Button onPress={()=>this.validate()}>Login</Button>
  }

  render_server_error(){
    console.log(this.state)
    if(this.state.serverResponse.error){
      console.log("lets render it!")
      return <Text style={styles.errorMessage}>{this.state.serverResponse.errorMessage}</Text>
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>Welcome!</Text>

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
          
          {this.render_loading()}
          <Button linkLike onPress={() => this.props.navigation.navigate("SignUp")}> Sign Up </Button>
        </View>

        {this.render_server_error()}
        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20
  },
  welcome: {
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
},
});
