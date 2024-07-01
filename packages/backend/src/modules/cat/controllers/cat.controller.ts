import { Controller, Get, Header, NotFoundException, Param, StreamableFile } from '@nestjs/common';
import { CatService } from '../services/cat.service';
import { createReadStream } from 'fs';

@Controller('cat')
export class CatController {
    constructor(private readonly catService: CatService) {}

    @Get('picture/:catId')
    @Header('Content-Type', 'image/jpeg')
    async getCandidates(@Param('catId') catId: number) {
        try {
            const path = await this.catService.getPicture(catId);
            const stream = createReadStream(path)
            return new StreamableFile(stream);
        } catch (e) {
            return new NotFoundException(e.message);
        }
    }
}
