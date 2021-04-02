import React from 'react'
import { View, Text, StyleSheet} from 'react-native';
import HeaderMenu from '../Header/HeaderMenu';

export const Dashboard = (props) => {
    return (
        <View style={styles.container}>
            <HeaderMenu/>
            <View>
            <Text style={{color:"black", padding: 20}}>Welcome {props .user.email} !!!!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
});

export default Dashboard
