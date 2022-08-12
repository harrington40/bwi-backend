import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {Request, Response, RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import morgan, {Morgan} from  'morgan';

//...
import { AuthenticationComponent } from "@loopback/authentication"
import {
  JWTAuthenticationComponent,
  UserServiceBindings,
} from "@loopback/authentication-jwt"
import { AppdbDataSource } from "./datasources"
//...

export {ApplicationConfig};

export class BwiDatabaseApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
  // custom snippet added on this line
     this.component(AuthenticationComponent);
     this.component(JWTAuthenticationComponent);
     this.dataSource(AppdbDataSource, UserServiceBindings.DATASOURCE_NAME)

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.setupLogging();
  }
  private setupLogging() {

    const morganFactory = (config?: morgan.Options<Request, Response>) => {
       this.debug('Morgan configuration', config);
       return morgan('combined', config);
     };

     const defaultConfig: morgan.Options<Request, Response> = {
         stream: {
           write: str => {
             this._debug(str);
           },
         },
     };
     this.expressMiddleware(morganFactory, defaultConfig, {
       injectConfiguration: 'watch',
       key: 'middleware.morgan',
     });
    }
  }

