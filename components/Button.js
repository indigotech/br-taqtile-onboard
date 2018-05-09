import React, {Component} from 'react'
import {TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'


class Button extends Component{
    createStyle(){
        ({buttonStyle} = styles)
        style = {...buttonStyle}
        if(!this.props.linkLike){
            style.backgroundColor = this.props.color || '#0af'
            
        }

        return style
    }

    createTextStyle(){
        style = {
            fontSize: 20,
        }
        if(this.props.linkLike){
            style.color= this.props.color || '#0af'
        }

        return style
    }

    render(){
        return(
            <TouchableOpacity style={this.createStyle()} onPress={this.props.onPress}>
                <Text style={this.createTextStyle()}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = {
    buttonStyle: {
        borderRadius: 10,
        width: '50%',
        alignItems: 'center',
        padding: 16,
        marginTop: 7,
        marginBottom: 7,
    }
  };


export {Button}