import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Appinfo} from '../models';
import {AppinfoRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';

export class AppinfoController {
  constructor(
    @repository(AppinfoRepository)
    public appinfoRepository : AppinfoRepository,
  ) {}

  @post('/appinfos')
  @response(200, {
    description: 'Appinfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Appinfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appinfo, {
            title: 'NewAppinfo',
            exclude: ['id'],
          }),
        },
      },
    })
    appinfo: Omit<Appinfo, 'id'>,
  ): Promise<Appinfo> {
    return this.appinfoRepository.create(appinfo);
  }

  @get('/appinfos/count')
  @response(200, {
    description: 'Appinfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Appinfo) where?: Where<Appinfo>,
  ): Promise<Count> {
    return this.appinfoRepository.count(where);
  }

  @get('/appinfos')
  @response(200, {
    description: 'Array of Appinfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Appinfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Appinfo) filter?: Filter<Appinfo>,
  ): Promise<Appinfo[]> {
    return this.appinfoRepository.find(filter);
  }

  @patch('/appinfos')
  @response(200, {
    description: 'Appinfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appinfo, {partial: true}),
        },
      },
    })
    appinfo: Appinfo,
    @param.where(Appinfo) where?: Where<Appinfo>,
  ): Promise<Count> {
    return this.appinfoRepository.updateAll(appinfo, where);
  }

  @get('/appinfos/{id}')
  @response(200, {
    description: 'Appinfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Appinfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Appinfo, {exclude: 'where'}) filter?: FilterExcludingWhere<Appinfo>
  ): Promise<Appinfo> {
    return this.appinfoRepository.findById(id, filter);
  }

  @patch('/appinfos/{id}')
  @response(204, {
    description: 'Appinfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Appinfo, {partial: true}),
        },
      },
    })
    appinfo: Appinfo,
  ): Promise<void> {
    await this.appinfoRepository.updateById(id, appinfo);
  }

  @put('/appinfos/{id}')
  @response(204, {
    description: 'Appinfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() appinfo: Appinfo,
  ): Promise<void> {
    await this.appinfoRepository.replaceById(id, appinfo);
  }

  @del('/appinfos/{id}')
  @response(204, {
    description: 'Appinfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.appinfoRepository.deleteById(id);
  }


}
