import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { diskStorage } from 'multer';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: 'R:/PUBLICO/Intranet - Público',
        filename: (req, file, cb) => {
          const today = new Date();
          const formattedDate = today
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ''); // Formato: AAAA-MM-DD
          const fileName = `${formattedDate}-${file.originalname}`; // salva o arquivo com a data de hoje + nome
          cb(null, fileName);
        },
      }),
      limits: {
        fileSize: 5 * 1024 * 1024, // limite de arquivo definido em 5mb
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true); // aceita o arquivo
        } else {
          cb(new Error('Somente arquivos PDF são permitidos!'), false); // rejeita o arquivo
        }
      },
    }),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
