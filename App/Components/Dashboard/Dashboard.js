import React,{ useState, useEffect } from 'react'
import { View,ScrollView, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import HeaderMenu from '../Header/HeaderMenu';

export const Dashboard = (props) => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const calendarShow = () => {
        setShowCalendar(true);
    }

    const onCalendarChange = (event, selectedDate) => {
        setShowCalendar(false);
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(date.toLocaleDateString());
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderMenu/>
            <View style={styles.header}>
            <Text style={{color:"#fff", padding: 20}}>Welcome {props.user.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
            <Button buttonStyle={{backgroundColor:"#4682B4",padding:10}}
                icon={{
                    name: "calendar-today",
                    type:"fontawesome",
                    size: 15,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                title="Select a date"
                onPress={calendarShow}
            />
            <Button buttonStyle={{backgroundColor:"#4682B4",padding:10}}
                icon={{
                    name: "add",
                    type:"fontawesome",
                    size: 23,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                onPress={calendarShow}
            />
            <Button buttonStyle={{backgroundColor:"#4682B4",padding:10}}
                icon={{
                    name: "refresh",
                    type:"fontawesome",
                    size: 23,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                onPress={calendarShow}
            />
            </View>
            {showCalendar ? <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onCalendarChange}
            /> : null }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#404996",
      alignItems: "center",
    },
    buttonContainer: {
        flex:1,
        flexDirection: 'row',
    }
});

export default Dashboard
