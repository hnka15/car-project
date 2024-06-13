import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CreateRegisterController } from './controllers/create-register.controller'
import { envSchema } from './env'
import { ListRegisterController } from './controllers/list-register.controller'
import { SearchRegisterController } from './controllers/search-register.controller'
import { StreamService } from './services/stream.service'
import { StreamController } from './controllers/stream.controller'
import { PrismaService } from './services/prisma.service'

@Module({
  // Esse forRoot é usado para passar configurações
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // pra essa configuração ser aplicada a todos os modulos, caso tiver
    }), // pra usar as variaveis amb. importe o configService
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
