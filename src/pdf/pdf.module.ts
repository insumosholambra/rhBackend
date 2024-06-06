import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { v4 as uuidv4 } from 'uuid'; // Importar UUID

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: 'R:/PUBLICO/Intranet - Público',
        //garante que não haverá arquivos com o mesmo nome na pasta, dessa forma evitando sobrescrição
        filename: (req, file, cb) => {
          const today = new Date();
          const formattedDate = today
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ''); // Formato: AAAA-MM-DD
          const uniqueSuffix = Date.now();
          const fileName = `${formattedDate}-${file.originalname}`; // Nome único com a data de hoje
          cb(null, fileName);
        },
      }),
      limits: {
        //limite de arquivo definido em 5mb
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
