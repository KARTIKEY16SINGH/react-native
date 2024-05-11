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
        <Button title='Schedule' onPress={() => {navigationStack.navigate(NavigationConstant.scheduleMaganagePage.name)}} />
        <Button title='Callback Requests' onPress={() => {navigationStack.navigate(NavigationConstant.adminsCallbackRequest.name)}} />
        <Button title='Todos' onPress={() => {navigationStack.navigate(NavigationConstant.todoPage.name)}} />
        <Button title='All Users' onPress={() => {navigationStack.navigate(NavigationConstant.usersPage.name)}} />
        <Button title='Logout' onPress={() => {FirebaseAuth.signOut()}} />
    </SafeAreaView>
  )
}

export default AdminLandinPage