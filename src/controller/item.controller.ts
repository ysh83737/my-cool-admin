import { Body, Controller, Del, Param, Post } from '@midwayjs/core';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@midwayjs/swagger';
import {
  AddItem,
  AddItemResponse,
  EditItem,
  ItemList,
  ItemListResponse,
} from '../dto/item.dto';
import { ResponseEmptyDTO } from '../dto/common.dto';
import { RuleType, Valid } from '@midwayjs/validate';

@ApiTags('商品相关')
@Controller('/item')
export class ItemController {
  @ApiOperation({
    summary: '添加商品',
  })
  @ApiResponse({
    type: AddItemResponse,
  })
  @Post('/add')
  async AddItem(@Body() body: AddItem) {
    console.log('add item===', body);
  }

  @ApiOperation({
    summary: '删除商品',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @ApiParam({
    name: 'id',
    description: '商品id',
    type: 'integer',
    example: 1,
  })
  @Del('/delete/:id')
  async deleteItem(
    @Param()
    @Valid(RuleType.number().integer().required().min(1))
    id: number
  ) {
    console.log('delete===', id);
  }

  @ApiOperation({
    summary: '编辑商品',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/edit')
  async editItem(@Body() body: EditItem) {
    console.log('edit====', body);
  }

  @ApiOperation({
    summary: '商品列表',
  })
  @ApiResponse({
    type: ItemListResponse,
  })
  @Post('/list')
  async itemList(@Body() body: ItemList) {
    console.log('item list===', body);
  }
}
