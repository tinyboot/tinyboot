import { Identifier } from '../interface/common/identifier';
import { IIdentifierRelation } from '../interface/bean/identifier.relation';

export class IdentifierRelationships extends Map<Identifier, string> implements IIdentifierRelation {
  getRelation(identifier: Identifier): string {
    return '';
  }

  hasRelation(identifier: Identifier): boolean {
    return false;
  }

  saveClassRelation(target: any, namespace?: string) {}

  saveFactoryRelation(identifier: Identifier, uuid: string) {}
}
