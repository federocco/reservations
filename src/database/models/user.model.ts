import { DataTypes, FindOptions, Model, ModelCtor, Sequelize } from 'sequelize';
import { BaseModel } from './base';

// defining properties for our User model
export interface IUser {
  id?: string;
  displayName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  facebookId?: string;
  facebookAccessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseModel implements IUser {
  public static readonly ModelName: string = 'User';
  public static readonly ModelNamePlural: string = 'Users';
  public static readonly TableName: string = 'users';
  public static readonly DefaultScope: FindOptions = {};

  public id!: string;
  public displayName!: string;
  public email!: string;
  public firstName: string;
  public lastName: string;
  public language: string;
  public facebookId: string;
  public facebookAccessToken: string;
  public createdAt: Date;
  public updatedAt: Date;

  // region Static
  public static prepareInit(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          comment: 'Id of the instance',
        },
        displayName: new DataTypes.STRING(),
        firstName: new DataTypes.STRING(255),
        lastName: new DataTypes.STRING(255),
        email: new DataTypes.STRING(255),
        language: new DataTypes.STRING(10),
        facebookId: {
          type: new DataTypes.STRING(255),
          unique: true,
          comment: 'Facebook user Id',
        },
        facebookAccessToken: new DataTypes.STRING(255),
      },
      {
        sequelize: sequelize,
        tableName: this.TableName,
        name: {
          singular: this.ModelName,
          plural: this.ModelNamePlural,
        },
        defaultScope: this.DefaultScope,
        comment: 'Model for the public accessible data of an user',
      },
    );
  }

  public static setAssociations(modelCtors: {
    [modelName: string]: ModelCtor<Model>;
  }) {
    // place to set model associations
  }
}
