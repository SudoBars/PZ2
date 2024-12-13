# Сервер для таблиці військовослужбовців

Цей сервер створений на основі модуля `http` Node.js. Він генерує HTML-сторінку з таблицею даних про військовослужбовців і дозволяє розрахувати середній вік.

---

## Функціонал

- Відображення таблиці військовослужбовців із зазначенням звання, імені та віку.
- Кнопка для обчислення середнього віку військових.
- Сервер відповідає на запити до маршруту `/`.

---

## Як запустити сервер

### Крок 1: Створіть файл `server.js`

Додайте наступний код до файлу `server.js`:

```javascript
const http = require('http');

// Дані про військовослужбовців
const soldiers = [
  { rank: 'сержант', name: 'Степанов Степан Степанович', age: 33 },
  { rank: 'лейтенант', name: 'Федоров Федір Федорович', age: 25 },
  { rank: 'майор', name: 'Антоненко Антон Антонович', age: 31 }
];

// Функція для розрахунку середнього віку
const calculateAverageAge = () => {
  const totalAge = soldiers.reduce((sum, soldier) => sum + soldier.age, 0);
  return (totalAge / soldiers.length).toFixed(2);
};

// Створення сервера
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Генерація HTML-сторінки
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Таблиця військовослужбовців</title>
        <style>
          table { width: 50%; margin: 20px auto; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          button { display: block; margin: 20px auto; padding: 10px 20px; cursor: pointer; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>№ п/п</th>
              <th>Звання</th>
              <th>ПІБ</th>
              <th>Вік</th>
            </tr>
          </thead>
          <tbody>
            ${soldiers.map((soldier, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${soldier.rank}</td>
                <td>${soldier.name}</td>
                <td>${soldier.age}</td>
              </tr>`).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Середній вік:</td>
              <td id="average-age">-</td>
            </tr>
          </tfoot>
        </table>
        <button id="start-btn">Старт</button>
        <script>
          document.getElementById("start-btn").addEventListener("click", () => {
            const averageAge = ${calculateAverageAge()};
            document.getElementById("average-age").textContent = averageAge;
          });
        </script>
      </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
```

### Крок 2: Запустіть сервер

Виконайте наступну команду в терміналі:

```bash
node server.js
```

### Крок 3: Перейдіть у браузер

Відкрийте браузер і перейдіть за посиланням:

```url
http://localhost:3000
```

---

## Вимоги

- Node.js (версія 14 і вище).
