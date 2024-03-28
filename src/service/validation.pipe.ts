import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from './validaion.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (!metadata.metatype || !this.toValidate(metadata.type)) {
      return value;
    }

    const object = plainToClass(metadata.metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      console.log(errors);
      // eslint-disable-next-line prefer-const, prettier/prettier
      let messages = errors.map((err) => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
      });
      throw new ValidationException(messages);
    }
    return object;
  }
  private toValidate(type: string): boolean {
    const noValidationNeeded = ['custom', 'query', 'param', 'header'];
    return !noValidationNeeded.includes(type);
  }
}
