import { Identifier } from '../common/identifier';
import { Scope } from '../../enums/scope.enum';
import { IFieldsDefinition } from './fields.definition';
import { IFieldDefinition } from './field.definition';
import { IMethodsDefinition } from './methods.definition';
import { IMethodDefinition } from './method.definition';

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
   * bean target
   * @type {*}
   * @memberof IBeanDefinition
   */
  _target: any;
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
  isAsync(): boolean;
  isSingletonScope(): boolean;
  isRequestScope(): boolean;
}
