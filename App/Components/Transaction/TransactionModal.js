import React, {useState, useEffect} from 'react';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from '@react-native-firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';

import UploadFile from '../UploadFile/UploadFile';
import * as actions from '../../../Store/actions/index';
import ErrorBox from '../ErrorBox/ErrorBox';

const TransactionModal =  (props) => {

    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('income');
    const [category, setCategory] = useState('Salary'); 

    useEffect(() => {
        props.getTransactionTypes();
        props.getCategories(type);
    }, [])

    const transactionTypeChange = (event) => {
        setType(event.value);
        props.getCategories(event.value);
    }

    const categoryChange = (event) => {
        setCategory(event.value);
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const upload = (img) => {
        setImage(img);
    }

    const submit = () => {
        console.log(image.uri);
        storage().ref(image.uri).putFile(image.uri)
        .then(() => {
            storage()
                .ref(image.uri)
                .getDownloadURL()
                .then(url => console.log(url))
                .catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    const openCalendar = () => {
        setShow(true);
    }

    const pickDate = (event, selectedDate) => {
        if(event.type === 'set') {
            setShow(false);
            setDate(selectedDate);
            setMonth(dateFormat(selectedDate, 'mmmm'));
            setYear(selectedDate.getFullYear());
        }else{
            setShow(false);
        }
    };
    
    return (
        <View style={styles.container}>
            {props.TransactionTypeError ? <ErrorBox error ={props.TransactionTypeError}/> : null}
            <View>
                <Text style={styles.header}>Add a Transaction</Text>
            </View>
            <View>
            <Input containerStyle={{width: 300, marginBottom: 20}}
                placeholder='Name'
                style={{color: "white"}}
                />
            </View>
            <View>
            {props.types ? <DropDownPicker
                items={props.types}
                defaultValue= 'income'
                containerStyle={{height: 40, width: 280, marginBottom: 30}}
                style={{backgroundColor: "#404996", borderWidth:1.5, borderColor:"#4682B4"}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: "#404996", borderWidth:1.5, borderColor:"#4682B4"}}
                onChangeItem = {transactionTypeChange}
            /> : null}
            {props.categories ? <DropDownPicker
                items={props.categories}
                defaultValue= {props.categories[0].value}
                placeholder= 'Select a category'
                containerStyle={{height: 40, width: 280, marginBottom: 10}}
                style={{backgroundColor: "#404996", borderWidth:1.5, borderColor:"#4682B4"}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: "#404996", borderWidth:1.5, borderColor:"#4682B4"}} 
                onChangeItem = {categoryChange}
            /> : null}
            </View>
            <View>
            <Input containerStyle={{width: 300, marginTop: 20}}
                placeholder='Amount'
                style={{color: "white"}}
                />
            </View>
            <View style={styles.buttonContainer}>
            <Button buttonStyle={{backgroundColor:"#404996",padding:10, borderWidth:1.5, borderColor:"#4682B4"}}
                icon={{
                    name: "calendar-today",
                    type:"fontawesome",
                    size: 15,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                title={month ? month.toString()+' '+date.getDate()+', '+year.toString() : 'Select a date'}
                onPress={openCalendar}
            />
            <Button buttonStyle={{backgroundColor:"#404996",padding:10, borderWidth:1.5, borderColor:"#4682B4"}}
                icon={{
                    name: "upload-file",
                    type:"fontawesome",
                    size: 15,
                    color: "white"
                }}
                containerStyle={{margin:5}}
                title="Upload photo"
                onPress={toggleOverlay}
            />
            </View>
            <View>
            <Button buttonStyle={{backgroundColor:"#4682B4",padding:15}}
                containerStyle={{margin:5, marginTop: 25}}
                title="Submit"
                onPress = {submit}
            />
            </View>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <UploadFile data={upload} visible= {toggleOverlay}/>
            </Overlay>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                is24Hour={true}
                display="default"
                onChange={pickDate}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#404996",
      alignItems: "center",
      justifyContent: "center"
    },
    header: {
        color: 'white',
        fontSize: 30,
        marginTop: 10,
        marginBottom: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
});

const mapStateToProps = (state) => {
    return {
      TransactionTypeError: state.transactionTypes.error,
      types: state.transactionTypes.types,

      categories: state.categories.categories,
      categoriesError: state.categories.error
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTransactionTypes: () => dispatch(actions.getTransactionTypes()),
        getCategories: (type) => dispatch(actions.getCategories(type)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
