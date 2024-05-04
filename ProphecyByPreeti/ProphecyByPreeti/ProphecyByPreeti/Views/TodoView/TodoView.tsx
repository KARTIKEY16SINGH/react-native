import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserView from '../UserView/UserView'
import { RequestViewStyle } from '../RequestView/requestViewStyle'

const TodoView = ({requestData, onUserClick, onTodoClick}) => {
  console.log("TodoView requestData =", requestData)
  const style = RequestViewStyle
  return (
    <View style={style.mainView}>
      <Pressable style={style.decriptionTextView} onPress={() => onTodoClick(requestData)}>
        <Text style={style.descriptionText}>{requestData.data.todo}</Text>
      </Pressable>
      <View style={style.separatorView}/>
      <UserView style={style.userView} userId={requestData.data.userId} textStyle={style.userViewText} onUserClick={() => onUserClick(requestData)}/>
    </View>
  )
}

export default TodoView