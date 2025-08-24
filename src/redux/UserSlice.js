import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
            const userData ={ token, user:user}
            console.log("Giriş Başarılı:", userData);

            return {userData, error: null};
        } catch (error) {
            console.error("Giriş Hatası:", error);
            // Hatanın ekstraReducers tarafından yakalanması için hatayı tekrar fırlatma
            throw error;
        }
    }
)

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

    }
})

export const { setEmail, setPassword, setIsLoading } = userSlice.actions;
export default userSlice.reducer;