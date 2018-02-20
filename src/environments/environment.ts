// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDKUcbHvI4C1fMfP8wzB_Wn-fR-BwQ9hJ4",
    authDomain: "oms-auat.firebaseapp.com",
    databaseURL: "https://oms-auat.firebaseio.com",
    projectId: "oms-auat",
    storageBucket: "oms-auat.appspot.com",
    messagingSenderId: "118810988506"
  }
};
