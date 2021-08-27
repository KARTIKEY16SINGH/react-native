import React from 'react'
import { View, Image } from 'react-native';
import styles from './styles';

class Header extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode='contain'/>
                <Image source={require('../../assets/images/menu.png')} style={styles.menu} />
            </View>
        )
    }
}

export default Header;