import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format, formatDistance, parseISO, differenceInHours} from 'date-fns';
// NOTE!!!
// run
// npm install date-fns --save
// or
// yarn add date-fns

const TimeStamp=(props)=>{

  formatTime=(time)=>{
    var formatted;
    
    // Getting current time in Finland that is currently 
    // +3 hours from UTC because daylight savings suck
    var date = new Date(); // getting current time of the browser/machine
    var utc = date.getTime() + (date.getTimezoneOffset() * 60000); // Converting it to utc time
    
    //USE IF ON LOCAL. Also change variable utc to fidate in the following if sentences.
    //var fidate = new Date(utc + (3600000 * 3)); // Getting the current time in Finland

    //console.log(fidate);

    // comparing the created time with mysql timestamp
    var diff = differenceInHours(utc, parseISO(time)); 

    if (diff < "24"){
      formatted = "posted " + formatDistance(utc, parseISO(time)) + " ago";
    }
    else {
      formatted = "posted on " + format(new Date(parseISO(time)), "MMM do, yyyy @ H:mm");
    }
    return formatted;
  }

  return(
    <View style={styles.postFooter}>
      <Text style ={styles.timeText}>{formatTime(props.time)}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
  postFooter:{
    alignSelf: 'flex-end',
  },
  timeText:{
    fontSize:14,
    color:'#6f6f6f'
  }
})
export default TimeStamp;