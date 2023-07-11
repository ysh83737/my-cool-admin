import { ApiProperty, ApiPropertyOptions } from '@midwayjs/swagger';
import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface ColumnProOptions extends ColumnOptions {
  /**
   * 传递给`ApiProperty`装饰器的参数
   */
  api?: ApiPropertyOptions;
}

/**
 * [装饰器]`Column`与`PrimaryGeneratedColumn`的结合装饰器，复用`comment`数据
 * @param options
 */
export const PrimaryGeneratedColumnPro = ColumnFactory(PrimaryGeneratedColumn);

/**
 * [装饰器]`Column`与`ApiProperty`的结合装饰器，复用`comment`数据
 * @param options
 */
export const ColumnPro = ColumnFactory(Column);

/**
 * [装饰器]`CreateDateColumn`与`ApiProperty`的结合装饰器，复用`comment`数据
 * @param options
 */
export const CreateDateColumnPro = ColumnFactory(CreateDateColumn, {
  format: 'date-time',
});

/**
 * [装饰器]`UpdateDateColumn`与`ApiProperty`的结合装饰器，复用`comment`数据
 * @param options
 */
export const UpdateDateColumnPro = ColumnFactory(UpdateDateColumn, {
  format: 'date-time',
});

function ColumnFactory<T extends (options: ColumnOptions) => PropertyDecorator>(
  source: T,
  preset?: ApiPropertyOptions
): (options: ColumnProOptions) => PropertyDecorator {
  return options => {
    const { comment, api = {} } = options;
    const column = source(options);
    const apiProperty = ApiProperty({
      description: comment,
      ...preset,
      ...api,
    });
    const decorator: PropertyDecorator = (target, propertyKey) => {
      column(target, propertyKey);
      apiProperty(target, propertyKey);
    };
    return decorator;
  };
}
