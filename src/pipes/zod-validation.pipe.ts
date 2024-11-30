/*import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private readonly schema: ZodSchema) {}

    transform(value: any, _metadata: ArgumentMetadata) {
        const result = this.schema.safeParse(value);
        if (!result.success) {
            throw new BadRequestException(result.error.errors);
        }
        return value;
    }
} */
    
    
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any, _metadata: ArgumentMetadata) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.errors.map(e => e.message).join(', '));
    }
    return result.data;  // Retorna os dados validados
  }
}
