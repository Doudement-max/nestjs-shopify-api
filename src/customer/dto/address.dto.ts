import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({ description: 'Rua do endereço', example: '123 Main St' })
  street: string;

  @ApiProperty({ description: 'Cidade do endereço', example: 'São Paulo' })
  city: string;

  @ApiProperty({ description: 'Estado do endereço', example: 'SP' })
  state: string;

  @ApiProperty({ description: 'CEP do endereço', example: '01000-000' })
  zipCode: string;

  @ApiProperty({ description: 'País do endereço', example: 'Brasil' })
  country: string;
}