import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Modal, Alert } from 'react-native';

const EditingView = (props) =>{

  const [updatedPost, setUpdatedPost] = useState('');

  const cancelEdit=()=>{
    props.onCancelEdit();
    setUpdatedPost('');
  }

  const postContent=(enteredText)=>{
    setUpdatedPost(enteredText);
  }

  const getPostLength=(string)=>{
    // Default value when the state variable is empty:
    if (!updatedPost.length){
      return string.length;
    }
    // If the value changes:
    else {
      return updatedPost.length;
    }
  }

  // Workaround to prevent a post from being deleted from
  // the database in case user saves without making any 
  // changes. Also prevents empty posts from being saved.
  const updatePost=()=>{
    if (!updatedPost.length){
      Alert.alert(
        null, //No title given
        'No changes were made.',
        [
          {
          text: 'OK',
          onPress:cancelEdit()
          },
        ],
        {cancelable:true}, // User can tap outside the window to close it
      );      
    }
    else {
      props.onUpdatePost(updatedPost);
      setUpdatedPost('');
    }
  }

  const deletePost = (value) => {
    Alert.alert(
      "Delete post " + value,
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Delete", onPress: () => props.onDeletePostFromNet(value)}
      ]
    );
  }
    
  return(
    <Modal visible={props.visibility} animationType='slide'>
      <View style={styles.viewBackground}>
        <Text style={styles.title}>Edit your post:</Text>
        <View style={styles.postField}>
          <TextInput style={styles.textField} maxLength={160} multiline={true} defaultValue={props.value} onChangeText={postContent} />
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{getPostLength(props.value)} / 160</Text>
        </View>
        <View style={styles.buttons}>
          <Button title ='Delete' color='#c50000' onPress={()=> deletePost(props.id)} />
          <Button title='Cancel' color='#8f8f8f' onPress={cancelEdit}/>
          <Button title ='Save' color='#d29621' onPress={updatePost} />
        </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  viewBackground: {
    height: '100%',
    alignItems: 'center',
  },
  title:{
    marginTop:'25%',
    marginBottom:15,
    fontSize:18,
  },
  postField: {
    width:'80%',
    backgroundColor:'#f3f3f3',
    padding:15,
    borderColor:'#d3d3d3',
    borderWidth:1,
    borderRadius:10,
  },
  textField:{
    fontSize:16,
    textAlignVertical:'top',
    paddingBottom:20,
  },
  buttons:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
    paddingLeft:50,
    paddingRight:50,
  },
  counterContainer:{
    marginBottom: 20,
    paddingBottom:10,
    borderColor:'#d3d3d3',
    borderBottomWidth:1,
  },
  counterText:{
    alignSelf:'flex-end',
    color: '#6f6f6f',   
  }
})
export default EditingView;