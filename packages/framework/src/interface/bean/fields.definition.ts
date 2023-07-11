import { Identifier } from '../common/identifier';
import { IFieldDefinition } from './field.definition';

export interface IFieldsDefinition<T extends IFieldDefinition> {
  setField(name: Identifier, definition: T): this;
  getField(name: Identifier, defaultValue?: T): T;
  getFieldKeys(): Identifier[];
}
