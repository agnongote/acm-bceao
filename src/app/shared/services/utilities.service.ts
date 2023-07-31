import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class Utilities {
	/** COMMON UTILITIES *********************************************
	 * Utility function for common manipulation **********************
	 * ****************************************************************/

	getFormValidationErrors(_form: FormGroup) {
		if (_form) {
			Object.keys(_form.controls).forEach((key) => {
				const controlErrors: ValidationErrors | null = _form.controls[key].errors;
				if (controlErrors != null) {
					Object.keys(controlErrors).forEach((keyError) => {
						console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
					});
				}
			});
		}
	}

	/**
	 * /**
	 * Evaludation force password
	 * @param password
	 * @param commonPasswords
	 * @returns [=<1]-weak | [>=2]-middle | [>=3]-strong [>=4]-very-strong
	 */
	public evaluatePasswordStrength(password: string, commonPasswords: string[]): number {
		if (this.isNullOrEmpty(password)) {
			return 0;
		}
		const PWD_LENGTH = 10;
		const COMMON_PWD_LIST = [
			'123456',
			'12345',
			'azerty',
			'azerty@123',
			'azerty123@',
			'qwertz',
			'qwertz@123',
			'qwertz123@',
			'qwerty',
			'qwerty@123',
			'qwerty123@',
			'password',
			'password123',
			'password@123',
			'password123@',
			'usr',
			'123456789',
			'1234',
			'12345678',
			'147258369',
			'123',
			'azertyuiop',
			'avf2013',
			'1234561',
			'1234567',
			'1234567890',
			'abc123',
			'111111',
			'123123',
			'admin',
			'letmein',
			'welcome',
			'monkey',
			'password1',
			'sunshine',
			'master',
			'football'
		];
		commonPasswords = [...new Set([...COMMON_PWD_LIST, ...commonPasswords])];
		//
		const lengthScore = password.length >= PWD_LENGTH ? 1 : 0.5;
		const uppercaseScore = /[A-Z]/.test(password) ? 1 : 0;
		const lowercaseScore = /[a-z]/.test(password) ? 1 : 0;
		const digitLength = (password.match(/\d/g) || []).length;
		const digitScore = digitLength === 0 ? 0 : digitLength === 1 ? 0.5 : 1;
		const specialCharLength = (password.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
		const specialCharScore = specialCharLength === 0 ? 0 : specialCharLength === 1 ? 0.5 : 1;
		const combinDigitSpecChar = digitLength > 0 && specialCharLength > 0 ? 0 : 1;
		//
		const commonPasswordScore = commonPasswords.includes(password.toLocaleLowerCase()) ? 0.5 : 1;
		const totalScore =
			(uppercaseScore + lowercaseScore + digitScore + specialCharScore - combinDigitSpecChar) * commonPasswordScore * lengthScore;
		//
		return totalScore < 1 ? 1 : totalScore;
	}

	public genRanHex = (size: number) => {
		[...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	};

	public genRanHexWithTimestamp = (size: number) => {
		const _coeff = 1 / Date.now();

		return [...Array(size)]
			.map(() => Math.floor(Math.random() * 16 * (1 - _coeff)).toString(16))
			.join('')
			.toUpperCase();
	};

	public replaceAccentedCharacters(_str: string) {
		return _str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
	}

	public buildGetParam = (_filterCriteria: Object): String | undefined => {
		let _rtn: string | undefined = undefined;
		const _params = Object.entries(_filterCriteria);
		_params.forEach((_el: Array<[string, any]>) => {
			let _val = '';
			const _key = _el[0];
			const _value = _el[1];
			if (_key && _value !== null && _value !== undefined) {
				if (typeof _el[1] == 'string') {
					_val = `${_el[0]}=${_el[1]}`;
				}
				if (typeof _el[1] == 'object') {
					_val = `${_el[0]}=[${_el[1]}]`;
				}
				// add param in link
				_rtn = !_rtn && _val ? _val : `${_rtn}&${_val}`;
			}
		});
		return _rtn;
	};

	/** Check if string value is a Nimber
	 * 	@param value string value
	 */
	public isInteger(value: string): boolean {
		return /^\d+$/.test(value);
	}

	/** Function for round number
	 * 	@param _value1 first value of operation
	 * @param _value2 second value of operation
	 * @param _operation operation type '+' or '-' or '*' or '/'
	 * @param _formatRange rounder range value
	 */
	public calcBetweenToService(
		_value1: any,
		_value2: any,
		_operation: '+' | '-' | '*' | '/',
		_formatRange?: number
	): { value: string | number; displayValue: string } | undefined {
		if (this.isNullOrEmpty(_value1) || !this.isInteger(_value1)) {
			return undefined;
		}
		if (this.isNullOrEmpty(_value2) || !this.isInteger(_value2)) {
			return undefined;
		}
		//
		let _val = undefined;
		switch (_operation) {
			case '+':
				_val = _value1 + _value2;
				break;
			case '*':
				_val = _value1 * _value2;
				break;
			case '/':
				_val = _value1 / _value2;
				break;
			default:
				_val = _value1 - _value2;
				break;
		}
		//
		return {
			displayValue: this.formatNumber(_val, _formatRange),
			value: _val
		};
	}

	/** Function for round number
	 */
	public roundNumber(_num: number, _scale: number): number {
		const _rounder = Math.pow(10, _scale);
		const _numRounded = Math.round((_num + Number.EPSILON) * _rounder) / _rounder;
		return _numRounded;
	}

	/** Function for get copyright value
	 * @param {string} year
	 * @returns {string} copyright value
	 */
	public getCopyrightYear(year: string): string {
		const currentYear = new Date().getFullYear().toString();
		return currentYear == year ? year : `${year} - ${currentYear}`;
	}
	/** Function for slepping in code */
	public sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	/** Function for open link in new tab */
	public openLinkInNewTab(link: string) {
		let url = '';
		if (!/^http[s]?:\/\//.test(link)) {
			url += 'http://';
		}
		url += link;
		window.open(url, '_blank');
	}
	/** Function for check if object is empty */
	public isObjectEmpty(obj: ArrayLike<unknown> | { [s: string]: unknown }) {
		return Object.entries(obj).length === 0 && obj.constructor === Object;
	}
	/** Function for check if value or object is null or undefined or empty
	 * @param value value to check
	 * @returns boolean "true" if value is null or undefined or empty
	 */
	public isNullOrEmpty(value: any): boolean {
		if (value && typeof value === 'object') {
			return Object.entries(value).length === 0 && value.constructor === Object;
		} else {
			return value === null || value === '' || value === undefined || value.length === 0;
		}
	}
	/** Get random color in collection */
	public getRandomColor(collection: any[]): string {
		const randomIndex = Math.floor(Math.random() * collection.length);
		return collection[randomIndex];
	}

	/** OBJECT AND ARRAY UTILITIES *********************************************
	 * Utility function for array manipulation **********************
	 * ***************************************************************/

	/** Function for add  */

	/* Trim all string contain into object */
	public trimAllStringInObject(obj: any): any {
		if (obj && typeof obj === 'object') {
			Object.keys(obj).map((key) => {
				if (typeof obj[key] === 'object') {
					this.trimAllStringInObject(obj[key]);
				} else if (typeof obj[key] === 'string') {
					obj[key] = obj[key].trim();
				}
			});
		}
		return obj;
	}

	/* Mettre à plat tous les array generique imbriqué  */
	public flatDeepList(arr: any, key: string) {
		return arr.reduce((acc: any, val: any) => acc.concat(Array.isArray(val[key]) ? this.flatDeepArray(val[key]) : val), []);
	}

	/* Mettre à plat tous les array role imbriqué  */
	public flatDeepArray(arr: any) {
		return arr.reduce((acc: any, val: any) => acc.concat(Array.isArray(val.datasAction) ? this.flatDeepArray(val.datasAction) : val), []);
	}

	/** Function for get intersection of two array with dynamique function
	 * @param array1: any[]
	 * @param array2: any[]
	 * @param functionToCompare: Function
	 * @returns any[]
	 * @example
	 * const array1 = [{id: 1}, {id: 2}, {id: 3}];
	 * const array2 = [{id: 2}, {id: 3}, {id: 4}];
	 * const functionToCompare = (a, b) => a.id === b.id;
	 * const intersection = Utilities.getIntersection(array1, array2, functionToCompare);
	 * // [{id: 2}, {id: 3}]
	 */
	public getIntersectionBy(arr1: any[], arr2: any[], fn: Function): any[] {
		return arr1.filter((item) => {
			return arr2.some((item2) => fn(item, item2));
		});
	}

	/** function for order array with other array */
	public orderArray(array: any[], orderArray: any[]) {
		const newArray: any[] = [];
		for (const item of orderArray) {
			const x = array.find((element) => element.key === item.key);
			if (x) {
				newArray.push(x);
			}
		}
		return newArray;
	}

	/** move one element in any position of array
	 * @param array: any[]
	 * @param item: any
	 * @param position: number
	 * @returns any[]
	 */
	public moveElementInArray(array: any[], item: any, position: number): any[] {
		const index = array.indexOf(item);
		if (index > -1 && index !== position) {
			array.splice(index, 1);
			array.splice(position, 0, item);
		}
		return array;
	}

	/** remove common element in two array
	 * @param baseArray array to filter
	 * @param refArray ref array
	 * @returns array without common element
	 */
	public removeCommonElement(baseArray: any[], refArray: any[]): any[] {
		return baseArray.filter((item) => {
			return refArray.indexOf(item) === -1;
		});
	}

	/** search in object list
	 * @param list list of object
	 * @param searchKey list of keys to search in
	 * @param searchValue value to search
	 * @param strictMode boolean to search in strict mode
	 * @returns list of object found
	 */
	public searchInObjectList(list: any[], searchKey: string[], searchValue: string, strictMode: boolean = false): any[] {
		return list.filter((obj) => {
			return searchKey.some((key) =>
				!strictMode
					? obj[key].toString().toLowerCase().includes(searchValue.toLowerCase())
					: obj[key].toString().toLowerCase() === searchValue.toLowerCase()
			);
		});
	}

	/** array of string to array of object */
	public arrayOfStringsToArrayOfObjects(arr: any[]) {
		const newArray: { label: any; value: any }[] = [];
		arr.forEach((element) => {
			newArray.push({
				label: element,
				value: element
			});
		});
		return newArray;
	}

	/** array of object to array of string */
	public arrayOfObjectToArrayOfStrings(obj: []) {
		const newArray: never[] = [];
		obj.forEach((element) => {
			newArray.push(element['value']);
		});
		return newArray;
	}

	/** Function for group JSON by criteria */
	public JSONgroupBy(array: any[], key: string | number) {
		return array.reduce(function (acc, obj) {
			var index = obj[key];
			if (!acc[index]) {
				acc[index] = [];
			}
			acc[index].push(obj);
			return acc;
		}, {});
	}

	/** DATE UTILITIES **************************************************
	 * Utility function for handle date manipulation *********************
	 * ********************************************************************/

	/** Get day, hour, minute from number of value
	 * @param value value to convert
	 * @param _unit unit of value 'SECOND' | 'MINUTE' | 'HOUR'; default = 'HOUR'
	 * @return string
	 */
	public getDayHourMinuteFromValue(_value: number, _unit: 'SECOND' | 'MINUTE' | 'HOUR' = 'HOUR'): string {
		// check if numberOfHours is a number
		if (_value == Infinity || isNaN(_value)) {
			return '--';
		}
		if (_value == 0) {
			return '0';
		}

		let day = null;
		let hour = null;
		let minute = null;
		let second = null;

		switch (_unit) {
			case 'SECOND':
				day = Math.floor(_value / 86400);
				hour = Math.floor((_value % 86400) / 3600);
				minute = Math.floor((_value % 3600) / 60);
				second = Math.floor(_value % 60);
				break;
			case 'MINUTE':
				day = Math.floor(_value / 1440);
				hour = Math.floor((_value % 1440) / 60);
				minute = Math.floor(_value % 60);
				second = Math.floor((_value % 1) * 60);
				break;
			default:
				day = Math.floor(_value / 24);
				hour = Math.floor(_value % 24);
				minute = Math.floor((_value % 1) * 60);
				break;
		}
		return day > 0
			? `${day}j ${hour}h ${minute}min${second ? ' ' + second + 's' : ''}`
			: hour > 0
			? `${hour}h ${minute}min${second ? ' ' + second + 's' : ''}`
			: minute > 0
			? `${minute}min${second ? ' ' + second + 's' : ''}`
			: `${second}s`;
	}

	/** Get day, hour, minute from number of hour */
	public getDayHourMinuteFromNumberOfHours(numberOfHours: number): string {
		// check if numberOfHours is a number
		if (numberOfHours == Infinity || isNaN(numberOfHours)) {
			return '--';
		}
		if (numberOfHours == 0) {
			return '0';
		}
		const day = Math.floor(numberOfHours / 24);
		const hour = Math.floor(numberOfHours % 24);
		const minute = Math.floor((numberOfHours % 1) * 60);
		return day > 0 ? `${day}j ${hour}h ${minute}min` : hour > 0 ? `${hour}h ${minute}min` : `${minute}min`;
	}

	/** Function translate DDMMYYYY in YYYYMMDD */
	public formatDDMMYYYYtoYYYYMMDD(date: string): string {
		if (date) {
			const dateArray = date.split('/');
			return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
		}
		return '';
	}

	/** Function for get now date in format yyyy-mm-dd */
	public dateToYYYYMMDD(date: Date) {
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let m = month < 10 ? '0' + month : month;
		let d = day < 10 ? '0' + day : day;
		return year + '-' + m + '-' + d;
	}

	/** Function for get now date in format dd-mm-yyyy */
	public dateToDDMMYYYY(date: Date) {
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		//
		let m = month < 10 ? '0' + month : month;
		let d = day < 10 ? '0' + day : day;
		return d + '/' + m + '/' + year;
	}

	/** Function for get now date in format yyyy-mm-dd hh:mm:ss */
	public dateToYYYYMMDDHHMMSS(date: Date) {
		const year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		let mn = month < 10 ? '0' + month : month;
		let d = day < 10 ? '0' + day : day;
		let hh = h < 10 ? '0' + h : h;
		let mm = m < 10 ? '0' + m : m;
		let ss = s < 10 ? '0' + s : s;
		return year + '-' + mn + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
	}

	/** Get difference between two date in day */
	public getDifferenceBetweenTwoDate(date1: string, date2: string, returnType: string): any {
		if (returnType === 'day') {
			const date1_ms = new Date(date1).getTime();
			const date2_ms = new Date(date2).getTime();
			const difference_ms = date2_ms - date1_ms;
			return Math.round(difference_ms / (1000 * 60 * 60 * 24));
		} else if (returnType === 'week') {
			const date1_ms = new Date(date1).getTime();
			const date2_ms = new Date(date2).getTime();
			const difference_ms = date2_ms - date1_ms;
			return Math.round(difference_ms / (1000 * 60 * 60 * 24 * 7));
		} else if (returnType === 'month') {
			const date1_ms = new Date(date1).getTime();
			const date2_ms = new Date(date2).getTime();
			const difference_ms = date2_ms - date1_ms;
			return Math.round(difference_ms / (1000 * 60 * 60 * 24 * 30));
		}
		return null;
	}

	/** Function for check if first date is after second date */
	public isFirstDateAfterLastDate(dateDebut: string, dateFin: string): boolean {
		if (dateDebut && dateFin) {
			const _dateDebut = new Date(dateDebut);
			const _dateFin = new Date(dateFin);
			if (_dateDebut > _dateFin) {
				return true;
			}
		}
		return false;
	}
	/**
	 *
	 * @param date
	 * @param days
	 * @param format  'dd/MM/yyyy' | 'yyyy-MM-dd' (default 'dd/MM/yyyy')
	 * @returns string
	 */
	public dateSubstract(date: Date, days: number, format: 'dd/MM/yyyy' | 'yyyy-MM-dd' = 'dd/MM/yyyy'): string {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() - days);
		return format == 'dd/MM/yyyy' ? this.dateToDDMMYYYY(newDate) : this.dateToYYYYMMDD(newDate);
	}

	/** STRING UTILITIES **************************************************
	 * Utility function for handle string manipulation *********************
	 * ********************************************************************/

	/** function for return value in k, m */
	public formatNumber(value: number, limitFrom?: number): string {
		value = parseInt(value.toString());
		if ((limitFrom && value >= limitFrom && value >= 1000000000) || (!limitFrom && value >= 1000000000)) {
			return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
		}
		if ((limitFrom && value >= limitFrom && value >= 1000000) || (!limitFrom && value >= 1000000)) {
			return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
		}
		if ((limitFrom && value >= limitFrom && value >= 1000) || (!limitFrom && value >= 1000)) {
			return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
		}
		return value.toString();
	}

	/* Fixed float number */
	public fixedTo(value: number, fix: number = 1): number {
		if (!value && fix < 0) return 0;
		return Number(value.toFixed(fix));
	}

	/** convert string to number */
	public stringToNumber(str: string) {
		return +str;
	}
	/** Function reverse string */
	public reverseString(texteValue: string) {
		return texteValue.split('').reverse().join('');
	}
	/** Function for capitalize string
	 * @param str string to capitalize
	 * @returns string
	 * @example
	 * const str = 'hello world';
	 * const capitalized = StringUtilities.capitalize(str);
	 * // Hello World
	 */
	public capitalize(value: string) {
		return value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1);
	}
	/** Function for title case string */
	public titleCase(value: string) {
		return value.replace(/\w\S*/g, (txt) => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	/** Function for titlecase sentence */
	public titleCaseSentence(str: string) {
		return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
	}

	/** Function for remove space in string */
	public removeSpace(value: string) {
		return value.replace(/\s/g, '');
	}
	/** Function for remove space in string */
	public removeSpaceAndSpecialChar(value: string) {
		return value.replace(/\s|[^a-zA-Z0-9]/g, '');
	}

	/** return english to french */
	public translateEngToFr(value: string): string {
		let french: any = {
			January: 'Janvier',
			February: 'Février',
			March: 'Mars',
			April: 'Avril',
			May: 'Mai',
			June: 'Juin',
			July: 'Juillet',
			August: 'Août',
			September: 'Septembre',
			October: 'Octobre',
			November: 'Novembre',
			December: 'Décembre',
			Monday: 'Lundi',
			Tuesday: 'Mardi',
			Wednesday: 'Mercredi',
			Thursday: 'Jeudi',
			Friday: 'Vendredi',
			Saturday: 'Samedi',
			Sunday: 'Dimanche',
			Today: "Aujourd'hui",
			Yesterday: 'Hier',
			Tomorrow: 'Demain',
			'Last 7 days': '7 derniers jours',
			'Last 30 days': '30 derniers jours',
			'Last month': 'Mois dernier',
			'Last year': 'Année dernière',
			day: 'jour',
			week: 'semaine',
			month: 'mois',
			year: 'année'
		};
		if (french[value]) {
			return french[value];
		} else {
			return value;
		}
	}

	/** VALIDATOR UTILITIES ************************************************************
	 * Utility of validator function for angular reactive form **************************
	 * *********************************************************************************/

	/** Forbidden name validator */
	public forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const forbidden = nameRe.test(control.value);
			return forbidden ? { forbiddenName: { value: control.value } } : null;
		};
	}
	/** Email Validator */
	public emailValidator(): ValidatorFn {
		return (control: AbstractControl) => {
			const regex = new RegExp(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			if (regex.test(control.value)) {
				return null;
			} else {
				return { emailError: true };
			}
		};
	}
	/** IP Validators */
	public adressIPValidator(): ValidatorFn {
		return (control: AbstractControl) => {
			const regex = new RegExp(
				/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
			);
			if (regex.test(control.value)) {
				return null;
			} else {
				return { ipError: true };
			}
		};
	}
	/** Password confirmation validator  with return custom message
	 * @param passwordFieldName The name of the password field
	 * @param confirmPasswordFieldName The name of the password confirmation field
	 * @param errorMessage The error message to return
	 * @returns A validator function
	 */
	public passwordConfirmValidatorWithMessage(
		passwordFieldName: string,
		confirmPasswordFieldName: string,
		errorMessage: string
	): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const password = control.get(passwordFieldName);
			const confirmPassword = control.get(confirmPasswordFieldName);
			if (password && confirmPassword && password.value !== confirmPassword.value) {
				return { passwordConfirmError: errorMessage };
			} else {
				return null;
			}
		};
	}
	/** Password confirmation validator
	 * @param passwordFieldName The name of the password field
	 * @param confirmPasswordFieldName The name of the password confirmation field
	 * @returns A validator function
	 */
	public passwordConfirmValidator(key: string, confirmationKey: string): ValidatorFn {
		return (control: AbstractControl) => {
			if (control.get(key)?.value === control.get(confirmationKey)?.value) {
				return null;
			} else {
				return { misMatch: true };
			}
		};
	}
	/** generic conditionnal formcontrol validator
	 * @param predicate : function to validate
	 * @param validator : validator to apply
	 * @returns validator function
	 */
	public conditionalValidator({ predicate, validator }: { predicate: Function; validator: ValidatorFn }): ValidatorFn {
		return (formControl) => {
			if (!formControl.parent) {
				return null;
			}
			if (predicate()) {
				return validator(formControl);
			}
			return null;
		};
	}

	/** Password strengh validator */
	public passwordStrenghValidator(control: AbstractControl): ValidationErrors | null {
		const password = control.value ? control.value : '';
		// check password length
		const _passLength = password.length >= 8;
		// check password has lowercase letter
		const _passLower = /[a-z]/.test(password);
		// check password has uppercase letter
		const _passUpper = /[A-Z]/.test(password);
		// check password has number
		const _passNumber = /\d/.test(password);
		// check password has special character
		const _passSpecial = /\W/.test(password);

		// check password has at least one of each
		const _passComplex = _passLength && _passLower && _passUpper && _passNumber && _passSpecial;

		if (_passComplex) {
			return null;
		} else {
			const _returnObject: any = {};
			!_passLength ? (_returnObject.pwdLength = true) : null;
			!_passLower ? (_returnObject.pwdLowerCase = true) : null;
			!_passUpper ? (_returnObject.pwdUpperCase = true) : null;
			!_passNumber ? (_returnObject.pwdHasNotNumber = true) : null;
			!_passSpecial ? (_returnObject.pwdSpecial = true) : null;
			!_passComplex ? (_returnObject.pwdComplex = true) : null;
			return _returnObject;
		}
	}

	/** Display invalid element of form */
	public findInvalidControls(_form: FormGroup) {
		const invalid = [];
		const controls = _form.controls;
		for (const name in controls) {
			if (controls[name].invalid) {
				invalid.push(name);
			}
		}
		return invalid;
	}
}
