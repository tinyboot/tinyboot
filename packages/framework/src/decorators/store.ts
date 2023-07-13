import { SymbolMetadata } from '../utils/symbol.utils';
import { ProviderMetadata } from '../interface/decorators/metadata/provide.metadata';
import { DecoratorTarget } from '../interface/decorators/decorator';
import { Identifier, isIdentifier } from '../interface/common/identifier';
import { INJECT_DECORATOR, INJECT_FIELD_DECORATOR, INJECT_METHOD_DECORATOR, PROVIDE_DECORATOR } from './constant';
import { generateUUID } from '../utils/uui.utils';
import { camelCase } from '../utils/camelcase.utils';
import { InjectMode } from '../enums/inject-mode.enum';
import { Types } from '../utils/types.utils';
import { FieldMetadata } from '../interface/decorators/metadata/field.metadata';
import { MethodMetadata } from '../interface/decorators/metadata/method.metadata';

export namespace Store {
  import isPrimitiveType = Types.isPrimitiveType;
  import isClass = Types.isClass;
  const storeMap = new WeakMap<DecoratorMetadataObject, any>();
  const getDecoratorMetadata = (target: DecoratorTarget): DecoratorMetadataObject => {
    if (target[SymbolMetadata]) {
      target = target[SymbolMetadata];
    } else if ((target as DecoratorContext)?.metadata) {
      target = (target as DecoratorContext).metadata;
    }
    return target as DecoratorMetadata;
  };
  const getDataContainer = (target: DecoratorMetadataObject): Map<Identifier, any> => {
    let dataMap;
    if (!storeMap.has(target)) {
      dataMap = new Map<Identifier, any>();
      storeMap.set(target, dataMap);
    } else {
      dataMap = storeMap.get(target);
    }
    return dataMap;
  };
  export function getMetadataKeys(target: DecoratorTarget) {
    return Array.from(getDataContainer(getDecoratorMetadata(target)).keys());
  }

  export function getTargetMetadata(target: DecoratorTarget) {
    return getDataContainer(getDecoratorMetadata(target));
  }

  export function saveMetadata(target: DecoratorTarget, decorator: Identifier, data: any) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    dataContainer.set(decorator, data);
  }

  export function getMetadata(target: DecoratorTarget, decorator: Identifier) {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    return dataContainer.get(decorator);
  }

  export function hasMetadata(target: DecoratorTarget, decorator: Identifier): boolean {
    const dataContainer = getDataContainer(getDecoratorMetadata(target));
    return dataContainer.has(decorator);
  }

  export function saveProviderMetadata(data: ProviderMetadata, target: DecoratorTarget) {
    if (hasProviderMetadata(target)) {
      const meta = getProviderMetadata(target);
      // update identifier
      if (data.identifier) {
        if (meta.identifier !== data.identifier) {
          meta.identifier = data.identifier;
        }
      }
      // update scope
      if (data.scope) {
        if (meta.scope !== data.scope) {
          meta.scope = data.scope;
        }
      }
      saveMetadata(target, PROVIDE_DECORATOR, meta);
    } else {
      const uuid = generateUUID();
      saveMetadata(target, PROVIDE_DECORATOR, {
        identifier: data.identifier,
        uuid: uuid,
        name: camelCase(target.name?.toString()),
        originName: target.name,
        scope: data.scope,
      } as ProviderMetadata);
    }
    return target;
  }

  export function getProviderMetadata(target: DecoratorTarget): ProviderMetadata {
    return getMetadata(target, PROVIDE_DECORATOR);
  }

  export function hasProviderMetadata(target: DecoratorTarget): boolean {
    return hasMetadata(target, PROVIDE_DECORATOR);
  }

  export function saveInjectMetadata(target: DecoratorTarget, decorator: Identifier, data: any) {
    let dataMap: Map<Identifier, any>;
    if (!hasMetadata(target, INJECT_DECORATOR)) {
      dataMap = new Map<Identifier, any>();
      saveMetadata(target, INJECT_DECORATOR, dataMap);
    } else {
      dataMap = getMetadata(target, INJECT_DECORATOR);
    }
    dataMap.set(decorator, data);
    saveMetadata(target, INJECT_DECORATOR, dataMap);
  }

  export function getInjectMetadata(target: DecoratorTarget, decorator: Identifier) {
    const dataMap = getMetadata(target, INJECT_DECORATOR);
    if (dataMap) {
      return dataMap.get(decorator);
    }
    return undefined;
  }

  export function hasInjectMetadata(target: DecoratorTarget, decorator: Identifier) {
    const dataMap = getMetadata(target, INJECT_DECORATOR);
    if (dataMap) {
      return dataMap.has(decorator);
    }
    return false;
  }

  export function saveInjectFieldMetadata(target: ClassFieldDecoratorContext, provider: any) {
    let dataMap: Map<Identifier, any>;
    if (!hasInjectMetadata(target, INJECT_FIELD_DECORATOR)) {
      dataMap = new Map<Identifier, any>();
    } else {
      dataMap = getInjectMetadata(target, INJECT_FIELD_DECORATOR);
    }
    const metadata = {} as FieldMetadata;
    metadata.static = target.static;
    metadata.private = target.private;
    metadata.access = target.access;
    metadata.propertyKey = target.name;
    if (!provider) {
      metadata.identifier = target.name;
      metadata.injectMode = InjectMode.PropertyKey;
    } else {
      if (!isPrimitiveType(provider) && isClass(provider)) {
        metadata.identifier = Store.getProviderMetadata(provider).uuid;
        metadata.injectMode = InjectMode.Class;
      }
      if (!metadata.identifier) {
        if (isIdentifier(provider)) {
          metadata.identifier = provider as Identifier;
          metadata.injectMode = InjectMode.Identifier;
        }
      }
      if (!metadata.identifier) {
        metadata.identifier = target.name;
        metadata.injectMode = InjectMode.PropertyKey;
      }
    }
    dataMap.set(metadata.propertyKey, metadata);
    saveInjectMetadata(target, INJECT_FIELD_DECORATOR, dataMap);
  }

  export function getInjectFieldMetadata(target: ClassFieldDecoratorContext, decorator: Identifier) {
    const dataMap = getInjectMetadata(target, INJECT_FIELD_DECORATOR);
    if (dataMap) {
      return dataMap.get(decorator);
    }
    return undefined;
  }

  export function getInjectFieldsMetadata(target: DecoratorTarget): Map<Identifier, FieldMetadata> {
    return getInjectMetadata(target, INJECT_FIELD_DECORATOR);
  }

  export function saveInjectMethodMetadata(target: ClassMethodDecoratorContext, providers: any) {
    let dataMap: Map<Identifier, any>;
    if (!hasInjectMetadata(target, INJECT_METHOD_DECORATOR)) {
      dataMap = new Map<Identifier, any>();
    } else {
      dataMap = getInjectMetadata(target, INJECT_METHOD_DECORATOR);
    }
    const metadata = {} as MethodMetadata;
    metadata.static = target.static;
    metadata.private = target.private;
    metadata.access = target.access;
    if (providers && Types.isArray(providers)) {
      console.log(providers);
    }
    dataMap.set(target.name, metadata);
    console.log(target, providers);
  }

  export function saveExtraMetadata() {}

  export function getExtraMetadata() {}

  export function hasExtraMetadata() {}
}
