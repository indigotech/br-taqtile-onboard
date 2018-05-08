import React, {Component} from 'react'
import {View, Switch, Text} from 'react-native'

class LabeledSwitch extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{this.props.offLabel}</Text>
                <Switch onValueChange={this.props.onValueChange} 
                    onTintColor={this.props.onTintColor}
                    value={this.props.value}
                    />
                <Text style={styles.label}>{this.props.onLabel}</Text>
            </View>
        )
    }
}

const styles = {
    label: {
        color: 'grey', 
        marginLeft: 10,
        marginRight: 10
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10
    }
}

export {LabeledSwitch}