import {ITask, ICategory} from '../general/interfaces';

export const EMPTY_TASKS: ITask[] = [
  {
    id: 0,
    description: 'TEST DESCRIPTION 1',
    category: 'TEST CATEGORY 1',
  },
  {
    id: 1,
    description: 'TEST DESCRIPTION 2',
    category: 'TEST CATEGORY 2',
  },
  {
    id: 2,
    description: 'TEST DESCRIPTION 3',
    category: 'TEST CATEGORY 3',
  },
  {
    id: 3,
    description: 'TEST DESCRIPTION 4',
    category: 'TEST CATEGORY 4',
  },
  {
    id: 4,
    description: 'TEST DESCRIPTION 5',
    category: 'TEST CATEGORY 5',
  },
  {
    id: 5,
    description: 'TEST DESCRIPTION 6',
    category: 'TEST CATEGORY 6',
  },
  {
    id: 6,
    description: 'TEST DESCRIPTION 7',
    category: 'TEST CATEGORY 7',
  },
  {
    id: 7,
    description: 'TEST DESCRIPTION 8',
    category: 'TEST CATEGORY 8',
  },
  {
    id: 8,
    description: 'TEST DESCRIPTION 9',
    category: 'TEST CATEGORY 9',
  },
];

export const EMPTY_CATEGORIES: ICategory[] = [
  {
    id: 0,
    name: 'TEST CATEGORY 1',
    subCategories: [
      {
        id: 0,
        name: 'TEST SUBCATEGORY 1',
      },
      {
        id: 1,
        name: 'TEST SUBCATEGORY 2',
      },
      {
        id: 2,
        name: 'TEST SUBCATEGORY 3',
      },
    ],
  },
  {
    id: 1,
    name: 'TEST CATEGORY 2',
    subCategories: [
      {
        id: 0,
        name: 'TEST SUBCATEGORY 1',
      },
      {
        id: 1,
        name: 'TEST SUBCATEGORY 2',
      },
      {
        id: 2,
        name: 'TEST SUBCATEGORY 3',
      },
    ],
  },
  {
    id: 2,
    name: 'TEST CATEGORY 3',
    subCategories: [
      {
        id: 0,
        name: 'TEST SUBCATEGORY 1',
      },
      {
        id: 1,
        name: 'TEST SUBCATEGORY 2',
      },
      {
        id: 2,
        name: 'TEST SUBCATEGORY 3',
      },
    ],
  },
];
