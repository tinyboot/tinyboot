import { Identifier } from '../interface/common/identifier';
import { IMethodsDefinition } from '../interface/bean/methods.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';

export class MethodsDefinition<T extends IMethodDefinition> extends Map<Identifier, T> implements IMethodsDefinition<T> {
  getMethod(name: Identifier, defaultValue?: T): T {
    if (this.has(name)) {
      return this.get(name);
    }
    return defaultValue;
  }

  getMethodKeys(): Identifier[] {
    return Array.from(this.keys());
  }

  setMethod(name: Identifier, method: T): this {
    return this.set(name, method);
  }
}
