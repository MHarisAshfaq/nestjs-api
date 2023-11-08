import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiSuccessResponseDTO } from '../dto/api-success-response.dto';

interface ApiSuccessResponseDecoratorInput {
  status: number;
  description: string;
  type: any;
}

export const ApiSuccessResponseDecorator = ({
  status,
  description,
  type,
}: ApiSuccessResponseDecoratorInput) => {
  return applyDecorators(
    ApiExtraModels(ApiSuccessResponseDTO, type),
    ApiResponse({
      status: status,
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiSuccessResponseDTO) },
          {
            properties: {
              message: {
                type: 'string',
              },
              data: {
                $ref: getSchemaPath(type),
              },
            },
          },
        ],
      },
    }),
  );
};
