# Tiny URL Service

## Структура проекта

```

tiny-url/
├── tiny-url-service/ # Бэкенд (Node.js, Express, Prisma)
│ ├── src/
│ ├── public/
│ ├── prisma/
│ ├── Dockerfile
│ ├── docker-compose.yml
│ └── ...
├── tiny-url-front/ # Фронтенд (React/Vue и т.д.)
│ ├── src/
│ ├── public/
│ ├── Dockerfile
│ └── ...

```

> **Важно:**
> Оба проекта (`tiny-url-service` и [tiny-url-frontend](https://github.com/Lakovshchikov/tiny-url-frontend)) должны находиться в одной папке (`tiny-url`).
> 

---

## Запуск через Docker Compose

1. Перейдите в папку с проектом:

   ```
   cd tiny-url/tiny-url-service
   ```

2. ~~Создайте и заполните файлы окружения~~ Файлы уже храняться в проекте, для удобства:

   - Для бэкенда: `prod.env`
   - Для фронта: `../tiny-url-front/prod.env`

3. Запустите все сервисы:

   ```
   docker-compose up --build -d
   ```

   Будут подняты:

   - База данных Postgres
   - Бэкенд (Express + Prisma)
   - Фронтенд (Nginx + статика)
   - Nginx-прокси для бэкенда

4. Проверьте работу:
   - Фронтенд: <http://localhost:8080>

## Примечания

- Все пути и настройки в `docker-compose.yml` и Dockerfile рассчитаны на такую структуру.
- Если меняете структуру — не забудьте поправить пути в конфиге.
- Немного изменил ручки api, для большего соотвествия REST
- Так как это проект для тествого задания, оставил все переменные окружению и прочую чувстительную информацю прямо в репозитории, для удобства использования
