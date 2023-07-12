import { IBeanDefinition } from './bean.definition';
import { IFieldDefinition } from './field.definition';
import { IMethodDefinition } from './method.definition';
import { Identifier } from '../common/identifier';
import { IIdentifierRelation } from './identifier.relation';

export interface IBeanRegistry<F extends IFieldDefinition, M extends IMethodDefinition, T extends IBeanDefinition<F, M>> {
  registerBeanDefinition(identifier: Identifier, beanDefinition: T);

  getBeanDefinition(identifier: Identifier): T;

  removeBeanDefinition(identifier: Identifier);

  hasBeanDefinition(identifier: Identifier): boolean;
}
