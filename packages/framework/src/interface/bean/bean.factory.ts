import { IFieldDefinition } from './field.definition';
import { IMethodDefinition } from './method.definition';
import { IBeanDefinition } from './bean.definition';

export interface IBeanFactory<F extends IFieldDefinition, M extends IMethodDefinition, B extends IBeanDefinition<F, M>> {
  create<T>(definition: B): T;
  createAsync<T>(definition: B): Promise<T>;
}
