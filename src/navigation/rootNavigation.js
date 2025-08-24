import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import AuthStack from './AuthStack'
import UserStack from './UserStack'
import app from '../../firebaseConfig'


const rootNavigation = () => {

  // Redux store'dan isAuth durumunu alıyoruz
    const {isAuth} = useSelector((state) => state.user);


  return (
    <NavigationContainer>
        {!isAuth ? <AuthStack /> : <UserStack />}
    </NavigationContainer>
  )
}

export default rootNavigation
