import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import { CustomTextInput, CustomButton } from '../components'

const SignupPage = ({navigation}) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <SafeAreaView style={styles.container}>
      

        <View style={styles.title}>
          <Image style={styles.image} source={require ('../../assets/images/signup.png')}/>
          <Text style={styles.signUptext}>Kaydol</Text>
        </View>


        <View style={styles.textInputContainer}>
          <CustomTextInput
          title="Kullanıcı Adı"
          isSecureText={false}
          onChangeText={setName}
          value={name}
          placeholder='Adınızı Giriniz'
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
        </View>
        
        <View style={styles.signUpOptionsContainer}>
          <CustomButton
            title="Kayıt Ol"
            setWidth='80%'
            onPress={() => console.log(email,"  " ,password," " ,name)}
            buttonColor='lightblue'
            buttonPressedColor='darkcyan'
          />

          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={{ marginTop: 20, fontWeight: '700', color: 'darkcyan' }}>
              Zaten bir hesabınız var mı? {' '}
            <Text style={{ fontWeight: '900', color: 'darkblue' }}>Giriş Yapın</Text>
            </Text>
          </Pressable>

        </View>
      
    </SafeAreaView>
  )
}

export default SignupPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUptext: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '100%',

  },
  textInputContainer:{
    flex: 2,
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20
  },
  signUpOptionsContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  image:{
    width:100,
    height:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})