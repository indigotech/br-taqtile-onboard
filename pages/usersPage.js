import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  AsyncStorage,
  Button
} from 'react-native';

import authFetch from '../authorizer'
import Events from '../event'

import {UserCard} from '../components/index'

export default class UsersPage extends Component{
    static navigationOptions = ({ navigation }) => {
        const navigate = navigation.navigate || {};
    
        return {
          headerRight: (
            <Button onPress={()=>navigate("SignUp")} title="New" color="#0af" />
          ),
        };
      };

    constructor(props){
        super(props)
        this.state = {
            data : []
        }
        this.options = {
            "page": 0 , 
            "window": 10
        }

        Events.subscribe("userListChanged", ()=> this.getData())
        this.getData()

        
    }

    componentDidMount(){
        console.log(">>>component userlist mounted")
    }

    componentDidUpdate(){
        console.log(">>>component userlist updated")
    }

    getData(){
        console.log("GETTING DATA FROM USERSPAGE!!")
        let url = "https://tq-template-server-sample.herokuapp.com/users"+"?pagination="+JSON.stringify(this.options)

        authFetch(url, {method : "GET"})
            .then(data => {this.setState({
                data: data.data
            }); console.log("lista que chegou é:", data)})
            .catch(console.log)
    }

    render(){
        return(
            <View style={{backgroundColor: '#dddddd'}}>

                <FlatList
                data={this.state.data}
                renderItem={({item}) => <UserCard name={item.name} role={item.role} onClick={()=>{this.props.navigation.navigate("Detail", {id: item.id})}}/>}
                keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        )
    }
}