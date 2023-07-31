import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';

/** Http Interceptor */
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	constructor(private _storageService: StorageService, private _router: Router) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error: HttpErrorResponse) => {
				this.handleError(error);
				return throwError(error);
			})
		);
	}

	private handleError(_response: HttpErrorResponse) {
		const _errorCode = _response.status;
		switch (_errorCode) {
			case 401: //Unauthorized
				const _res = _response.error;
				console.error("Veuillez-vous reconnecter à l'application", "Erreur d'authentification !");
				this._router.navigate(['auth']);
				break;
			case 403: //forbidden
				console.log("Veuillez contacter l'administrateur", 'Action non autorisée !');
				break;
			default:
				console.error('Problême de communication', 'Erreur');
				return;
		}
	}
}

/** **************************************************************
 *  CORE API SERVICES ******************************************
 * **************************************************************/
@Injectable({ providedIn: 'root' })
export class CoreAPIServices {
	//
	API_URL = environment.urlCoreAPI;
	//
	constructor(private _http: HttpClient) {}

	/** xxxxxxxx */
	public loginUser(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/compteClient/login', { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public changePassword(data: any): Observable<any> {
		// return this._http.post(this.API_URL + '/compteClient/changePassword', data);
		return this._http.post(this.API_URL + '/compteClient/no-auth/changePassword', { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public changePasswordWithoutOTP(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/compteClient/changePasswordWithoutOtp', data);
	}

	/** xxxxxxxx */
	public sendOtp(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/otp/sendOtp', data);
	}
	/** xxxxxxxx */
	public sendOtpNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/otp/external/sendOtp',  { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public fecthFactures(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/facture/getByCriteria', data);
	}

	/** xxxxxxxx */
	public getOldFactures(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/facture/getOldFactures', data);
	}
	/** xxxxxxxx */
	public downloadOldFactures(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/facture/no-auth/getOldFactures', { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public updateFactures(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/facture/update', data);
	}

	/** xxxxxxxx */
	public fetchFAQ(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/faq/getByCriteria', data);
	}

	/** xxxxxxxx */
	public fetchFAQNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/faq/no-auth/getByCriteria',  { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public fetchTutorial(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/tutoriel/getByCriteria', data);
	}
	/** xxxxxxxx */
	public fetchTutorialNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/tutoriel/no-auth/getByCriteria',  { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public stepTutoriel(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/stepTutoriel/getByCriteria', data);
	}

	/** xxxxxxxx */
	public stepTutorielNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/stepTutoriel/no-auth/getByCriteria',  { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public fetchReclamations(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/reclamation/getByCriteria', data);
	}
	/** xxxxxxxx */
	public createReclamation(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/reclamation/create', data);
	}

	/** xxxxxxxx */
	public createReclamationNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/reclamation/no-auth/create',  { ...data, externalService: true });
	}
	/** xxxxxxxx */
	public fetchTypeReclamations(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/refTypeReclamation/getByCriteria', data);
	}
	/** xxxxxxxx */
	public fetchTypeReclamationsNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/refTypeReclamation/no-auth/getByCriteria',  { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public fetchUnivers(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/refUnivers/getByCriteria', data);
	}

	/** xxxxxxxx */
	public fetchUniversNoAuth(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/refUnivers/no-auth/getByCriteria',  { ...data, externalService: true });
	}

	/** xxxxxxxx */
	public fetchInvoiceKpi(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/kpi/getInvoice', data);
	}

	/** xxxxxxxx */
	public attachCustomerAccount(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/compteClient/attachCustomerAccount', data);
	}

	/** xxxxxxxx */
	public getFactureFile(data: any): Observable<any> {
		return this._http.post(this.API_URL + '/v1/files/getFileByName', data);
	}
	
	/** Get public key */
	public getPublicKey(): Observable<any> {
		return this._http.get(this.API_URL + '/compteClient/getPublicKey');
	}

}
