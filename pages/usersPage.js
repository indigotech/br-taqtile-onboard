import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  AsyncStorage
} from 'react-native';

import Authorizer from '../authorizer'

import {UserCard} from '../components/index'

export default class UsersPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : []
        }
        this.options = {
            "page": 0 , 
            "window": 10
        }

        this.Authorizer = new Authorizer(undefined)
        
        let url = "https://tq-template-server-sample.herokuapp.com/users"+"?pagination="+JSON.stringify(this.options)
        console.log(url)
        AsyncStorage.getItem("token")
        .then(token => {
            this.Authorizer.setToken(token)
            return this.Authorizer.authFetch(url, {method : "GET"})
            .then(data => this.setState({
                data: data.data
            }))
        })
        .catch(console.log)
    }
    render(){
        return(
            <View>
                <FlatList
                data={this.state.data}
                renderItem={({item}) => <UserCard name={item.name} role={item.role} onClick={()=>this.props.navigation.navigate("Detail", {id: item.id})}/>}
                keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        )
    }
}