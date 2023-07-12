import { Autowired } from '../src/decorators/core/autowired';
import { Injectable } from '../src/decorators/core/injectable';
import { SymbolMetadata } from '../src/utils/symbol.utils';
import { Store } from '../src/decorators/store';
import { GenericApplicationContext } from '../src/context/generic-application-context';
import { IComponent } from '../src/interface/common/component';

@Injectable()
export class Cat {}

@Injectable()
export class Dog {}
@Injectable()
export class Zoo {
  @Autowired()
  dog: Dog;
  @Autowired()
  cat: Cat;
}

const component: IComponent = {
  identifier: Symbol('uuid'),
  provider: () => {
    return '123456';
  },
};

const context = new GenericApplicationContext();
context.register(component);
context.register(Cat);
context.register(Dog);
context.register(Zoo);

console.log(Store.getTargetMetadata(Zoo));
