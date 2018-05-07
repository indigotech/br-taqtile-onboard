import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';

import data from './fakeData.json'
import UserCard from './UserCard'

export default class UsersPage extends Component{
    render(){
        return(
            <View style={{backgroundColor: '#fff'}}>
                <FlatList
                data={data}
                renderItem={({item}) => <UserCard name={item.name} role={item.role}/>}
                keyExtractor={(item, index) => item.id.toString()}
                />
            </View>
        )
    }
}