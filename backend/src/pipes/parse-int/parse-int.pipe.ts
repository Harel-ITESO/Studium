import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
/** Parses a string to an integer and returns it */
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: any): number {
        const numberValue = parseInt(value, 10);
        if (isNaN(numberValue))
            throw new BadRequestException('Provided id is not a number value');
        return numberValue;
    }
}
