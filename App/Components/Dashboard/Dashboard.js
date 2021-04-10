import React,{ useState, useCallback } from 'react'
import { View,ScrollView, Text, StyleSheet} from 'react-native';
import {Button, Overlay, Icon, ButtonGroup} from 'react-native-elements';
import MonthPicker, { ACTION_DATE_SET, ACTION_DISMISSED } from 'react-native-month-year-picker';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';

import HeaderMenu from '../Header/HeaderMenu';
import TransactionModal from '../Transaction/TransactionModal';
import * as actions from '../../../Store/actions/index';

export const Dashboard = (props) => {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [modal, showModal] = useState(false);
    const [index, setIndex] = useState(0);
    const buttons = ['Daily', 'Monthy', 'Stats'];

    const updateindex = (event) => {
        setIndex(event);
    }

    const showPicker = useCallback((value) => setShowCalendar(value), []);

    const onCalendarChange = useCallback(
        (event, newDate) => {
            switch(event) {
                case ACTION_DATE_SET:
                  console.log(newDate);
                  showPicker(false);
                  setDate(newDate);
                  setMonth(dateFormat(newDate, 'mmmm'));
                  setYear(newDate.getFullYear());
                  break;
                case ACTION_DISMISSED:
                default:
                  setShowCalendar(false);
            }
        },
        [date, showPicker],
    );

    const reset = () => {
        setMonth('');
        setYear('');
    }

    const toggleOverlay = () => {
        showModal(!modal);
    };

    const minusYear = () => {
        props.getYear(props.year? props.year : new Date().getFullYear(),"minus");
    }

    const plusYear = () => {
        props.getYear(props.year? props.year : new Date().getFullYear(),"plus");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <HeaderMenu name={props.user.email}/>
            {index == 0 ? <View style={styles.buttonContainer}>
            <Button buttonStyle={{backgroundColor: "#404996", borderWidth:1.5, borderColor:"#4682B4",padding:10}}
                icon={{
                    name: "calendar-today",
                    type:"fontawesome",
                    size: 15,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                title={month ? month.toString()+', '+year.toString() : 'Select month'}
                onPress={() => showPicker(true)}
                raised
            />
            <Button buttonStyle={{backgroundColor: "#404996", borderWidth:1.5, borderColor:"#4682B4",padding:10}}
                icon={{
                    name: "refresh",
                    type:"fontawesome",
                    size: 23,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                onPress={reset}
                raised
            />
            </View> : null }
            {index == 1 ? <View style={styles.yearContainer}>
                <Icon name='arrow-left' color='white' onPress={minusYear} />
                    <Text style={{color:'white', fontSize:16}}>{
                        props.year ? props.year : new Date().getFullYear()
                    }</Text>
                <Icon name='arrow-right' color='white' onPress={plusYear} />
            </View> : null}
            <ButtonGroup
                selectedIndex={index}
                buttons={buttons}
                containerStyle={{height: 40, width: 300, marginTop:20, borderColor:"#4682B4"}}
                buttonStyle={{backgroundColor: "#404996"}}
                textStyle= {{color: "white"}}
                selectedButtonStyle= {{backgroundColor: "#4682B4"}}
                innerBorderStyle={{color:"#4682B4"}}
                onPress={updateindex}
                />
            <View style={{position:'absolute',bottom:30,right:30,alignSelf:'flex-end',}}>
            <Button buttonStyle={{backgroundColor:"#4682B4",padding:10, borderRadius: 100, padding: 20, width:90,height:90,}}
                icon={{
                    name: "add",
                    type:"fontawesome",
                    size: 40,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                onPress={toggleOverlay}
            />
            </View>
            {showCalendar ? 
                <MonthPicker
                onChange={onCalendarChange}
                value={date}
                />
            : null }
            <Overlay isVisible={modal} onBackdropPress={toggleOverlay} 
              fullScreen 
              overlayStyle={{backgroundColor:"#404996"}}>
                <TransactionModal/>
            </Overlay>
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
        flexDirection: 'row',
        marginTop: 10
    },
    yearContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderColor: "#4682B4",
        borderWidth:1.5,
        padding: 10,
        borderRadius: 3
    }
});

const mapStateToProps = (state) => {
    return {
      year: state.year.year,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getYear: (year, option) => dispatch(actions.getYear(year, option)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
