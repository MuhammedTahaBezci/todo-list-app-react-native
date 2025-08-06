import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({title, isSecureText, onChangeText, value, placeholder}) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.inputBoxText}>{title}</Text>
        <TextInput
            secureTextEntry={isSecureText}
            placeholder= {placeholder}
            style={styles.textInputStyle}
            onChangeText={onChangeText}
            value={value}
        />
    </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputContainer: {
    width: '80%',
    marginVertical: 10,
    
  },
  inputBoxText: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  textInputStyle: {
    borderWidth:1,
    width: '100%',
    height: 50,
    borderRadius: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})