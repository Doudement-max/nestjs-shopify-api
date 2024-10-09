import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product') 
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get() 
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Product list', type: [ProductDto] })
    async findAll(): Promise<ProductDto[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({ status: 200, description: 'Product data', type: ProductDto })
    async findOne(@Param('id') id: string): Promise<ProductDto> { 
        return this.productService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully', type: ProductDto })
    async create(@Body() product: ProductDto): Promise<ProductDto> {
        return this.productService.create(product);
    } 

    @Put(':id')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiResponse({ status: 200, description: 'Product updated successfully', type: ProductDto })
    async update(@Param('id') id: string, @Body() product: ProductDto): Promise<ProductDto> {
        return this.productService.update(id, product);
    }

    @Delete(':id') 
    @ApiOperation({ summary: 'Remove a product by ID' })
    @ApiResponse({ status: 200, description: 'Product removed successfully', type: ProductDto })
    async remove(@Param('id') id: string): Promise<ProductDto> {
        return this.productService.remove(id);
    }
}