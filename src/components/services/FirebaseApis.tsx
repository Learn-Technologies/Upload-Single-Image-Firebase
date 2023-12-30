import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { useMutation, useQuery } from "react-query";
import { getStore } from "./FirebaseService";
// create api
export function useAddList(postExecution?: (data: any) => void) {
  return useMutation("myStore", async (data: any) => {
    // clg
    const { id } = data;
    if (id) {
      let res = await setDoc(doc(getStore(), "myStore", id), data);
      return res;
    } else {
      let res = await addDoc(collection(getStore(), "myStore"), data);
      return res;
    }
  });
}
// get lists
export function useLists() {
  return useQuery("myStore", async () => {
    let res: any = await getDocs(query(collection(getStore(), "myStore")));
    if (Array.isArray(res.docs))
      return res.docs.map((item: any) => ({ id: item.id, ...item.data() }));
  });
}
// delete lists
export function useDeleteList(postExecution?: (data: any) => void) {
  return useMutation("myStore", async (data: any) => {
    const { id } = data;
    let res = await deleteDoc(doc(getStore(), "myStore", id));
    return res;
  });
}
