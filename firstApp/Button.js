import React, {Component} from 'react'
import {TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'


class Button extends Component{
    render(){
        return(
            <TouchableOpacity style={styles.buttonStyle} onPress={this.props.onPress}>
                <Text style={{fontSize: 20}}>
                    {this.props.children}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 10,
        backgroundColor:'#0af',
        width: '50%',
        alignItems: 'center',
        padding: 16,
        marginTop: 7,
        marginBottom: 7
    }
  });


export default Button