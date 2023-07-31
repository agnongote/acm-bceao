import { Injectable } from '@angular/core';
import { Utilities } from './utilities.service';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  userGetData: any;
  userDataKey : string = '896c8932-6823-4e02-a816-cd97366a1e5f';
  userAesKey : string = '015dd3b4-e3f0-4dee-8177-eab2b4b467ec';
  userPublicKey : string = '426ceedc-524a-4f56-bfc3-e830e8ac212b';

  constructor(
    private _util: Utilities
  ) {
    this.userGetData = this.getUserData();
  }

    /** USER DATA STUFF ************************************************************************ */

  /** Save current actor in session storage */
  saveUserData(_userDatas: any): void {
    if (_userDatas) {
      window.sessionStorage.setItem(this.userDataKey, JSON.stringify(_userDatas));
    }
  }

  /** Get current actor data saving in session storage */
  getUserData(): any {
    const userData = window.sessionStorage.getItem(this.userDataKey);
    return userData ? JSON.parse(userData) : null;
  }

  /** Get current actor data saving in session storage */
  removeUserData(): void {
    window.sessionStorage.removeItem(this.userDataKey);
  }

  /** Save current aeskey in session storage */
  saveAESKey(_aesKey: string): void {
    if (_aesKey) {
      window.sessionStorage.setItem(this.userAesKey, JSON.stringify(_aesKey));
    }
  }

  /** Get current aeskey data saving in session storage */
  getAESKey(): any {
    const _aesKey = window.sessionStorage.getItem(this.userAesKey);
    return _aesKey ? JSON.parse(_aesKey) : null;
  }

  /** Get current aeskey data saving in session storage */
  removeAESKey(): void {
    window.sessionStorage.removeItem(this.userAesKey);
  }


  /** Save current public key in session storage */
  savePublicKey(_pk: any): void {
    if (_pk) {
      window.sessionStorage.setItem(this.userPublicKey, JSON.stringify(_pk));
    }
  }

  /** Get current public key data saving in session storage */
  getPublicKey(): any {
    const _pk = window.sessionStorage.getItem(this.userPublicKey);
    return _pk ? JSON.parse(_pk) : null;
  }

  /** Get current public key data saving in session storage */
  removePublicKey(): void {
    window.sessionStorage.removeItem(this.userPublicKey);
  }

  /** Save current actor in session storage */
  saveUserPreferences(_paramName: string, _value:any): void {
    if (_paramName) {
      window.localStorage.setItem(_paramName, JSON.stringify(_value));
    }
  }

  /** Get current actor data saving in session storage */
  getUserPreferences(_paramName:string): any {
    if (_paramName) {
    const userData = window.localStorage.getItem(_paramName);
    return userData ? JSON.parse(userData) : null;
    }
  }

  /** find action of user role */
  findUserAction(code: string): boolean {
    if (this.userGetData) {
      return (
        this._util
          .flatDeepArray(this.userGetData.datasRole)
          .findIndex(
            (elt: any) => elt.code.toLowerCase() === code.toLowerCase()
          ) > -1
      );
    } else if (this.getUserData() && this.getUserData().datasRole) {
      return (
        this._util
          .flatDeepArray(this.getUserData().datasRole)
          .findIndex(
            (elt: any) => elt.code.toLowerCase() === code.toLowerCase()
          ) > -1
      );
    } else {
      return false;
    }
  }

  /** Get current actor data saving in session storage */
  removeUserPreferences(_paramName:string): void {
    window.localStorage.removeItem(_paramName);
  }

  //
  /** LOCAL STORAGE STUFF ************************************************************************ */

  /** sauvegarde d'element dans le local storage */
  saveInLocalStorage(storageName: string, data: any) {
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }

  /** recuperation d'element dans le local storage */
  getFromLocalStorage(storageName: string) {
    const data = window.localStorage.getItem(storageName);
    return data ? JSON.parse(data) : null;
  }

  /** suppression d'element du local storage */
  removeInLocalStorage(storageName: string) {
    window.localStorage.removeItem(storageName);
  }

  //
  /** SESSION STORAGE STUFF ************************************************************************ */

  /** sauvegarde d'element dans la session storage */
  public saveInSessionStorage(storageName: string, data: any): void {
    window.sessionStorage.setItem(storageName, JSON.stringify(data));
  }

  /** recuperation d'element dans la session storage */
  public getFromSessionStorage(storageName: string): void {
    const data = window.sessionStorage.getItem(storageName);
    return data ? JSON.parse(data) : null;
  }

  /** supprimer d'element du session storage */
  public removeInSessionStorage(storageName: string): void {
    window.sessionStorage.removeItem(storageName);
  }
}
