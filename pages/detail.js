import React, {Component} from 'react'
import {Text, AsyncStorage, View} from 'react-native'

import Authorizer from '../authorizer'

export default class Detail extends Component{
    constructor(props){
        super(props)

        this.id = this.props.navigation.getParam('id', undefined)
        const url = "https://tq-template-server-sample.herokuapp.com/users/" + this.id.toString()
        this.state={
            user :{}
        }

        this.Authorizer = new Authorizer()

        AsyncStorage.getItem("token")
        .then(token =>{
            this.Authorizer.setToken(token)
            this.Authorizer.authFetch(url, {
                method: "GET"
            })
            .then(user => {
                this.setState({
                    user: user.data
                })
            })
            .catch(console.log)
        })
        .catch(console.log)
        
    }

    parseDate(){
        if(!this.state.user.createdAt) return "01 / 01 / 2018"
        let date = this.state.user.createdAt
        date = date.substring(0, 10)
        date = date.split('-')
        date = date[1] + ' / ' + date[2] + ' / ' + date[0]
        return date
    }

    render(){
        ({container, primary, secondary, terciary, header} = styles)
        return (
        <View style = {container}>
            <View style={header}>
                <Text style = {primary}>{this.state.user.name}</Text>
            </View>
            
            <Text style = {terciary}>{this.state.user.role}</Text>
            <Text style = {secondary}>{this.state.user.email}</Text>
            <Text style={terciary}>Created:</Text>
            <Text style={secondary}> {this.parseDate()}</Text>
        </View>
        )
            
    }
}

const styles = {
    container: {
        backgroundColor: '#f0f0f0',
        paddingLeft: 20,
        paddingTop: 20,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 3,


    },
    primary: {
        color: '#0af',
        fontSize: 30,
        margin: 20
    },
    secondary: {
        color: '#0af',
        fontSize: 17,
        margin: 20
    },
    terciary: {
        color: 'grey',
        fontSize: 17,
    },
    emailStyle: {
        color: '#08a',
        fontSize: 19,
        margin: 10
    },
    dateStyle: {
        color: '#08a',
        fontSize: 19,
        margin: 10
    },
    header: {
        backgroundColor: '#333942',
        marginLeft : -20,
        marginTop: -30,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 20
    }
}