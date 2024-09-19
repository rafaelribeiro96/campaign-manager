import { getCategories } from '../../services/categoryService';
import categoriesData from '../../data/categories.json';

describe('getCategories', () => {
  test('deve retornar os dados de categorias corretos', async () => {
    const result = await getCategories();
    expect(result).toEqual(categoriesData);
  });
});
