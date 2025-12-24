import AllUsers from "./AllUsers"
import AdultUsers from "./AdultUsers"
import { useDispatch } from 'react-redux'
import { useState } from 'react'

function UsersHost() {
    const disptach = useDispatch() // שליחת actions ל-Redux
    
    // ה-state המקומי של הטופס
    const [user, setUser] = useState({
        id: 0,
        fname: "",
        lname: "",
        age: 0
    })
    
    // ========== פונקציות לשליחת Actions ==========
    
    // הוספת משתמש חדש
    const add = () => {
        disptach({
            type: "ADD",
            payload: user  // שולח את כל פרטי המשתמש
        })
    }
    
    // עדכון משתמש קיים - כאן הייתה הבעיה! ❌➡️✅
    const update = () => {
        disptach({
            type: "UPDATE",
            id: user.id,      // ⭐ חובה לשלוח את ה-ID בנפרד!
            payload: user     // וגם את כל הפרטים המעודכנים
        })
    }
    
    // מחיקת משתמש
    const delete_user = () => {
        disptach({
            type: "DELETE",
            payload: user.id  // שולח רק את ה-ID למחיקה
        })
    }

    return (
        <div>
            {/* שדות הטופס */}
            ID: <input 
                type='number' 
                onChange={(e) => setUser({...user, id: +e.target.value})} 
            />
            
            First Name: <input 
                type='text' 
                onChange={(e) => setUser({...user, fname: e.target.value})} 
            />
            
            Last Name: <input 
                type='text' 
                onChange={(e) => setUser({...user, lname: e.target.value})} 
            />
            
            Age: <input 
                type='number' 
                onChange={(e) => setUser({...user, age: +e.target.value})} 
            />
            
            {/* כפתורי הפעולה */}
            <button onClick={add}>Add</button>
            <button onClick={update}>update</button>
            <button onClick={delete_user}>delete</button>
            
            <br />
            
            {/* תצוגת המשתמשים */}
            <AllUsers />
            <AdultUsers />
        </div>
    )
}

export default UsersHost