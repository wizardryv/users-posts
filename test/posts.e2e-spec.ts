import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma.service';
import { Role } from '@prisma/client';

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.post.deleteMany(); // Очищаем таблицу постов перед каждым тестом
    await prisma.user.deleteMany(); // Очищаем таблицу пользователей перед каждым тестом
  });

  it('/posts/:id (GET) - should return the post if it exists', async () => {
    const testUser = await prisma.user.create({
      data:{
        email:"test@test.com",
        password: "hashedPass",
        role: Role.ADMIN
      }
    })

    const createdPost = await prisma.post.create({
      data: {
        title: 'Test Post',
        content: 'This is a test post',
        userId: testUser.id
      },
    });

    const response = await request(app.getHttpServer())
      .get(`/posts/${createdPost.id}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdPost.id);
    expect(response.body).toHaveProperty('title', 'Test Post');
    expect(response.body).toHaveProperty('content', 'This is a test post');
  });

  it('/posts/:id (GET) - should return 404 if post does not exist', async () => {
    const nonExistentPostId = 9999; // Используем несуществующий ID

    const response = await request(app.getHttpServer())
      .get(`/posts/${nonExistentPostId}`)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'Пост не был найден');
  });
});