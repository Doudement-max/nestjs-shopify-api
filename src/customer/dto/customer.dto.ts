import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';

export class CustomerDto {
  @ApiProperty({ description: 'Nome do cliente', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Sobrenome do cliente', example: 'Doe' })
  lastName: string;

  @ApiProperty({ description: 'Email do cliente', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Telefone do cliente', example: '+123456789' })
  phone: string;

  @ApiProperty({ description: 'Pedidos do cliente', example: ['order1', 'order2'] })
  orders: string[];

  @ApiProperty({ description: 'Endereços do cliente', type: [AddressDto] })
  addresses: AddressDto[];
}