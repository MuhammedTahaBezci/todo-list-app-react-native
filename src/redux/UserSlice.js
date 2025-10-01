import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut,
    createUserWithEmailAndPassword, 
    sendEmailVerification} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Asenkron bir işlem olan kullanıcı girişi için createAsyncThunk kullanılması
// 'user/login' benzersiz bir eylem türü (action type) oluşturur
export const login = createAsyncThunk(
    'user/login', // Eylem türü
     async ({email, password}) =>{ // Asenkron işlem için payload olarak email ve password alır
        try {
            // Firebase Auth nesnesini alma
            const auth = getAuth();
            // Firebase'in signInWithEmailAndPassword fonksiyonu ile giriş yapma
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            // Giriş başarılı olursa kullanıcı ve token bilgilerini alma
            const user = userCredential.user;
            const token = user.stsTokenManager.accessToken;

            // Gerekli verileri bir nesne içinde toplama
            console.log("Giriş Başarılı:", userData);
            const userData ={ token, user:user}

            await AsyncStorage.setItem('userToken', token); // Token'ı AsyncStorage'a kaydetme
            

            return {userData, error: null};
        } catch (error) {
            console.error("Giriş Hatası:", error);
            // Hatanın ekstraReducers tarafından yakalanması için hatayı tekrar fırlatma
            throw error;
        }
    }
)

//kullanıcı otomatik giriş işlemleri
export const autoLogin = createAsyncThunk(
    'user/autoLogin',
    async () => {
        try {
            // AsyncStorage'dan token'ı alma
            const token = await AsyncStorage.getItem('userToken');
                // Token varsa döndür, yoksa hata fırlat
                if (token) {
                    return token;
                }else {
                    throw new Error('No token found');
                }
        } catch (error) {
            throw error; // Hatanın ekstraReducers tarafından yakalanması için hatayı tekrar fırlatma  
        }
    }
)

// kullanici cikis islemleri
export const logout = createAsyncThunk('user/logout', async() => {
    try {
        const auth = getAuth();
        await signOut(auth);
        await AsyncStorage.removeItem('userToken');
        return null;
    } catch (error) {
        throw error;
    }   
})

//kullanıcı kayıt işlemleri
export const register = createAsyncThunk('user/register', async({email, password}) => {
    try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Yeni kullanıcı oluşturma

        
        const user = userCredential.user; // Kayıt olan kullanıcı bilgisi
        const token = user.stsTokenManager.accessToken; // Kullanıcı token'ı

        await sendEmailVerification(user); // E-posta doğrulama gönderme

        await AsyncStorage.setItem('userToken', token); // Token'ı AsyncStorage'a kaydetme

        return { user, token }; // Kullanıcı ve token bilgilerini döndürme
        
    } catch (error) {
        throw error; // Hatanın ekstraReducers tarafından yakalanması için hatayı tekrar fırlatma
    }
})


// Redux slice'ın başlangıç durumu (initial state)
const initialState = {
    isLoading: false,
    isAuth: false,
    token: null,
    user: null,
    error: null,
}

// createSlice ile bir Redux slice oluşturma
export const userSlice = createSlice({
    name: 'user',
    initialState, // Başlangıç durumu
    reducers: {
        // Senkron eylemler (actions)
        // Her bir reducer, slice state'inin bir bölümünü günceller
        setEmail: (state, action) => {
            const loverCaseEmail = action.payload.toLowerCase();
            state.email = loverCaseEmail;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setIsLoading: (state, action) => {  
            state.isLoading = action.payload;
        },

    },
    // Asenkron eylemleri (thunk'ları) ele almak için extraReducers kullanımı
    // .addCase ile her bir asenkron eylem durumu (pending, fulfilled, rejected) için durum güncellemeleri tanımlanır
    extraReducers: (builder) =>{
        builder
        // login işlemi başladığında (pending)
        .addCase(login.pending, (state) => {
            state.isLoading = true; // Yükleme durumunu true yap
            state.isAuth = false; // Kimlik doğrulama durumunu false yap
        })
        // login işlemi başarılı olduğunda (fulfilled)
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            // Gelen veriyi (payload) state'e kaydet
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        // login işlemi reddedildiğinde veya hata oluştuğunda (rejected)
        .addCase(login.rejected, (state, action) => {
            state.isAuth = false; // Kimlik doğrulama durumunu false yap
            state.isLoading = false;  // Yükleme durumunu false yap
            state.error = action.error.message; // Hata mesajını state'e kaydet
        })
        
        // autoLogin işlemi başladığında (pending)
        .addCase(autoLogin.pending, (state) => {
            state.isLoading = true; // Yükleme durumunu true yap
            state.isAuth = false; // Kimlik doğrulama durumunu false yap
        })
        
        // autoLogin işlemi başarılı olduğunda (fulfilled)
        .addCase(autoLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            // Gelen veriyi (payload) state'e kaydet
            state.token = action.payload;
        })
        // autoLogin işlemi reddedildiğinde veya hata oluştuğunda (rejected)
        .addCase(autoLogin.rejected, (state, action) => {
            state.isLoading = false;  // Yükleme durumunu false yap
            state.isAuth = false; // Kimlik doğrulama durumunu false yap
            state.token = null; // Token'ı null yap
        })

        .addCase(logout.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.isAuth = false;
            state.token = null;
            state.error = null;

        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;

        })

        //pending isLoading true yapar
        //fulfilled başarılı ise isLoading false yapar ve user ile token'ı state'e kaydeder
        //rejected hata varsa isLoading false yapar ve error mesajını state'e kaydeder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuth = true;
            state.token = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuth = false;
            state.error = "E-posta veya parola hatalı";
        })
    }
})

export const { setEmail, setPassword, setIsLoading } = userSlice.actions;
export default userSlice.reducer;