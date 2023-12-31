import { IBeanRegistry } from '../interface/bean/bean.registry';
import { IBeanDefinition } from '../interface/bean/bean.definition';
import { IFieldDefinition } from '../interface/bean/field.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';
import { Identifier } from '../interface/common/identifier';
import { IIdentifierRelation } from '../interface/bean/identifier.relation';
import { IdentifierRelationships } from './identifier.relation';
import { IApplicationContext } from '../interface/context/application-context';

export class BeanRegister<F extends IFieldDefinition, M extends IMethodDefinition, T extends IBeanDefinition<F, M>> implements IBeanRegistry<F, M, T> {
  // private singletons: IBeanDefinition<F, M> = [];
  private _identifierRelation: IIdentifierRelation;
  private identifierBeanDefinitions: Map<Identifier, IBeanDefinition<F, M>> = new Map();
  getBeanDefinitionByIdentifier() {}

  hasBeanDefinition(): boolean {
    return false;
  }

  removeBeanDefinition() {}

  getBeanDefinition(identifier: Identifier): T {
    return undefined;
  }

  registerBeanDefinition(identifier: Identifier, beanDefinition: T) {}
}
