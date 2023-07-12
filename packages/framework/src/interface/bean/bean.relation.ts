import { Identifier } from '../common/identifier';

export interface IBeanRelation {
  saveClassRelation(target: any, namespace?: string);

  saveFactoryRelation(identifier: Identifier, uuid: string);

  hasRelation(identifier: Identifier): boolean;

  getRelation(identifier: Identifier): string;
}
