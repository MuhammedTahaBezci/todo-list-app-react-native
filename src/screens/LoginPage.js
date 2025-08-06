import { StyleSheet, Text, View, Pressable, TextInput,
  Image
 } from 'react-native';

import React,{useState} from 'react';
import { Loading, CustomTextInput, CustomButton } from '../components';

const LoginPage = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  console.log(isLoading)
  return (

    <View style={styles.container}>

      <Image 
        source={require('../../assets/images/logon.png')}
        style={styles.image}
      />


      <CustomTextInput
        title="Email"
        isSecureText={false}
        onChangeText={setEmail}
        value={email}
        placeholder='Email Giriniz'
        />
      
      <CustomTextInput
        title="Parola"
        isSecureText={true}
        onChangeText={setPassword}
        value={password}
        placeholder='Parola Giriniz'
        />

      <CustomButton
        title="Giriş Yap"
        setWidth='80%'
        onPress={() => setIsLoading(true)}
        buttonColor='lightblue'
        buttonPressedColor='darkcyan'  
      />

      <CustomButton
        title="Aramıza Katıl"
        setWidth='40%'
        onPress={()=> navigation.navigate('SignUp')}
        buttonColor='gray'
        buttonPressedColor='darkcyan'
      />

        {isLoading ? <Loading changeIsLoading = {() => setIsLoading(false)}/>: null}
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:'100%',
    height:200,
    right: 15,
  },
}); 
