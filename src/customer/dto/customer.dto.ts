import { ApiProperty } from '@nestjs/swagger';
import { AddressDto } from './address.dto';

export class CustomerDto {
  @ApiProperty({ description: 'ID do cliente', example: '60d21b4667d0d8992e610c85' })
  customerId: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'John' })
  firstName: string;

  @ApiProperty({ description: 'Sobrenome do cliente', example: 'Doe' })
  lastName: string;

  @ApiProperty({ description: 'Email do cliente', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Telefone do cliente', example: '+123456789', required: false })
  phone?: string;

  @ApiProperty({ description: 'Pedidos do cliente', example: ['order1', 'order2'], required: false })
  order?: string[];

  @ApiProperty({ description: 'Endereços do cliente', type: [AddressDto], required: false })
  addresses?: AddressDto[];

  @ApiProperty({ description: 'ID do cliente na Shopify', required: false })
  shopifyId?: string;

  @ApiProperty({ description: 'Tags do cliente', example: 'tag1,tag2', required: false })
  tags?: string;

  @ApiProperty({ description: 'Nota do cliente', example: 'Important customer', required: false })
  note?: string;

  @ApiProperty({ description: 'Taxa de isenção do cliente', example: false, required: false })
  taxExempt?: boolean;

  @ApiProperty({ description: 'Aceitação de marketing pelo cliente', example: true, required: false })
  acceptsMarketing?: boolean;

  @ApiProperty({ description: 'Identificador multipass do cliente', example: 'gid://shopify/Shop/123456789', required: false })
  multipassIdentifier?: string;

  @ApiProperty({ description: 'Contagem de pedidos do cliente', example: 0, required: false })
  ordersCount?: number;

  @ApiProperty({ description: 'Total gasto pelo cliente', example: '100.00', required: false })
  totalSpent?: string;

  @ApiProperty({ description: 'Nome do último pedido do cliente', example: '#1001', required: false })
  lastOrderName?: string;

  @ApiProperty({ description: 'Data de criação do cliente', example: '2021-07-14T19:20:30+00:00', required: false })
  createdAt?: string;

  @ApiProperty({ description: 'Data da última atualização do cliente', example: '2021-07-14T19:20:30+00:00', required: false })
  updatedAt?: string;

  @ApiProperty({ description: 'Data do último pedido do cliente', example: '2021-07-14T19:20:30+00:00', required: false })
  lastOrderDate?: string;
}

export class CreateCustomerDto extends CustomerDto {
  @ApiProperty({ description: 'Senha do cliente', example: 'password123', required: false })
  password?: string;

  @ApiProperty({ description: 'Confirmação da senha do cliente', example: 'password123', required: false })
  passwordConfirmation?: string;

  @ApiProperty({ description: 'Estado do cliente', example: 'disabled', required: false })
  state?: string;
}

export class UpdateCustomerDto extends CustomerDto {

  @ApiProperty({ description: 'Senha do cliente', example: 'newpassword123', required: false })
  password?: string;

  @ApiProperty({ description: 'Confirmação da senha do cliente', example: 'newpassword123', required: false })
  passwordConfirmation?: string;

  @ApiProperty({ description: 'Estado do cliente', example: 'disabled', required: false })
  state?: string;
}
