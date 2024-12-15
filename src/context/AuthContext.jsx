import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from 'firebase/auth'
import {useState,useEffect,useContext, createContext} from 'react'
import { auth,db } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth/web-extension'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext=createContext()

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider(props){
  const {children}=props
  const [globalUser,setGlobalUser]=useState(null)
  const [globalData,setGlobalData]=useState(null)
  const [isLoading,setIsLoading]=useState(false)

  

  function signup(email,password){
    return createUserWithEmailAndPassword(auth,email,password)
  }

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth,email)
  }

  function logout(){
    setGlobalUser(null)
    setGlobalData(null)
    return signOut(auth)
  }


  


  const value={globalUser,globalData,setGlobalData,isLoading, signup,login,logout}

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,async (user)=>{ 
      console.log('CurrentUser',user)
      setGlobalUser(user)
      //if there's no user,empty the user sstate and return from this listener
      if (!user){
        console.log('no active user')
        return}


      //if there is a user,then check if the user has data in the database, and if they do, then fetch said data and update the global state  

      try{
        setIsLoading(true)

        //first we create a reference for the document (labelled json object), then we get the doc,and then we snapshot it to see if there's anything there.
        const docRef=doc(db,'users',user.uid)
        const docSnap=await getDoc(docRef)

        let firebaseData={}
        if (docSnap.exists()){
          console.log('found user data')
          firebaseData=docSnap.data()
          console.log(firebaseData)
        }
        setGlobalData(firebaseData)
      }catch(err){
        console.log(err)

      }finally{
        setIsLoading(false)
      }

    })
    return unsubscribe
  },[])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>


  )
}