import { initFederation } from '@angular-architects/native-federation';

initFederation('/assets/federation.manifest.json')
  .catch((err) => console.error('Error initFederation:', err))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error('Error bootstrap:', err));
