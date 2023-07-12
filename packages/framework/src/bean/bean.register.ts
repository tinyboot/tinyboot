import { IBeanRegistry } from '../interface/bean/bean.registry';
import { IBeanDefinition } from '../interface/bean/bean.definition';
import { IFieldDefinition } from '../interface/bean/field.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';
import { Identifier } from '../interface/common/identifier';
import { IBeanRelation } from '../interface/bean/bean.relation';

export class BeanRegister<F extends IFieldDefinition, M extends IMethodDefinition, T extends IBeanDefinition<F, M>> implements IBeanRegistry<F, M, T> {
  // private singletons: IBeanDefinition<F, M> = [];
  private _identifierRelation;
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

  get beanRelation(): IBeanRelation {
    return this._identifierRelation;
  }

  set beanRelation(value: IBeanRelation) {
    this._identifierRelation = value;
  }
}
