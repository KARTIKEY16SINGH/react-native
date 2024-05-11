import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserView from '../UserView/UserView'
import { RequestViewStyle } from './requestViewStyle'

const RequestView = ({requestData, onUserClick, onRequestClick}) => {
  console.log("RequestView requestData =", requestData)
  const style = RequestViewStyle
  return (
    <View style={style.mainView}>
      <Pressable style={style.decriptionTextView} onPress={() => onRequestClick(requestData)}>
        <Text style={style.descriptionText}>{requestData.data.desc}</Text>
      </Pressable>
      <View style={style.separatorView}/>
      <UserView style={style.userView} userId={requestData.userId} textStyle={style.userViewText} onUserClick={() => onUserClick(requestData)}/>
    </View>
  )
}

export default RequestView