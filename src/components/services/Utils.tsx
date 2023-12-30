import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";
import { storage } from "./FirebaseService";
import { v4 } from "uuid";
export default class Utils {
  static showAlert() {
    return new Promise((resolve) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (!result.isConfirmed) resolve(false);
        resolve(true);
      });
    });
  }
  static async storeImgToFirebase(file: any, storageName: string) {
    if (file === null) return null;
    const imagRef = ref(storage, `${storageName}/${v4()}`);
    await uploadBytes(imagRef, file);
    const imgUrl = await getDownloadURL(imagRef);
    return imgUrl;
  }
}
