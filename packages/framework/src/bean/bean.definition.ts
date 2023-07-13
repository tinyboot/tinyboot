import { Identifier } from '../interface/common/identifier';
import { IBeanDefinition } from '../interface/bean/bean.definition';
import { IFieldDefinition } from '../interface/bean/field.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';
import { FieldsDefinition } from './fields.definition';
import { MethodsDefinition } from './methods.definition';
import { Scope } from '../enums/scope.enum';
import { BeanType } from '../enums/bean-type.enum';

export class BeanDefinition implements IBeanDefinition<IFieldDefinition, IMethodDefinition> {
  namespace: string;
  asynchronous = false;
  identifier: Identifier = null;
  uuid: Identifier;
  name: string;
  scope: Scope;
  type: BeanType;
  target: any;
  path: string;
  fields = new FieldsDefinition();
  methods = new MethodsDefinition();
  isAsync(): boolean {
    return this.asynchronous;
  }
  isRequestScope(): boolean {
    return this.scope === Scope.Request;
  }
  isSingletonScope(): boolean {
    return this.scope === Scope.Singleton;
  }
  registerHook?: (bean: any) => void;
}
