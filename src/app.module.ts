import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateRegisterController } from './controllers/create-register.controller'
import { envSchema } from './env'
import { ListRegisterController } from './controllers/list-register.controller'
import { SearchRegisterController } from './controllers/search-register.controller'
import { StreamService } from './services/stream.service'
import { StreamController } from './controllers/stream.controller'
import { PrismaService } from './services/prisma.service'
import { MulterModule } from '@nestjs/platform-express'
import { extname } from 'path'
import { diskStorage } from 'multer'

@Module({
  // Esse forRoot é usado para passar configurações
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // pra essa configuração ser aplicada a todos os modulos, caso tiver
    }), // pra usar as variaveis amb. importe o configService
    MulterModule.register({
      storage: diskStorage({
        destination: './storage',
        filename: (req, file, callback) => {
          // Modifique o nome do arquivo aqui
          const date = new Date()
          const newName =
            date.getDate().toString() +
            '-' +
            date.getMonth().toString() +
            '-' +
            date.getFullYear().toString() +
            '-' +
            file.originalname
          return callback(null, `${newName}${extname(file.originalname)}`)
        },
      }),
    }),
  ],
  controllers: [
    CreateRegisterController,
    ListRegisterController,
    SearchRegisterController,
    StreamController,
  ], // tudo que recebe requisição http
  providers: [PrismaService, StreamService], // dependencias dos controllers
})
export class AppModule {}
