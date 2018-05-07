import React from 'react'
import {TextInput, StyleSheet, View, Text} from 'react-native'

class Input extends React.Component{
    constructor(props) {
        super(props);
        this.state = { text: '',
                        style:styles.border_blur};
        this.onFocus = this.onFocus.bind(this)
        this.onBlur = this.onBlur.bind(this)
      }

    //style on focus
    onFocus(){
    this.setState({
        style: styles.border_focus
    })
    }

    //style when looses focus
    onBlur(){

    this.setState({
        style: styles.border_blur
    })
        
        
    }

    //decides wheather to render the error
    renderError(){
        if(this.props.invalid){
            return(
                <Text style={styles.errorText}>{this.props.errorMessage}</Text>
            )
        }else{
            return undefined
        }

    }
    

    render() {
        return (
            <View>
                <Text style={styles.labelStyle}>{this.props.label}</Text>

                <TextInput
                style={this.props.invalid?[styles.container, styles.borderInvalid]:[styles.container, this.state.style]}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                secureTextEntry={this.props.secureTextEntry}
                autoCapitalize = 'none'
                onChangeText = {this.props.onChangeText}
                value = {this.props.value}
                placeholder = {this.props.placeholder}
                />

                {this.renderError()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      borderRadius : 4,
      minWidth: 30, 
      borderBottomWidth: 2,
      padding: 5, 
      width: "100%",
      marginBottom: 20
    }, 

    border_focus:{
        borderColor:'#0af'
    },

    border_blur:{
        borderColor: '#777'
        },
    borderInvalid: {
        borderColor: '#e50'
    },
    errorText: {
        color: '#e50',
        marginBottom: 10
    },
    labelStyle: {
        color: '#777',
        marginBottom: 10, 
        textAlign: 'left',
        fontSize: 20
    }
  });


export default Input;