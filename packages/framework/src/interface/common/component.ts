import { Identifier } from './identifier';
import { Scope } from '../../enums/scope.enum';
import { IApplicationContext } from '../context/application-context';

export interface IComponent {
  /**
   * component identifier
   * @type {Identifier}
   * @memberof IComponent
   */
  identifier: Identifier;
  /**
   * component provider
   * @param context
   * @returns {any}
   */
  provider: (context?: IApplicationContext) => any;
  /**
   * component scope
   * @type {Scope}
   * @memberof IComponent
   */
  scope?: Scope;
}
