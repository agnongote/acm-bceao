import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import '../../../assets/js/RSA.min.js';
import { StorageService } from './storage.service';
declare var RSA: any;

@Injectable()
export class CryptoInterceptorService implements HttpInterceptor {
	constructor(private _router: Router, private _storageService: StorageService) {}

	/** Main interceptor function */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//
		let externalService: boolean;
		let headers: HttpHeaders = new HttpHeaders();
		const _cryptoJSCipher = new CryptoJSCipher(CryptoJS.mode.ECB, CryptoJS.pad.Pkcs7, CryptoJS.AES);
		const token = this._storageService.getUserData() ? this._storageService.getUserData().token : null;
		//
		if (request.method === 'POST') {
			/*Intercep all post request */
			externalService = request.body.externalService; // for checking connexion(auth) request
			//
			// console.log('header', request);
			if (externalService === true) {
				headers = headers.append('Content-Type', 'application/json');
				let req = null;
				if(request.url.indexOf('changePassword')>-1){
					req = { ...request.body}
				} else {
					req = { data: request.body?.data }
				}
				request = request.clone({
					headers,
					method: request.method,
					body: req
				});
			} else {
				headers = headers.append('Content-Type', 'application/json');
				headers = token != null ? headers.append('sessionUser', token) : headers;
				if (request.body.pureData) {
					let req;
					if (request.body) {
						req = request.body;
					} else {
						req = {
							datas: request.body.data.datas
						};
					}
					request = request.clone({
						headers,
						method: request.method,
						body: req
					});
				} else if (request.body.onlyRequest) {
					headers = headers.append('Content-Type', 'application/json');
					let req;
					if (request.body.data.data) {
						req = request.body.data;
					} else {
						req = {
							datas: request.body.data.datas
						};
					}
					request = request.clone({
						headers,
						method: request.method,
						body: req
					});
				} else {
					if (request.body instanceof FormData) {
						headers = headers.append('Content-Type', 'multipart/form-data');
						request = request.clone({
							setHeaders: {},
							body: request.body
						});
					} else {

						if (environment.encrypted) {
							//	console.info('request ' + request.url.split('/')[5], request.body);
						}
						request = request.clone({
							headers,
							method: request.method,
							body: !environment.encrypted
								? { ...request.body }
								: {
										data: _cryptoJSCipher.encode(JSON.stringify(request.body), this._storageService.getAESKey())
								  }
						});
					}
				}
			}
		} else if (request.method === 'GET') {
		}

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					const hds = request.headers.get('serviceLibelle');
					if (request.method === 'POST' || (request.method === 'GET' && hds)) {
						const data = event.body && event.body.item ? event.body.item : undefined;
						if (data === undefined) {
							if (
								(event.body && event.body.status && event.body.status.code == 935) ||
								(event.body && event.body.status && event.body.status.code == 930)
							) {
								// : 'Votre session à expirer! Veuillez vous reconnecter');
								this._router.navigate(['/auth']);
								window.location.reload();
								this._storageService.removeAESKey();
								this._storageService.removeUserData();
								this._storageService.removePublicKey();
							}
							return event;
						}

						try {
							event = event.clone({
								body: JSON.parse(_cryptoJSCipher.decode(data, this._storageService.getAESKey()))
							});
							// console.info(`response ${event.url && event.url != null ? event.url.split('/')[5] : ''}`, event.body);
						} catch (error) {
							event = event.clone({
								body: {
									decryptError: true,
									error: error,
									hasError: true
								}
							});
							//   console.error(`DecryptError ${event.url && event.url != null ? event.url.split("/")[5] : ""}`, event.body);
						}
					} else if (request.method === 'GET') {
					}
				}
				return event;
			})
		);
	}

	/** Check content header */
	ContentHeaderCheck(headerToCrypt: any): any {
		return {
			check(contentType: any) {
				for (let index = 0; index < headerToCrypt.length; index++) {
					const result = contentType.startsWith(headerToCrypt[index]);
					if (result) {
						return true;
					}
				}
				return false;
			}
		};
	}
}

String.prototype.startsWith = function (val) {
	return this.indexOf(val) === 0;
};

String.prototype.endsWith = function (str) {
	const lastIndex = this.lastIndexOf(str);
	return lastIndex !== -1 && lastIndex + str.length === this.length;
};

/** CYPHER CLASS PARAMETERS */
class CryptoJSCipher {
	#mode: any = null;
	#padding: any = null;
	#Cipher: any = null;

	constructor(mode: any, padding: any, Cipher: any) {
		this.#mode = mode;
		this.#padding = padding;
		this.#Cipher = Cipher;
	}

	encode(plainValue: any, base64Key: any) {
		if (!plainValue) {
			return plainValue;
		}
		if (base64Key.length <= 0) {
			return plainValue;
		}
		const key = CryptoJS.enc.Base64.parse(base64Key);
		// this is the decrypted data as a sequence of bytes
		const encryprtedData = this.#Cipher.encrypt(plainValue, key, {
			mode: this.#mode,
			padding: this.#padding
		});
		return encryprtedData.toString();
	}

	decode(encryptedValue: any, base64Key: any) {
		if (base64Key.length <= 0) {
			return encryptedValue;
		}
		const key = CryptoJS.enc.Base64.parse(base64Key);
		const decryptedData = this.#Cipher.decrypt(encryptedValue, key, {
			mode: this.#mode,
			padding: this.#padding
		});
		return decryptedData.toString(CryptoJS.enc.Utf8);
	}
}
