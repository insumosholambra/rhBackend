import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  private readonly uploadPath = 'R:/USUARIOS/Intranet/Formularios';

  async saveFile(file: Express.Multer.File): Promise<void> {
    const filePath = path.join(this.uploadPath, file.originalname);

    try {
      fs.writeFileSync(filePath, file.buffer);
      console.log('Arquivo salvo com sucesso:', filePath);
    } catch (error) {
      console.error('Erro ao salvar o arquivo:', error);
      throw new Error('Erro ao salvar o arquivo');
    }
  }

  async fileExistsInDatabase(originalname: string): Promise<boolean> {
    const filePath = path.join(this.uploadPath, originalname);

    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return true; // O arquivo existe
    } catch (error) {
      return false; // O arquivo não existe
    }
  }
}
