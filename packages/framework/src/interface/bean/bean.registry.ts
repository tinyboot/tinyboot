import { IBeanDefinition } from './bean.definition';
import { IFieldDefinition } from './field.definition';
import { IMethodDefinition } from './method.definition';
import { Identifier } from '../common/identifier';

export interface IIdentifierRelation {
  saveClassRelation(target: any, namespace?: string);
  saveFactoryRelation(identifier: Identifier, uuid: string);
  hasRelation(identifier: Identifier): boolean;
  getRelation(identifier: Identifier): string;
}

export interface IBeanRegistry<F extends IFieldDefinition, M extends IMethodDefinition, T extends IBeanDefinition<F, M>> {
  identifierRelation: IIdentifierRelation;
  registerBeanDefinition(identifier: Identifier, beanDefinition: T);
  getBeanDefinition(identifier: Identifier): T;
  removeBeanDefinition(identifier: Identifier);
  hasBeanDefinition(identifier: Identifier): boolean;
}
