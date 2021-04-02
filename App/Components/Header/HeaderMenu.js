import React from 'react';
import {Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native'
import auth from '@react-native-firebase/auth';

const HeaderMenu = () => {

    const logout = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
    }

    return (
        <Header backgroundColor="black"
            leftComponent={{ icon: 'menu', color: '#fff', padding: 10 }}
            centerComponent={{ text: 'EXPENSE TRACKER', style: { color: '#fff',padding: 10, fontSize: 20 } }}
            rightComponent={<TouchableOpacity
                onPress={logout}
                style={{padding:10}}
              >
                <Icon name="logout" color="white" size={25} />
              </TouchableOpacity>
            }
        />
    )
}

export default HeaderMenu
