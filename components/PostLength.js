// import React from 'react';
// import { StyleSheet, Text,  View } from 'react-native';

// const PostLength = (props) => {

//   const getPostLength=(string)=>{

//     // Default value when the state variable is empty:
//     if (!props.updatedPost.length){
//       return string.length;
//     }
//     // If the value changes:
//     else {
//       return props.updatedPost.length;
//     }
//   }

//   return(
//     <View style={styles.counterContainer}>
//       <Text style={styles.counterText}>{getPostLength(props.value)} / 160</Text>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   counterContainer:{
//     marginBottom: 20,
//     paddingBottom:10,
//     borderColor:'#d3d3d3',
//     borderBottomWidth:1,
//   },
//   counterText:{
//     alignSelf:'flex-end',
//     color: '#6f6f6f',   
//   },
// });
// export default PostLength;