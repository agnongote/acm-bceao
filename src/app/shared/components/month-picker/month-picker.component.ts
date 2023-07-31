import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

export type MonthItem = {
	number: number;
	label: string;
	fullLabel: string;
	year: string | number;
};

@Component({
	selector: 'ilph-month-picker',
	templateUrl: './month-picker.component.html',
	styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit, OnChanges {
	/**
	 *
	 */
	@Input() local: 'fr' | 'en' = 'fr';
	@Output() returnItems: EventEmitter<MonthItem[] | []> = new EventEmitter();
	/**
	 *
	 */
	public currentYear: number;
	public currentMonth: string;
	public eraseLabel: string;
	public months: any[];
	public selectedMonth: any[] = [];
	public selectedItems: any[] = [];
	/**
	 *
	 */
	private now = new Date();
	/**
	 *
	 */
	DICO: any = {
		en: {
			months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			eraseLabel: 'Clear selection'
		},
		fr: {
			months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
			eraseLabel: 'Effacer la sélection'
		}
	};

	constructor() {
		this.currentYear = this.now.getFullYear();
		this.currentMonth = this.getCurrentFromLocal();
		this.months = this.buildMonthOfYear();
		this.eraseLabel = this.DICO[this.local].eraseLabel;
	}
	ngOnChanges(changes: SimpleChanges): void {
		this.currentYear = this.now.getFullYear();
		this.currentMonth = this.getCurrentFromLocal();
		this.months = this.buildMonthOfYear();
		this.eraseLabel = this.DICO[this.local].eraseLabel;
	}

	ngOnInit(): void {}

	public handleClickAction(_m: any): void {
		const isUnselectAction: number = this.selectedItems.findIndex((_item) => _item.fullLabel === _m.fullLabel);
		if (isUnselectAction > -1) {
			this.selectedItems.splice(isUnselectAction, 1);
			this.selectedMonth.splice(isUnselectAction, 1);
		} else {
			this.selectedItems.push(_m);
			this.selectedMonth.push(_m.number + _m.year);
		}
		this.returnItems.emit(this.selectedItems);
	}

	public onPreviousYear() {
		this.currentYear = this.currentYear - 1;
		this.months = this.buildMonthOfYear();
	}
	public onNextYear() {
		this.currentYear = this.currentYear + 1;
		this.months = this.buildMonthOfYear();
	}

	private buildMonthOfYear(): MonthItem[] {
		return this.DICO[this.local] && this.DICO[this.local].months
			? this.DICO[this.local].months.map((_item: string, _index: number) => {
					return {
						number: _index,
						label: _item,
						fullLabel:
							this.local === 'fr'
								? (_index + 1).toString().padStart(2, '0') + '/' + this.currentYear
								: this.currentYear + '-' + (_index + 1).toString().padStart(2, '0'),
						year: this.currentYear
					};
			  })
			: [];
	}

	private getCurrentFromLocal() {
		return this.local === 'fr'
			? `${(this.now.getMonth() + 1).toString().padStart(2, '0')}/${this.currentYear}`
			: `${this.currentYear}-${(this.now.getMonth() + 1).toString().padStart(2, '0')}`;
	}

	public clear() {
		this.selectedItems = [];
		this.selectedMonth = [];
		this.returnItems.emit(this.selectedItems);
	}
}
