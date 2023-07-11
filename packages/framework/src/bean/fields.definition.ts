import { IFieldsDefinition } from '../interface/bean/fields.definition';
import { Identifier } from '../interface/common/identifier';
import { IFieldDefinition } from '../interface/bean/field.definition';

export class FieldsDefinition<T extends IFieldDefinition> extends Map<Identifier, T> implements IFieldsDefinition<T> {
  getField(name: Identifier, defaultValue?: T): T {
    if (this.has(name)) {
      return this.get(name);
    }
    return defaultValue;
  }
  getFieldKeys(): Identifier[] {
    return Array.from(this.keys());
  }
  setField(name: Identifier, definition: T): this {
    return this.set(name, definition);
  }
}
