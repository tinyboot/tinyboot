import { Identifier } from '../interface/common/identifier';
import { IBeanRelation } from '../interface/bean/bean.relation';

export class BeanRelationships extends Map<Identifier, string> implements IBeanRelation {
  getRelation(identifier: Identifier): string {
    return '';
  }

  hasRelation(identifier: Identifier): boolean {
    return false;
  }

  saveClassRelation(target: any, namespace?: string) {}

  saveFactoryRelation(identifier: Identifier, uuid: string) {}
}
