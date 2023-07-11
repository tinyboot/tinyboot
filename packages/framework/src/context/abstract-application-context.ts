import { IBeanDefinition } from '../interface/bean/bean.definition';
import { IFieldDefinition } from '../interface/bean/field.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';
import { IApplicationContext } from '../interface/context/application-context';
import { IBeanRegistry } from '../interface/bean/bean.registry';
import { IBeanFactory } from '../interface/bean/bean.factory';
import { BeanFactory } from '../bean/bean.factory';
import { Identifier } from '../interface/common/identifier';
import { BeanRegister } from '../bean/bean.register';

export abstract class AbstractApplicationContext implements IApplicationContext {
  parent: this;
  private values: Map<Identifier, any> = new Map();
  private _beanRegistry: IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>;
  private _beanFactory: IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>;
  get beanRegistry(): IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>> {
    if (!this._beanRegistry) {
      this._beanRegistry = new BeanRegister();
    }
    return this._beanRegistry;
  }
  set beanRegistry(value: IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>) {
    this._beanRegistry = value;
  }
  get beanFactory(): IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>> {
    if (!this._beanFactory) {
      this._beanFactory = new BeanFactory();
    }
    return this._beanFactory;
  }
  set beanFactory(value: IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>) {
    this._beanFactory = value;
  }
}
