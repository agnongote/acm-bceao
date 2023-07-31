const baseURL = location.origin;

export const environment = {
	production: false,
	encrypted: false,
	errorGlobalHandle: true,
	urlCoreAPI: baseURL + "/acm-bceao",
	urlOSM: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};