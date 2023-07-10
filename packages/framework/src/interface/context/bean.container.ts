import {IBeanDefinition} from '../bean/bean.definition'
import {IFieldDefinition} from '../bean/field.definition'
import {IMethodDefinition} from '../bean/method.definition'
import {Identifier} from '../common/identifier'
import {ClassType} from '../common/type'

export interface IBeanContainer<F extends IFieldDefinition,M extends IMethodDefinition,T extends IBeanDefinition<F,M>> {
  registerBeanDefinition(identifier:Identifier,beanDefinition: T)
  getBeanDefinition(identifier:Identifier):T
  getBeanDefinitionByName(name:string):T[]
  removeBeanDefinition(identifier:Identifier)
  hasBeanDefinition(identifier:Identifier):boolean
}
