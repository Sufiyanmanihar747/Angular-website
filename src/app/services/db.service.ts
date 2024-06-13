import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, getDocs, doc, getDoc } from "firebase/firestore";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?: any

  constructor(private authServices: AuthService) {
    this.db = getFirestore();
  }

  async createSnippet(snippet: { title: string, code: string }) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), { ...snippet, by: this.authServices.getUid() });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("error while creating")
    }
  }

  async getAllSnippet() {
    let result: any[] = [];

    const querySnapshot = await getDocs(collection(this.db, "snippets"));
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() })
      // console.log(`${doc.id} => ${doc.data()}`);
    });
    return result
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      console.log("No such document!");
      return {
        id: 1,
        title: "not found",
        code: "not found"
      }
    }

  }

}
