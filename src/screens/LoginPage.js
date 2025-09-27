import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Image, } from 'react-native';
import { Loading, CustomTextInput, CustomButton } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../redux/UserSlice';
import { login, autoLogin } from '../redux/UserSlice';

const LoginPage = ({navigation}) => {

  // useState ile email ve parola durumlarının (state) yönetilmesi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  // Redux store'dan user slice'ındaki isLoading verisinin okunması
  const {isLoading} = useSelector((state) => state.user);
  
  console.log("email:",email,"\n password:", password, isLoading)
  // Redux store'a action göndermek için useDispatch kullanılması
  const dispatch = useDispatch();

  //kulllanıcı daha önce giriş yaptıysa otomatik giriş işlemi
  //useEffect ile bileşen yüklendiğinde çalışacak kod
  useEffect(() => {
   dispatch(autoLogin())
  }, [])
  
  console.log(isLoading)
  return (

    <View style={styles.container}>

      <Image 
        source={require('../../assets/images/logon.png')}
        style={styles.image}
      />

      {/* Email girişi için özel olarak oluşturulmuş metin giriş bileşeni */}
      <CustomTextInput
        title="Email"
        isSecureText={false} // Metnin gizlenmemesini sağlar
        onChangeText={(text) => setEmail(text)} // Değişiklik olduğunda email state'ini günceller
        value={email}
        placeholder='Email Giriniz'
        />
      
      {/* Parola girişi için özel olarak oluşturulmuş metin giriş bileşeni */}
      <CustomTextInput
        title="Parola"
        isSecureText={true}
        onChangeText={(password) => setPassword(password)} // Değişiklik olduğunda parola state'ini günceller
        value={password}
        placeholder='Parola Giriniz'
        />

      {/* Giriş yap butonu */}
      <CustomButton
        title="Giriş Yap"
        setWidth='80%'
        onPress={() => dispatch(login({email, password}))} // Tıklandığında login action'ını çağırır
        buttonColor='lightblue'
        buttonPressedColor='darkcyan'  
      />

      {/* Kayıt sayfasına yönlendiren buton */}
      <CustomButton
        title="Aramıza Katıl"
        setWidth='40%'
        onPress={()=> navigation.navigate('SignUp')}
        buttonColor='gray'
        buttonPressedColor='darkcyan'
      />

        {/* isLoading true ise Loading bileşenini göster, değilse null (gösterme) */}
        {isLoading ? <Loading changeIsLoading = {() => dispatch(setIsLoading(false))}/>: null}
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
