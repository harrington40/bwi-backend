import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {AppdbDataSource} from '../datasources';
import {Appinfo, AppinfoRelations} from '../models';

export class AppinfoRepository extends DefaultCrudRepository<
  Appinfo,
  typeof Appinfo.prototype.id,
  AppinfoRelations
> {
  constructor(
    @inject('datasources.appdb') dataSource: AppdbDataSource,
  ) {
    super(Appinfo, dataSource);
  }
}
