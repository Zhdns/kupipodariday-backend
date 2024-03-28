/* eslint-disable prettier/prettier */
import {  ModelStatic, WhereOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';
import { User } from 'src/user/user.model';

export const FOREIGN_USER_SCHEMA = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.createdAt,
  };
};

export const FOREIGN_USER_SCHEMA_WITH_WISHES = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    about: user.about,
    avatar: user.avatar,
    email: user.email,
    wishes: user.wishes,
    createdAt: user.createdAt,
    updatedAt: user.createdAt,
  };
};

export const REQUEST_ID =  (req: any) => {
  return req.user.id;
};

export const FIND_ONE = async <T extends Model>(
  repository: ModelStatic<T>,
  identification: WhereOptions,
  modelOne?: typeof Model<any>,
  modelTwo?: typeof Model<any>,
) => {
  const include = [];

  if (modelOne) {
    include.push({ model: modelOne });
  }

  if (modelTwo) {
    include.push({ model: modelTwo });
  }

 return await repository.findOne({
   where: identification,
   include: include.length > 0 ? include : undefined
 })
};

export const FIND_PK = async <T extends Model>(
  repository: ModelStatic<T>,
  identification: number,
  modelOne?: typeof Model<any>,
  modelTwo?: typeof Model<any>,
) => {
  const include = [];

  if (modelOne) {
    include.push({ model: modelOne });
  }

  if (modelTwo) {
    include.push({ model: modelTwo });
  }

 return await repository.findByPk(identification, {
   include: include.length > 0 ? include : undefined
 })
};
