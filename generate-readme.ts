import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './src/app.module';
import * as fs from 'fs';
import * as Widdershins from 'widdershins';

async function generateReadme() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Produtores API')
    .setDescription('API para gerenciamento de produtores, fazendas e culturas')
    .setVersion('1.0')
    .addTag('produtores')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const markdown = await Widdershins.convert(document, {
    language_tabs: ['javascript'],
    theme: 'darkula',
    codeSamples: true,
  });

  fs.writeFileSync('README.md', markdown);
  await app.close();
}

generateReadme();
