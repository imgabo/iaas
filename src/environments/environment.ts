// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authUrl : 'http://localhost:8080/auth/',
  statusUrl : 'http://localhost:8080/user/',
  servicioURL : 'http://localhost:8080/servicios/',
  dipURL : 'http://localhost:8080/dip/',
  procedimientosCirugiasURL : 'http://localhost:8080/procedimientoscirugias/',
  tipoHeridasURL : 'http://localhost:8080/tipoheridas/',
  microorganismosURL : 'http://localhost:8080/microorganismos/',
  localizacionesURL : 'http://localhost:8080/localizaciones/',
  iarepisURL : 'http://localhost:8080/iarepis/',
  paasURL : 'http://localhost:8080/paas/',
  pacientesURL : 'http://localhost:8080/pacientes/',
  dipVigilanciasURL : 'http://localhost:8080/vigilancias-dips/',
  comentarioDipURL : 'http://localhost:8080/comentariosdips/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
