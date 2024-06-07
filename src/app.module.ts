import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateRegisterController } from './controllers/create-register.controller'
import { envSchema } from './env'
import { ListRegisterController } from './controllers/list-register.controller'
import { SearchRegisterController } from './controllers/search-register.controller'

@Module({
  // Esse forRoot é usado para passar configurações
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true, // pra essa configuração ser aplicada a todos os modulos
    }),
  ],
  controllers: [
    CreateRegisterController,
    ListRegisterController,
    SearchRegisterController,
  ], // tudo que recebe requisição http
  providers: [PrismaService], // dependencias dos controllers
})
export class AppModule {}
