import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { collection, addDoc, getDocs,doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebaseConfig';
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';

const HomePage = () => {

  // firestore'dan çekilen veriler
  const [data, setData] = useState([])
  // veri kaydedildi mi durumu
  const [isSaved, setIsSaved] = useState(false)
  // güncelleme için state
  const [updetTheData, setUpdetTheData] = useState('')
  // fonksiyonları tetiklemek için dispatch
  const dispatch = useDispatch();

  console.log(isSaved)

  // Sayfa yüklendiğinde verileri çek
  useEffect(() => {
    getData();
  }, [isSaved]) // isSaved durumu değiştiğinde verileri tekrar çek

  // Firestore'a veri ekleme fonksiyonu
  const sendData = async () => {
    try {
      const docRef = await addDoc(collection(db, "reactNativeLesson"), {
        title: "Zero to Hero",
        content: "React Native ile mobil uygulama geliştirme",
        lesson: 100
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Firestore'dan veri okuma fonksiyonu
  const getData = async () => {
    const allData = [];

    try {
      const querySnapshot = await getDocs(collection(db, "reactNativeLesson"));
        querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //verileri diziye ekleme
        allData.push({id: doc.id, ...doc.data()})
      });
      setData(allData);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }
  
  // Firestore'dan veri silme fonksiyonu
  const deleteData = async (value) => {
    try {
      await deleteDoc(doc(db, "reactNativeLesson", value));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
      
    }
  }

  // Firestore'da veri güncelleme fonksiyonu
  const updateData = async (value) => {
    try {
      const docRef = doc(db, "reactNativeLesson", value);
      await updateDoc(docRef, {
        content: updetTheData
      });
    } catch (error) {
      
    }
  }

  // çıkış yapma fonksiyonu
  const handlelogout = () => {
    dispatch(logout());
  }
  

  return (
    <View style={styles.container}>

      <TextInput
        value={updateData}
        onChangeText={setUpdetTheData}
        placeholder='veri girin'
        style={{width: "80%", height: 50, backgroundColor: "lightblue", marginBottom: 20, paddingHorizontal: 10, borderRadius: 20}}
      />
      
      {data.map((value,index) => {
        return (
          <Pressable 
            onPress={()=> [updateData(value.id), setIsSaved(isSaved===false ? true : false)]}
            key={index}>
            <Text>{index}</Text>
            <Text>{value.title}</Text>
            <Text>{value.content}</Text>
            <Text>{value.lesson}</Text>
          </Pressable>
        )
      })}

      
      <CustomButton
      title={"kaydet"}
      setWidth="40%"
      buttonColor="lightblue"
      buttonPressedColor="darkcyan"
      onPress={()=> {sendData(), setIsSaved(isSaved===false ? true : false)}}
      />

      <CustomButton
      title={"verileri getir"}
      setWidth="40%"
      buttonColor="lightblue"
      buttonPressedColor="darkcyan"
      onPress={getData}
      />

      <CustomButton
      title={"verileri sil"}
      setWidth="40%"
      buttonColor="lightblue"
      buttonPressedColor="darkcyan"
      onPress={deleteData}
      />

      <CustomButton
      title={"verileri güncelle"}
      setWidth="40%"
      buttonColor="lightblue"
      buttonPressedColor="darkcyan"
      onPress={updateData}
      />

      <CustomButton
      title={"Çıkış Yap"}
      setWidth="40%"
      buttonColor="darkcyan"
      buttonPressedColor="lightblue"
      onPress={handlelogout}
      />
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dde2f8ff',
  }
})