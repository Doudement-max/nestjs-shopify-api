import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product') 
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get() 
    @ApiOperation({ summary: 'Obter todos os produtos' })
    @ApiResponse({ status: 200, description: 'Lista de produtos', type: [ProductDto] })
    async findAll(): Promise<ProductDto[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter um produto pelo ID' })
    @ApiResponse({ status: 200, description: 'Dados do produto', type: ProductDto })
    async findOne(@Param('id') id: string): Promise<ProductDto> { 
        return this.productService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Criar um novo produto' })
    @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: ProductDto })
    async create(@Body() product: ProductDto): Promise<ProductDto> {
        return this.productService.create(product);
    } 

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
    @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso', type: ProductDto })
    async update(@Param('id') id: string, @Body() product: ProductDto): Promise<ProductDto> {
        return this.productService.update(id, product);
    }

    @Delete(':id') 
    @ApiOperation({ summary: 'Remover um produto pelo ID' })
    @ApiResponse({ status: 200, description: 'Produto removido com sucesso', type: ProductDto })
    async remove(@Param('id') id: string): Promise<ProductDto> {
        return this.productService.remove(id);
    }
}