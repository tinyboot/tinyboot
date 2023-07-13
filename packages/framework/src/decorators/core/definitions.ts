import { createDecorator } from '../factory';
import { ClassFieldDecoratorFunction } from '../../interface/decorators/decorator';

export interface InitDecorator {
  /**
   * initialize
   * @example
   * ```typescript
   * @Init()
   * private init() {}
   */
  (): ClassFieldDecoratorFunction<any, any, any>;

  /**
   * initialize
   * @param target
   * @param context
   * @example
   * ```typescript
   * @Init
   * private init() {}
   */
  (target: any, context: ClassFieldDecoratorContext): void;
}
export const Init = createDecorator((target, context, args) => {
  console.log('进来了', target, context, args);
});
