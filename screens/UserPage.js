import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

import EditingView from './components/EditingView';
import TimeStamp from './components/TimeStamp';

export default function App() {

  const [postContent, setPostContent] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isVisisble, setVisibility] = useState(false);
  const [userId, setUserId] = useState(1); // hardcoded for now
  const [postId, setPostId] = useState();
  const [postToEdit, setPostToEdit] = useState('');

async function fetchPosts(){
  await fetch("http://10.0.2.2:8080/rest/postservice/getPostsById/" + userId)
  //await fetch("http://chatter-328809.appspot.com//rest/chatter/getPostsById/" + userId)
  .then((response) => response.json())
  .then((json) => setPostContent(json));
}

async function updatePost(updatedPost){
  await fetch("http://10.0.2.2:8080/rest/postservice/updatepost",
  //await fetch("http://chatter-328809.appspot.com//rest/chatter/updatepost",
  {
    method:'PUT',
    headers:{ 'Content-Type': 'application/json'},
    body:JSON.stringify({text:updatedPost, id:postId})
  });
  fetchPosts();
  setVisibility(false);
}

const deletePostFromNet = async(post) => {
  console.log("To be deleted: " + post);
  await fetch("http://10.0.2.2:8080/rest/postservice/deletepost/" + post,
  //await fetch("https://chatter-328809.appspot.com/rest/chatter/deletepost/" + post,
  {
    method: 'DELETE',
  });
  // Kun data on poistettu, palataan takaisin kaiken datan lukemiseen
  fetchPosts();
  setVisibility(false);
}

useEffect(() =>{
  if (isLoading == true){
    fetchPosts();
    setLoading(false);
  }
});

const cancelEdit=()=>{
  setPostId('');
  setVisibility(false);
}
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style ={styles.groupPosts}>
        <Text style={styles.feedTitle}>Recently posted:</Text>
      <FlatList contentContainerStyle={{paddingBottom:40}} keyExtractor={item => postContent.indexOf(item).toString()} 
      data={postContent.reverse()} renderItem={postData => 
        <View style={styles.postField}>
          <View style={styles.button}>
            <Button title="Edit" color='#d29621' onPress={()=>{ setPostId(postData.item.id); setPostToEdit(postData.item.text); setVisibility(true) }} />
          </View>
          <View style={styles.textField}>
            <Text style={styles.postFont}>{postData.item.text}</Text> 
          </View>
            <TimeStamp time={postData.item.time} />
        </View>
      }/> 
        <EditingView visibility={isVisisble} id={postId} value={postToEdit} onCancelEdit={cancelEdit} onUpdatePost={updatePost} onDeletePostFromNet={deletePostFromNet}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    flex:1,
    height:'100%',
    backgroundColor: '#fff',
  },
  groupPosts:{
    marginTop: 150,
    flex:1,
  },
  feedTitle:{
    fontSize:20,
    padding:20,
  },
  postField: {
    flexDirection:'column',
    alignSelf:'center',
    width:'90%',
    padding:5,
    borderColor:'#d3d3d3',
    borderBottomWidth:1,
    marginBottom:10,
  },
  textField:{
    marginTop:20,
    marginBottom:15,
  },
  button:{
    alignSelf:'flex-end',
  },
  postFont:{
    fontFamily: 'Roboto',
    fontSize:16,
  }, 
});
