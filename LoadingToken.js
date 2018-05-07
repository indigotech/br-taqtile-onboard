import React from 'react'
import {View, ActivityIndicator, StyleSheet} from 'react-native'


export default class LoadingToken extends React.Component{

    render(){
        return (
            <View style={styles.tokenStyle}>
                <ActivityIndicator size="small" color="#000" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    tokenStyle: {
        borderRadius: 10,
        backgroundColor:'#a0dfff',
        width: '50%',
        alignItems: 'center',
        padding: 16,
        marginTop: 7,
        marginBottom: 7
    }
  });
