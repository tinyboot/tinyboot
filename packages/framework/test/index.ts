import {Autowired} from '../src/decorators/core/autowired'
import {Injectable} from '../src/decorators/core/injectable'
import {SymbolMetadata} from '../src/utils/symbol.utils'
import {Store} from '../src/decorators/store'

@Injectable()
export class Cat {

}

@Injectable()
export class Dog {

}
@Injectable()
export class Zoo {
  @Autowired()
  dog:Dog
  @Autowired()
  cat:Cat
}


console.log(Store.getTargetMetadata(Zoo))
