import { IBeanDefinition } from '../interface/bean/bean.definition';
import { IFieldDefinition } from '../interface/bean/field.definition';
import { IMethodDefinition } from '../interface/bean/method.definition';
import { IApplicationContext } from '../interface/context/application-context';
import { IBeanRegistry } from '../interface/bean/bean.registry';
import { IBeanFactory } from '../interface/bean/bean.factory';
import { BeanFactory } from '../bean/bean.factory';
import { Identifier } from '../interface/common/identifier';
import { BeanRegister } from '../bean/bean.register';
import { Types } from '../utils/types.utils';
import { IIdentifierRelation } from '../interface/bean/identifier.relation';
import { IdentifierRelationships } from '../bean/identifier.relation';
import { Store } from '../decorators/store';
import { Scope } from '../enums/scope.enum';
import { generateUUID } from '../utils/uui.utils';
import { IComponent } from '../interface/common/component';
import { FACTORY_PROVIDER } from '../constant/constant';
import { BeanDefinition } from '../bean/bean.definition';
import { BeanType } from '../enums/bean-type.enum';

export abstract class AbstractApplicationContext implements IApplicationContext {
  parent: IApplicationContext;
  private values: Map<Identifier, any> = new Map();
  private _identifierRelation: IIdentifierRelation;
  private _beanRegistry: IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>;
  private _beanFactory: IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>;
  constructor(parent?: IApplicationContext) {
    this.parent = parent;
  }
  get beanRegistry(): IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>> {
    if (!this._beanRegistry) {
      this._beanRegistry = new BeanRegister();
    }
    return this._beanRegistry;
  }
  set beanRegistry(value: IBeanRegistry<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>) {
    this._beanRegistry = value;
  }
  get beanFactory(): IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>> {
    if (!this._beanFactory) {
      this._beanFactory = new BeanFactory();
    }
    return this._beanFactory;
  }
  set beanFactory(value: IBeanFactory<IFieldDefinition, IMethodDefinition, IBeanDefinition<IFieldDefinition, IMethodDefinition>>) {
    this._beanFactory = value;
  }
  get identifierRelation(): IIdentifierRelation {
    if (!this._identifierRelation) {
      this._identifierRelation = new IdentifierRelationships();
    }
    return this._identifierRelation;
  }
  set identifierRelation(value: IIdentifierRelation) {
    this._identifierRelation = value;
  }

  register<T>(target: T, options?: Partial<IBeanDefinition<IFieldDefinition, IMethodDefinition>>);
  register<T>(identifier: Identifier, target: T, options?: Partial<IBeanDefinition<IFieldDefinition, IMethodDefinition>>);
  register(identifier: any, target: any, options?: Partial<IBeanDefinition<IFieldDefinition, IMethodDefinition>>) {
    if (Types.isClass(identifier) || Types.isComponent(identifier) || Types.isFunction(identifier)) {
      return this.registerProvider(identifier, target);
    }
    if (this.beanRegistry.hasBeanDefinition(identifier)) return;
    if (options.registerHook) options.registerHook(target, options);
    const definition: IBeanDefinition<IFieldDefinition, IMethodDefinition> = new BeanDefinition();
    if (Types.isClass(target)) {
      definition.name = Store.getProviderMetadata(target)?.name;
      definition.type = BeanType.Class;
    } else {
      definition.type = BeanType.Factory;
      definition.asynchronous = Types.isAsyncFunction(target);
      definition.name = target.identifier;
    }
    definition.target = target;
    definition.identifier = identifier;
    definition.path = options?.path || null;
    definition.namespace = options?.namespace || '';
    definition.scope = options?.scope || Scope.Request;
    // field
    const fields = Store.getInjectFieldsMetadata(target);
    if (fields) {
      console.log(fields.keys());
      for (const fieldKey of Array.from(fields.keys())) {
        const field = fields.get(fieldKey);
        const fieldDefinition: IFieldDefinition = Object.assign({}, field);
        definition.fields.setField(field.propertyKey, fieldDefinition);
      }
    }
    // method
  }
  get<T>(): T {
    return null;
  }

  getValue<T>(identifier: Identifier): T {
    const value = this.values.get(identifier);
    if (!value) {
      return this.parent?.getValue<T>(identifier);
    }
    return value;
  }

  hasValue(identifier: Identifier): boolean {
    return this.values.has(identifier) || this.parent?.hasValue(identifier);
  }

  setValue<T>(identifier: Identifier, value: T): void {
    this.values.set(identifier, value);
  }

  protected registerProvider(provider: any, options: Partial<IBeanDefinition<IFieldDefinition, IMethodDefinition>> = {}): void {
    if (Types.isClass(provider)) {
      const providerMetadata = Store.getProviderMetadata(provider);
      if (providerMetadata && providerMetadata.uuid) {
        this.identifierRelation.saveClassRelation(provider, options?.namespace);
        this.register(providerMetadata.uuid, provider, options);
      }
    } else if (Types.isComponent(provider)) {
      const component: IComponent = provider as IComponent;
      if (!component.scope) {
        component.scope = Scope.Request;
      }
      Object.defineProperty(component.provider, FACTORY_PROVIDER, {
        value: component,
        writable: false,
      });
      const uuid = generateUUID();
      this.identifierRelation.saveFactoryRelation(component.identifier, uuid);
      this.register(uuid, component, {
        scope: component.scope,
        namespace: options.namespace,
        target: options.target,
      });
    } else if (Types.isFunction(provider)) {
      const component: IComponent = module[FACTORY_PROVIDER];
      if (component && component.identifier) {
        if (!component.scope) {
          component.scope = Scope.Request;
        }
        const uuid = generateUUID();
        this.identifierRelation.saveFactoryRelation(component.identifier, uuid);
        this.register(uuid, module, {
          scope: component.scope,
          namespace: options.namespace,
          target: options.target,
        });
      }
    }
  }
}
