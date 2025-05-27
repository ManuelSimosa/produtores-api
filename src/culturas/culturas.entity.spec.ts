import { Cultura } from './culturas.entity';
import { Fazenda } from '../fazendas/fazendas.entity';

describe('Cultura Entity', () => {
  it('deve criar uma instância de Cultura com os valores esperados', () => {
    const fazenda = new Fazenda();
    fazenda.id = 'fazenda-uuid';
    fazenda.nome = 'Fazenda Teste';

    const cultura = new Cultura();
    cultura.id = 'cultura-uuid';
    cultura.fazendaId = fazenda.id;
    cultura.fazenda = fazenda;
    cultura.rubro = 'Milho';
    cultura.area = 100;
    cultura.safra = 2024;

    expect(cultura).toBeInstanceOf(Cultura);
    expect(cultura.id).toBe('cultura-uuid');
    expect(cultura.fazendaId).toBe('fazenda-uuid');
    expect(cultura.fazenda).toBe(fazenda);
    expect(cultura.rubro).toBe('Milho');
    expect(cultura.area).toBe(100);
    expect(cultura.safra).toBe(2024);
  });

  it('deve permitir instanciar sem valores definidos', () => {
    const cultura = new Cultura();
    expect(cultura).toBeInstanceOf(Cultura);
    expect(cultura.id).toBeUndefined();
    expect(cultura.fazendaId).toBeUndefined();
    expect(cultura.fazenda).toBeUndefined();
    expect(cultura.rubro).toBeUndefined();
    expect(cultura.area).toBeUndefined();
    expect(cultura.safra).toBeUndefined();
  });
});
