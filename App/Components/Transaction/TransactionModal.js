import React, {useState, useEffect} from 'react';
import { View,ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from '@react-native-firebase/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';

import UploadFile from '../UploadFile/UploadFile';
import * as actions from '../../../Store/actions/index';
import ErrorBox from '../ErrorBox/ErrorBox';

const TransactionModal =  (props) => {

    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [token, setToken] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [day, setDay] = useState('');
    const [monthName, setMonthName] = useState('');
    const [monthNumber, setMonthNumber] = useState('');
    const [datePicked, setDatePicked] = useState(false);
    const [year, setYear] = useState('');
    const [type, setType] = useState('606b73160470d66cbcc1ae75');
    const [category, setCategory] = useState('606b74a30470d66cbcc1ae77'); 

    useEffect(() => {
        props.getTransactionTypes();
        props.getCategories('income');
        getToken();
        setDay(dateFormat(date, 'd'));
        setMonthName(dateFormat(date, 'mmmm'));
        setMonthNumber(dateFormat(date, 'm'));
        setYear(date.getFullYear());
    }, [])

    if(props.submitTransactionSuccess){
        props.visible();
    }

    const getToken = async() => {
        const idTokenResult = await auth().currentUser.getIdTokenResult();
        console.log('User JWT: ', idTokenResult.token);
        setToken(idTokenResult.token);
    }

    const transactionTypeChange = (event) => {
        setType(event.value);
        props.getCategories(event.label.toLowerCase());
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

    const submitTransaction = (url) => {
        console.log(year);
        props.submitTransaction(
            name,category,amount,type,date,token,url, day, monthName, monthNumber, year
        )
    }

    const submit = () => {
        if(image){
            storage().ref(image.uri).putFile(image.uri)
            .then(() => {
                storage()
                    .ref(image.uri)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        submitTransaction(url);
                        setDatePicked(false);
                    })
                    .catch(err => console.log(err));
            }).catch(err => console.log(err));
        }else{
            setDatePicked(false);
            submitTransaction();
        }
    }

    const openCalendar = () => {
        setShow(true);
    }

    const pickDate = (event, selectedDate) => {
        if(event.type === 'set') {
            setShow(false);
            setDate(selectedDate);
            setDay(dateFormat(selectedDate, 'd'));
            setMonthName(dateFormat(selectedDate, 'mmmm'));
            setMonthNumber(dateFormat(selectedDate, 'm'));
            setYear(selectedDate.getFullYear());
            setDatePicked(true);
        }else{
            setShow(false);
        }
    };
    
    return (
        <View style={styles.container}>
            {props.TransactionTypeError ? <ErrorBox error ={props.TransactionTypeError}/> : null}
            {props.categoriesError ? <ErrorBox error ={props.categoriesError}/> : null}
            {props.submitTransactionErrors ? <ErrorBox error ={props.submitTransactionErrors}/> : null}
            <View>
                <Text style={styles.header}>Add a Transaction</Text>
            </View>
            <View>
            <Input containerStyle={{width: 300, marginBottom: 20}}
                placeholder='Name'
                style={{color: "white"}}
                onChangeText={value => setName(value)}
                />
            </View>
            <View>
            {props.types ? <DropDownPicker
                items={props.types}
                defaultValue= {props.types[0].value}
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
                onChangeText={value => setAmount(value)}
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
                title={datePicked ? monthName.toString()+' '+date.getDate()+', '+year.toString() : 'Select a date'}
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
      categoriesError: state.categories.error,

      submitTransactionErrors: state.transaction.errors,
      submitTransactionSuccess: state.transaction.success
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getTransactionTypes: () => dispatch(actions.getTransactionTypes()),
        getCategories: (type) => dispatch(actions.getCategories(type)),
        submitTransaction: 
        (name, category, amount, type, date, token, image, day, monthName, monthNumber, year) => 
            dispatch(actions.submitTransaction(name, category, amount, type, date, token, image, day, monthName, monthNumber, year)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
