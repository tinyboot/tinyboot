import { MethodAccessMetadata } from './method-access.metadata';

export interface MethodMetadata {
  /**
   * private field or not
   * @type {boolean}
   * @memberof FieldMetadata
   */
  private?: boolean;
  /**
   * static field or not
   * @type {boolean}
   * @memberof FieldMetadata
   */
  static?: boolean;
  /**
   * context access
   * @type {FieldAccessMetadata}
   * @memberof FieldMetadata
   */
  access?: MethodAccessMetadata;
  /**
   * The name of the method.
   * @type  {string}
   * @memberOf MethodMetadata
   * @example "init"
   */
  propertyKey: string;
  /**
   * The parameter of method.
   * @type {any[]}
   */
  params?: any[];
  /**
   * The target of method.
   * @param args
   * @returns {any}
   */
  target: (...args: any[]) => any;
}
