import { Body, Controller, Del, Inject, Param, Post } from '@midwayjs/core';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@midwayjs/swagger';
import {
  AddItem,
  AddItemResponse,
  ChangeStatus,
  ChangeStock,
  EditItem,
  ItemList,
  ItemListResponse,
} from '../dto/item.dto';
import { ResponseEmptyDTO } from '../dto/common.dto';
import { ItemService } from '../service/item.service';

@ApiTags('商品相关')
@Controller('/item')
export class ItemController {
  @Inject()
  itemService: ItemService;

  @ApiOperation({
    summary: '添加商品',
  })
  @ApiResponse({
    type: AddItemResponse,
  })
  @Post('/add')
  async AddItem(@Body() body: AddItem) {
    return await this.itemService.addItem(body);
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
  async deleteItem(@Param('id') id: number) {
    await this.itemService.deleteItem(id);
    return '';
  }

  @ApiOperation({
    summary: '编辑商品',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/edit')
  async editItem(@Body() body: EditItem) {
    await this.itemService.editItem(body);
    return '';
  }

  @ApiOperation({
    summary: '修改商品状态',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/status')
  async changeStatus(@Body() body: ChangeStatus) {
    await this.itemService.changeStatus(body);
    return '';
  }

  @ApiOperation({
    summary: '修改商品库存',
  })
  @ApiResponse({
    type: ResponseEmptyDTO,
  })
  @Post('/stock')
  async changeStock(@Body() body: ChangeStock) {
    await this.itemService.changeStock(body);
    return '';
  }

  @ApiOperation({
    summary: '商品列表',
  })
  @ApiResponse({
    type: ItemListResponse,
  })
  @Post('/list')
  async itemList(@Body() body: ItemList) {
    return await this.itemService.itemList(body);
  }
}
