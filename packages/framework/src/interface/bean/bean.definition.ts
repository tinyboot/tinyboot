import { Identifier } from '../common/identifier';
import { Scope } from '../../enums/scope.enum';
import { IFieldsDefinition } from './fields.definition';
import { IFieldDefinition } from './field.definition';
import { IMethodsDefinition } from './methods.definition';
import { IMethodDefinition } from './method.definition';
import { BeanType } from '../../enums/bean-type.enum';

export interface IBeanDefinition<T extends IFieldDefinition, M extends IMethodDefinition> {
  /**
   * bean namespace
   * @type {string}
   * @memberof IBeanDefinition
   */
  namespace?: string;
  /**
   * bean identifier
   * @type {Identifier}
   * @memberof IBeanDefinition
   */
  identifier: Identifier;
  /**
   * bean class
   * @type {Identifier}
   * @memberof IBeanDefinition
   */
  uuid: Identifier;
  /**
   * bean scope
   * @type {Scope}
   * @memberof IBeanDefinition
   */
  scope: Scope;
  /**
   * bean name
   * @type {string}
   * @memberof IBeanDefinition
   */
  name: string;
  /**
   * bean type
   * @type {BeanType}
   * @memberof IBeanDefinition
   */
  type: BeanType;
  /**
   * bean is async
   * @type boolean
   * @memberOf IBeanDefinition
   */
  asynchronous: boolean;
  /**
   * bean target
   * @type {*}
   * @memberof IBeanDefinition
   */
  target: any;
  /**
   * bean path
   * @type {string}
   * @memberof IBeanDefinition
   */
  path: string;
  /**
   * inject fields
   * @type {IFieldsDefinition<T extends IFieldDefinition>}
   * @memberof IBeanDefinition
   */
  fields: IFieldsDefinition<T>;
  /**
   * inject methods
   * @type {IMethodsDefinition<M extends IMethodDefinition>}
   * @memberof IBeanDefinition
   */
  methods: IMethodsDefinition<M>;
  /**
   * register hook
   * @param target
   * @param options
   */
  registerHook?: (target: any, options?: Partial<IBeanDefinition<IFieldDefinition, IMethodDefinition>>) => void;
  isAsync(): boolean;
  isSingletonScope(): boolean;
  isRequestScope(): boolean;
}
