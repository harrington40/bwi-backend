import {Entity, model, property} from '@loopback/repository';

@model()
export class Appinfo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fname: string;

  @property({
    type: 'string',
    required: true,
  })
  lname: string;

  @property({
    type: 'string',
  })
  tel?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  stno?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  ste?: string;

  @property({
    type: 'string',
  })
  cntry?: string;

  @property({
    type: 'string',
  })
  pym?: string;

  @property({
    type: 'string',
  })
  vte?: string;

  @property({
    type: 'string',
  })
  cmte?: string;

  @property({
    type: 'string',
  })
  due?: string;


  constructor(data?: Partial<Appinfo>) {
    super(data);
  }
}

export interface AppinfoRelations {
  // describe navigational properties here
}

export type AppinfoWithRelations = Appinfo & AppinfoRelations;
