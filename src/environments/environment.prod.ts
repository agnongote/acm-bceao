const baseURL = location.origin;

export const environment = {
	production: true,
	encrypted: true,
	errorGlobalHandle: true,
	urlCoreAPI: baseURL + '/api/acm-bceao',
	urlOSM: origin + '/osm/{z}/{x}/{y}.png',
};
