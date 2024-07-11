import { ApiProperty } from '@nestjs/swagger';

export class LineItemDto {
  @ApiProperty({ description: 'ID do item' })
  id: number;

  @ApiProperty({ description: 'Nome do item' })
  name: string;

  @ApiProperty({ description: 'Título do item' })
  title: string;

  @ApiProperty({ description: 'Preço do item' })
  price: number;

  @ApiProperty({ description: 'Quantidade do item' })
  quantity: number;
}
