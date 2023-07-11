import { IFieldDefinition } from '../interface/bean/field.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';
import { IBeanDefinition } from '../interface/bean/bean.definition';
import { IBeanFactory } from '../interface/bean/bean.factory';

export class BeanFactory implements IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>> {
  constructor() {}

  create<T>(definition: IBeanDefinition<IFieldDefinition, IMethodDefinition>): T {
    return undefined;
  }

  createAsync<T>(definition: IBeanDefinition<IFieldDefinition, IMethodDefinition>): Promise<T> {
    return Promise.resolve(undefined);
  }
}
