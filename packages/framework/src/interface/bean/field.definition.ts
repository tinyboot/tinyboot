import { FieldAccessMetadata } from '../decorators/metadata/field-access.metadata';
import { Identifier } from '../common/identifier';
import { InjectMode } from '../../enums/inject-mode.enum';

export interface IFieldDefinition {
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
  access?: FieldAccessMetadata;
  /**
   * property key
   * @type {Identifier}
   * @memberof FieldMetadata
   */
  propertyKey?: Identifier;
  /**
   * inject identifier
   * @type {Identifier}
   * @memberof FieldMetadata
   */
  identifier?: Identifier;
  /**
   * inject mode
   * @type {InjectMode}
   * @memberof FieldMetadata
   */
  injectMode?: InjectMode;
}
