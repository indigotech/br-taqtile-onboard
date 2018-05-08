import React, { Component } from 'react';
import {
 View, 
 Text,
 TouchableOpacity
} from 'react-native';
//import firebase from 'firebase'

import Input from './Input'
import Button from './Button'
import LoadingToken from './LoadingToken'

class UserCard extends Component{
    render(){
        return(
            <TouchableOpacity onPress={this.props.onClick}>
                <View style={styles.container}>
                    <Text style={styles.nameStyle}>{this.props.name}</Text>
                    <Text style ={styles.roleStyle}>{this.props.role}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = {
    nameStyle : {
        color: '#0af',
        fontSize: 25
    },
    roleStyle : {
        color: 'grey',
        fontSize: 20,
    },
    container : {
        marginTop : 7,
        marginBottom : 7,
        marginLeft: 10,
        marginRight: 10,
        paddingRight: 30,
        paddingLeft: 30, 
        backgroundColor: '#f0f0f0',
        paddingTop: 30,
        paddingBottom : 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,    
    }
}

export {UserCard}