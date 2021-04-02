import React from 'react'
import { View,ScrollView, Text, StyleSheet} from 'react-native';
import HeaderMenu from '../Header/HeaderMenu';

export const Dashboard = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderMenu/>
            <View>
            <Text style={{color:"black", padding: 20}}>Welcome {props.user.email} !!!!</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
});

export default Dashboard
