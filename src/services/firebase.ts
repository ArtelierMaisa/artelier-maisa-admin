import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import { envs } from '../config';

const firebaseConfig = {
  apiKey: envs.apiKey,
  authDomain: envs.authDomain,
  databaseURL: envs.databaseURL,
  projectId: envs.projectId,
  storageBucket: envs.storageBucket,
  messagingSenderId: envs.messagingSenderId,
  appId: envs.appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, database, auth };