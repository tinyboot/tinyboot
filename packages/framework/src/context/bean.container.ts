import {IBeanContainer} from '../interface/context/bean.container'
import {IBeanDefinition} from '../interface/bean/bean.definition'
import {IFieldDefinition} from '../interface/bean/field.definition'
import {IMethodDefinition} from '../interface/bean/method.definition'
import {Identifier} from '../interface/common/identifier'

export  class BeanContainer< F extends IFieldDefinition, M extends IMethodDefinition,T extends IBeanDefinition<F,M>> implements IBeanContainer< F, M,T> {

  getBeanDefinitionByIdentifier() {
  }

  hasBeanDefinition(): boolean {
    return false
  }

  removeBeanDefinition() {
  }

  getBeanDefinition(identifier: Identifier): T {
    return undefined
  }

  getBeanDefinitionByName(name: string): T[] {
    return []
  }

  registerBeanDefinition(identifier: Identifier, beanDefinition: T) {
  }
}
