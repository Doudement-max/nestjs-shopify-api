import {Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import {ProductDto} from './dto/product.dto';

@Controller('products') 
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get() 
    async findAll(): Promise<ProductDto[]> {
        return this.productService.findAll();
    }
   @Get(':id')
   async findOne(@Param('id') id: string): Promise<ProductDto>{ 
    return this.productService.findOne(id);
   }

   @Post()
   async create(@Body() product: ProductDto): Promise<ProductDto>{
    return this.productService.create(product);
   } 

   @Put(':id')
   async update(@Param('id') id: string, @Body() product: ProductDto): Promise<ProductDto>{
    return this.productService.update(id, product);
   }

   @Delete(':id') 
   async remove(@Param('id') id: string): Promise<ProductDto>{
    return this.productService.remove(id);
   }
}