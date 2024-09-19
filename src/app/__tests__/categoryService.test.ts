import { getCategories } from '../../services/categoryService'; 
import categoriesData from '../../data/categories.json';

describe('getCategories', () => {
  test('should return the correct categories data', async () => {
    const result = await getCategories();
    expect(result).toEqual(categoriesData);
  });
});
