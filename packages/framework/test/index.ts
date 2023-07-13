import { Autowired } from '../src/decorators/core/autowired';
import { Injectable } from '../src/decorators/core/injectable';
import { SymbolMetadata } from '../src/utils/symbol.utils';
import { Store } from '../src/decorators/store';
import { GenericApplicationContext } from '../src/context/generic-application-context';
import { IComponent } from '../src/interface/common/component';
import { Init } from '../src/decorators/core/definitions';

@Injectable()
export class Cat {}

@Injectable()
export class Dog {}
@Injectable()
export class Zoo {
  cat: Cat;
  dog: Dog;
  @Autowired
  have(cat: Cat, dog: Dog) {
    this.cat = cat;
    this.dog = dog;
  }
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
