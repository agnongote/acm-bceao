// import { IConfig } from 'ngx-mask';

/** global configuration for input mask */
export const MASK_GLOBAL_CONFIG: Partial<any> = {
	specialCharacters: ['-', '/', '(', ')', '.', ':', ' ', '+', ',', '@', '[', ']', '"', "'"],
	validation: false,
	patterns: {
		'0': {
			pattern: new RegExp('\\d')
		},
		'9': {
			pattern: new RegExp('\\d'),
			optional: true
		},
		X: {
			pattern: new RegExp('\\d'),
			symbol: '*'
		},
		Z: { pattern: new RegExp('[A-Z]') },
		A: {
			pattern: new RegExp('[a-zA-Z0-9]')
		},
		S: {
			pattern: new RegExp('[a-zA-Z]')
		},
		d: {
			pattern: new RegExp('\\d')
		},
		m: {
			pattern: new RegExp('\\d')
		},
		M: {
			pattern: new RegExp('\\d')
		},
		H: {
			pattern: new RegExp('\\d')
		},
		h: {
			pattern: new RegExp('\\d')
		},
		s: {
			pattern: new RegExp('\\d')
		},
		p: {
			pattern: new RegExp(
				'(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
			)
		}
	}
};
/**
 *
 */
export type FilterSelect = {
	datas: any[];
	loading: boolean;
};
/**
 * Fonctionnalités modules principales
 */
export const MODULES_LIST: any[] = [
	{
		name: 'accueil',
		displayAction: 'view_accueil',
		label: 'Accueil',
		link: '/accueil',
		isDisplay: true
	},
	{
		name: 'sites',
		displayAction: 'view_sites',
		label: 'Sites',
		link: '/sites',
		isDisplay: true
	},
	{
		name: 'access-point',
		displayAction: 'view_access_point',
		label: 'Points Daccès',
		link: '/access-point',
		isDisplay: true
	},
	{
		name: 'wifi',
		displayAction: 'view_wifi',
		label: 'WiFi',
		link: '/wifi',
		isDisplay: true
	},
	{
		name: 'monitoring',
		displayAction: 'view_monitoring',
		label: 'Monitoring',
		link: '/monitoring',
		isDisplay: true
	}
	// {
	// 	name: 'kpi',
	// 	displayAction: 'view_kpi',
	// 	label: 'KPI',
	// 	link: '/kpi',
	// 	isDisplay: true
	// },
	// {
	// 	name: 'alarm',
	// 	displayAction: 'view_alarm',
	// 	label: 'Alarmes',
	// 	link: '/alarm',
	// 	isDisplay: true
	// }
];
/**
 * Language option for highchart
 */
export const HIGHCHART_LANG_OPTIONS = {
	printChart: 'Imprimer',
	viewFullscreen: 'Voir en plein écran',
	exitFullscreen: 'Quitter le plein écran',
	contextButtonTitle: 'Menu',
	downloadCSV: 'Exporter sous CSV',
	downloadJPEG: 'Exporter sous JPEG',
	downloadPDF: 'Exporter sous PDF',
	downloadPNG: 'Exporter sous PNG',
	downloadSVG: 'Exporter sous SVG',
	downloadXLS: 'Exporter sous Excel'
};
/**
 * Highchart full color scheme
 */
export const FULL_COLORS_LIST = [
	'#ff7900',
	'#4bb4e6',
	'#333333',
	'#50be87',
	'#ffd200',
	'#ffb400',
	'#ffb4e6',
	'#ff8ad4',
	'#f06559',
	'#492191',
	'#A94719',
	'#D12AD3',
	'#748A15',
	'#666666',
	'#A85856',
	'#126995',
	'#54A9B3',
	'#76565F',
	'#dc3545',
	'#085ebd',
	'#D45124',
	'#0a6e31'
];
/**
 * Highchart graph color scheme
 */
export const GRAPH_COLOR_SCHEME = [
	'#ff7900',
	'#492191',
	'#50be87',
	'#4bb4e6',
	'#ffd200',
	'#ffb4e6',
	'#333333',
	'#085ebd',
	'#ff8ad4',
	'#0a6e31',
	'#492191',
	'#ffb400'
];

export const FACTURE_STATE_LABEL = {
	UNPAID: 'Impayé',
	PAID: 'Réglé',
	NEW: 'Nouveau'
};


export const FACTURE_STATE_LABEL_EN = {
	UNPAID: 'Unpaid',
	PAID: 'Paid',
	NEW: 'New'
};
export const FACTURE_STATES = [
	{
		code: 'NEW',
		libelle: 'Nouveau',
		libelle_en: 'New',
	},
	{
		code: 'PAID',
		libelle: 'Réglé',
		libelle_en: 'Paid',
	},
	{
		code: 'UNPAID',
		libelle: 'Impayé',
		libelle_en: 'Unpaid'
	}
];

export const FILE_NOT_FOUND_BASE_64: string =
	'data:image/png;base64,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';

export const LANGUAGES_LIST: any[] = [
	{ localeCode: 'fr', label: 'Fr', libelle: 'Français' },
	{ localeCode: 'en', label: 'En', libelle: 'English' }
];

export const LANG_LOCAL_STORAGE_KEY: string = 'OCI_MY_FACTURE_LANG';


export const SERVICE_CODE_FROM_UNIVERS : any = {
	Internet: 'FIBRE',
	Mobile: 'MOBILE',
	Fixe: 'ADSL'
};
