import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import * as fs from 'fs';
import * as path from 'path';


@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      return {
        message: 'Arquivo anexado com sucesso!',
        fileName: file.originalname,
        path: file.path, 
      };
    } catch (error) {
      console.error('Erro ao fazer upload do arquivo:', error);
      throw new BadRequestException('Erro ao fazer upload do arquivo.');
    }
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const filePath = `R:/PUBLICO/Intranet - Público/${filename}`;
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).send('Arquivo não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar o arquivo:', error);
      res.status(500).send('Erro ao buscar o arquivo');
    }
  }

  @Get()
  async getAllFiles() {
    try {
      const directoryPath = 'R:/PUBLICO/Intranet - Público';
      const files = await fs.promises.readdir(directoryPath);

      // Filtra apenas os arquivos que possuem a extensão .pdf
      const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
      
      return pdfFiles;
    } catch (error) {
      console.error('Erro ao buscar os arquivos:', error);
      throw new Error('Erro ao buscar os arquivos.');
    }
  }
}
