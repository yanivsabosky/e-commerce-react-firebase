import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";

import { db, auth } from "./FINALprojects/Client/Data";
import { LoginSuccess } from "./FINALprojects/Client/Store/authSlice";
import { setUsers } from "./FINALprojects/Client/Store/usersSlice";
import {
  setProducts,
  setSoldTotals,
} from "./FINALprojects/Client/Store/productsSlice";
import { load } from "./FINALprojects/Client/Utils/utilities";


export default function useAuthBootstrap() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        // load user profile
        const ref = doc(db, "users", user.uid);
        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {
          const data = snapshot.data();
          dispatch(
            LoginSuccess({
              uid: user.uid,
              fullname: data.fullname,
              email: data.email,
              isAdmin: data.isAdmin,
              allowOthersToSeeMyOrders: data.allowOthersToSeeMyOrders,
            })
          );
        }

        //  load protected collections
        const users = await load("users");
        dispatch(setUsers(users));

        const products = await load("products");
        dispatch(setProducts(products));

        const orders = await load("orders");
        dispatch(setSoldTotals({ users, orders }));

      } catch (err) {
        console.error("Auth bootstrap error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { loading };
}
