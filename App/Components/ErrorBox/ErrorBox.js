import React from 'react'
import {View,Text} from 'react-native'

const ErrorBox = (props) => {
    return (
        <View style={{ backgroundColor: '#ffcccb', padding:10, width: '70%'}}>
            <Text>{props.error}</Text>
        </View> 
    )
}

export default ErrorBox
