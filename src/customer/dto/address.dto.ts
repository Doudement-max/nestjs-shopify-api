import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({ description: 'Endereço linha 1', example: '123 Main St' })
  address1: string;

  @ApiProperty({ description: 'Endereço linha 2', example: 'Apt 4B' })
  address2: string;

  @ApiProperty({ description: 'Cidade', example: 'New York' })
  city: string;

  @ApiProperty({ description: 'Empresa', example: 'Acme Corp' })
  company: string;

  @ApiProperty({ description: 'País', example: 'USA' })
  country: string;

  @ApiProperty({ description: 'Código do país', example: 'US' })
  countryCode: string;

  @ApiProperty({ description: 'Nome do país', example: 'United States' })
  countryName: string;

  @ApiProperty({ description: 'Nome', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Telefone', example: '+123456789' })
  phone: string;

  @ApiProperty({ description: 'Estado', example: 'NY' })
  province: string;

  @ApiProperty({ description: 'Código do estado', example: 'NY' })
  provinceCode: string;

  @ApiProperty({ description: 'CEP', example: '10001' })
  zip: string;

  @ApiProperty({ description: 'É endereço padrão', example: true })
  default: boolean;
}
