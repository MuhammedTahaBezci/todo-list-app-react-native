import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({title, setWidth, onPress, buttonPressedColor, buttonColor}) => {
  return (
    
          <Pressable 
          onPress={()=>{onPress()}}
          style={({pressed}) => [{
          backgroundColor:pressed ? buttonPressedColor : buttonColor, width: setWidth,

          },styles.butonStyle]}>
            <Text style={styles.butonTextStyle}>{title}</Text>
          </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    butonStyle:{
    height:50,
    borderRadius:20,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 10,
  },
    butonTextStyle:{
    fontWeight:'bold',
    fontSize: 20,
    color: 'white'
  },
})