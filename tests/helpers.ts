import { Indexable } from '$/domain/generics/indexable';
import { InsertQueryBuilder, SelectQueryBuilder } from 'typeorm';

export const mockInsertQueryBuilder = <T = Indexable>(
  execute: jest.Mock<InsertQueryBuilder<T>['execute']> = jest.fn(),
): SelectQueryBuilder<T> => ({
  insert: () => ({ into: () => ({ values: () => ({ execute }) }) }),
} as unknown as SelectQueryBuilder<T>);
