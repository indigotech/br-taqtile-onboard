/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
//import firebase from 'firebase'

import Input from './Input'
import Button from './Button'



export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      pass: '',
      invalidEmail: false,
      invalidPassword: false
    }
    this.validate = this.validate.bind(this)

  }

  // componentWillMount(){
  //   firebase.initializeApp({
  //     apiKey: "AIzaSyA4HzV0bLdMoyK7RN2_V7idT1gbPFvFb5U",
  //     authDomain: "onboardtaqtile.firebaseapp.com",
  //     databaseURL: "https://onboardtaqtile.firebaseio.com",
  //     projectId: "onboardtaqtile",
  //     storageBucket: "onboardtaqtile.appspot.com",
  //     messagingSenderId: "131694664328"
  //   })
  // }

  validate(){

    //regex that matches 99.99% of emails 
    let pat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //check email
    if(!pat.test(this.state.email)){
      this.setState({invalidEmail: true})
    }else{
      this.setState({invalidEmail: false})
    }

    //check password
    if(this.state.pass.length < 4){
      this.setState({invalidPassword: true})
    }else{
      this.setState({invalidPassword:false})
    }
    
    if(!this.state.invalidEmail && !this.state.invalidPassword){
      // send the user forward 
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
          < Button onPress={this.validate}>Login</Button>
        </View>
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
  }
});
