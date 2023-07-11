import { Identifier } from '../common/identifier';
import { IMethodDefinition } from './method.definition';

export interface IMethodsDefinition<T extends IMethodDefinition> {
  setMethod(name: Identifier, method: T): this;
  getMethod(name: Identifier, defaultValue?: T): T;
  getMethodKeys(): Identifier[];
}
