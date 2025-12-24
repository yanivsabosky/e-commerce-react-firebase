
// Action -> object

// Type Mandatory (string)
// payload not Mandatory (any )
function AppReducer(initState = 0,action){
    if(action.type === 'Increment') return initState + action.payload;
    else if(action.type === 'Decrement') return initState -action.payload;
    return initState;

}

function AddProd(initState = [],action){
    if(action.type === 'Add'){
        return [...initState,action.payload]

    }
    else if(action.type === 'Remove'){
        return initState.filter((p)=>p.name !==action.payload)

    }
    return initState;
}

function UsersState(initState = [], action) {
    switch (action.type) {
        
        // ========== הוספת משתמש חדש ==========
        case "ADD":
            return [...initState, action.payload]; 
            // יוצר מערך חדש עם כל המשתמשים הקיימים + המשתמש החדש
        
        // ========== עדכון משתמש קיים ==========
        case "UPDATE":
            // עובר על כל המשתמשים במערך
            return initState.map((item) => 
                // אם ה-ID של המשתמש תואם ל-ID שנשלח ב-action
                item.id === action.id 
                    ? action.payload  // החלף אותו במשתמש החדש
                    : item            // אחרת - השאר אותו כמו שהוא
            );
        
        // ========== מחיקת משתמש ==========
        case "DELETE":
            return initState.filter((i) => i.id !== action.payload);
            // מסנן החוצה את המשתמש עם ה-ID שנשלח
        
        // ========== ברירת מחדל ==========
        default:
            return initState; 
            // אם ה-action לא מוכר - החזר את ה-state ללא שינוי
    }
}



export  {AppReducer,AddProd,UsersState};