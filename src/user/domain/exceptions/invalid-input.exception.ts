import { BadRequestException } from '@nestjs/common';

export class InvalidInputException extends BadRequestException {
    constructor(details: {
        message: string;
        errors: { field: string; constraints: { [type: string]: string } }[];
    }) {
        super(details);
    }
}
