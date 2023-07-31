/**
 * SERVICE SPECIFIQUE A TAILWIND !!!!!!
 * Customized for handle dark mode switch with tailwind css
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class UiThemeService {
	private _themePrefStorageKey = 'MYFACTUREt8dEHeaVf94HXqdsP3NE';
	private _valueObs: BehaviorSubject<'light' | 'dark'> = new BehaviorSubject<'light' | 'dark'>('light');
	public themePref = this._valueObs.asObservable();

	constructor(private _storageService: StorageService) {}
	/**
	 * Get current theme preference
	 * @returns 'light' | 'dark'
	 */
	public getThemePref(): 'light' | 'dark' {
		const _valSetted = this._storageService.getUserPreferences(this._themePrefStorageKey);
		this._valueObs.next(_valSetted ? _valSetted : 'light');
		return _valSetted ? _valSetted : 'light';
	}
	/**
	 * Handle current theme preference
	 */
	public handleThemePreference(): void {
		const _valSetted = this._storageService.getUserPreferences(this._themePrefStorageKey);
		//
		const _class = _valSetted ? _valSetted : 'light';
		const _html: HTMLElement | null = document.querySelector('html');
		if (_class === 'dark') {
			_html?.classList.add('dark');
			_html?.setAttribute('data-theme', _class);
		} else {
			_html?.classList.remove('dark');
			_html?.setAttribute('data-theme', 'light');
		}
	}
	/**
	 * Toggle theme preference
	 */
	public toggleTheme(): void {
		const _valSetted = this._storageService.getUserPreferences(this._themePrefStorageKey);
		const _newValue = _valSetted && _valSetted === 'light' ? 'dark' : 'light';
		this._storageService.saveUserPreferences(this._themePrefStorageKey, _newValue);
		this.handleThemePreference();
	}
}
