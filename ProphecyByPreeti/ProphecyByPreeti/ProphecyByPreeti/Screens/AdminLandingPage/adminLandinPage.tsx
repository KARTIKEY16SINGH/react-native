import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp } from '@react-navigation/native';
import { NavigationConstant } from '../../Global/NavigationConstants';
import { FirebaseAuth } from '../../Configs/FirebaseConfig';

interface RouterProps {
	navigation: NavigationProp<any, any>;
}

const AdminLandinPage = (routerProps: RouterProps) => {
    const navigationStack = routerProps.navigation
  return (
    <SafeAreaView style={{flex:1, justifyContent: 'center'}}>
        <Button title='Chats' onPress={() => {navigationStack.navigate(NavigationConstant.adminChatPage.name)}} />
        <Button title='Schedule' onPress={() => {}} />
        <Button title='Callback Requests' onPress={() => {}} />
        <Button title='Todos' onPress={() => {}} />
        <Button title='All Users' onPress={() => {}} />
        <Button title='Logout' onPress={() => {FirebaseAuth.signOut()}} />
    </SafeAreaView>
  )
}

export default AdminLandinPage