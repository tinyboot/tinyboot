import { IBeanFactory } from '../bean/bean.factory';
import { IFieldDefinition } from '../bean/field.definition';
import { IMethodDefinition } from '../bean/method.definition';
import { IBeanDefinition } from '../bean/bean.definition';
import { IBeanRegistry } from '../bean/bean.registry';
import { IIdentifierRelation } from '../bean/identifier.relation';
import { Identifier } from '../common/identifier';

export interface IApplicationContext {
  identifierRelation: IIdentifierRelation;
  /**
   * bean factory
   * @type {IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>}
   * @memberof IApplicationContext
   */
  beanFactory: IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>;
  /**
   * bean registry
   * @type {IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>}
   * @memberof IApplicationContext
   */
  beanRegistry: IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>;
  /**
   * parent application context
   */
  parent: IApplicationContext;

  hasValue(identifier: Identifier): boolean;

  getValue<T>(identifier: Identifier): T;

  setValue<T>(identifier: Identifier, value: T): void;
}
