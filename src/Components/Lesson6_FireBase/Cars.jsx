import React from 'react'
import db from './firebase'

import {
    // מייצרת שאילתות לדאטה בייס
    query , 

    // מחזירה לי תמונת מצב של הדאטה בייס כל מה שקורה בו נכון לשימוש בה
    onSnapshot,

    // מייבאת את הקולקטשין המתאים
    collection,

    // מחזיר  אובייקט אחד
    doc,

    // הוספת ערך
    addDoc,

    // עדכון ערך
    updateDoc,

    // מחיקת ערך
    deleteDoc

} from "firebase/firestore"

function Cars() {

    // examples of usage firebase

    const getAllcars =()=>{
        const col =  collection(db,"Cars")
        const q = query(col)

        onSnapshot(q,(quearySnapshot)=>{
            quearySnapshot.docs.forEach(user => {
                // getting the data from id and the data as well
                console.log(user.id, user.data())
            });
        })
    }

    const getcar =(id)=>{
        const userdoc =  doc(db,"Cars",id)
        const q = query(userdoc)

        onSnapshot(q,(doc)=>{
            console.log(doc.id)
            console.log(doc.data())
        })


    }

    const addCar = async()=>{
        const col =  collection(db,"Cars")
        await addDoc(col,{the_object_i_want_to_add })

    }

    const updateCar = (car)=>{
        

    }

     const deleteCar = async(id)=>{
        const userdoc =  doc(db,"Cars",car.id)
        deleteDoc(userdoc,id)


    }
  return (
    <div>Cars</div>
  )
}

export default Cars