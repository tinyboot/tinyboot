import { IBeanFactory } from '../bean/bean.factory';
import { IFieldDefinition } from '../bean/field.definition';
import { IMethodDefinition } from '../bean/method.definition';
import { IBeanDefinition } from '../bean/bean.definition';
import { IBeanRegistry } from '../bean/bean.registry';

export interface IApplicationContext {
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
  parent: this;
  // bind<T>(Identifier: Identifier | ClassType, instance: T): void;
  // get<T>(Identifier: Identifier | ClassType): T;
  // getAsync<T>(Identifier: Identifier | ClassType): Promise<T>;
}
