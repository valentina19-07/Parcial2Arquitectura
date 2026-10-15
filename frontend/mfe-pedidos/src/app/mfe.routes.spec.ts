import { MFE_ROUTES } from './mfe.routes';

describe('MFE_ROUTES', () => {
  it('registra el repositorio, los 3 casos de uso y la página', () => {
    const raiz = MFE_ROUTES[0];
    expect(raiz.providers?.length).toBe(4);
    expect(raiz.children?.length).toBe(1);
  });
});
