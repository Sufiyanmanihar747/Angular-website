import { Injectable } from '@angular/core';
import { collection, addDoc, getFirestore, getDocs, doc, getDoc, where, DocumentData, Query, QuerySnapshot, query, updateDoc, deleteField } from "firebase/firestore";
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private app = initializeApp(firebaseConfig);
  public db = getFirestore(this.app);
  // public userId;
  constructor(private authServices: AuthService, private router: Router) {
    // this.userId = authServices.getUid()
  }

  async createSnippet(snippet: { title: string, code: string }) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), { ...snippet, by: this.authServices.getUid() });
      console.log("Document written with ID: ", docRef.id);
      this.router.navigate(['/'])
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
    });
    return result
  }

  async getMySnippet() {
    const userId = this.authServices.getUid();

    const q = query(collection(this.db, "snippets"), where("by", "==", userId));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    const result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });

    console.log(result)
    return result;

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
