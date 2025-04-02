import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { collection, collectionData, deleteDoc, doc, Firestore, query } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'firebasedemo';
  public datas:any ;
  public result:any;
id: any;

  constructor(
    private readonly _firestore: Firestore,
    private readonly _auth: Auth
  ){}

  loadUser(){
    const collectionRef = collection(this._firestore, 'demo');
    const q = query(collectionRef)
    const datas = collectionData(q, {idField:'id'})
    //bien penser binder le resultat de sa query dans la variable
    this.datas = datas;
  }

  async deleteUser(id:string): Promise<void> {
    const fbref = doc(this._firestore, 'demo/' + id);
    await deleteDoc(fbref)
  }

  //connection avec google 
  async signinWithGoogle(){
    const provider = new GoogleAuthProvider();
    try {
      const credential = await signInWithPopup(this._auth, provider);
      const user = credential.user;
      console.log('Utilisateur connecté:', user);
    } catch (err) {
      console.error('Erreur de connexion Google:', err);
    }
  }

  //Idée a rajouter dans le service qui va venir etre utiliser pour creer et binder le firestore storage - dans son servie penser a inculre une partie qui viendrait gerer la taile des fichiers et surout pourquoi pas utiliser un compressor
}
