const http = require('http');

// Дані про військовослужбовців
const soldiers = [
  { rank: 'сержант', name: 'Степанов Степан Степанович', age: 33 },
  { rank: 'лейтенант', name: 'Федоров Федір Федорович', age: 25 },
  { rank: 'майор', name: 'Антоненко Антон Антонович', age: 31 }
];

// Функція для розрахунку середнього віку
const calculateAverageAge = () => {
  const totalAge = soldiers.reduce((sum, soldier) => sum + soldier.age, 0); // Сума віків усіх військовослужбовців
  return (totalAge / soldiers.length).toFixed(2); // Розрахунок середнього віку
};

// Створення сервера
const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') { // Перевіряємо маршрут і метод запиту
    // Генерація HTML-сторінки
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Таблиця військовослужбовців</title>
        <style>
          table { width: 50%; margin: 20px auto; border-collapse: collapse; } /* Стилі для таблиці */
          th, td { border: 1px solid #000; padding: 8px; text-align: center; } /* Стилі для клітинок */
          button { display: block; margin: 20px auto; padding: 10px 20px; cursor: pointer; } /* Стилі для кнопки */
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
                <td>${index + 1}</td> <!-- Номер у списку -->
                <td>${soldier.rank}</td> <!-- Звання -->
                <td>${soldier.name}</td> <!-- ПІБ -->
                <td>${soldier.age}</td> <!-- Вік -->
              </tr>`).join('')} <!-- Генерація рядків для кожного військового -->
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Середній вік:</td>
              <td id="average-age">-</td> <!-- Поле для відображення середнього віку -->
            </tr>
          </tfoot>
        </table>
        <button id="start-btn">Старт</button>
        <script>
          // Додаємо обробник події для кнопки
          document.getElementById("start-btn").addEventListener("click", () => {
            const averageAge = ${calculateAverageAge()}; // Викликаємо функцію розрахунку середнього віку
            document.getElementById("average-age").textContent = averageAge; // Оновлюємо поле зі середнім віком
          });
        </script>
      </body>
      </html>
    `;
    res.writeHead(200, { 'Content-Type': 'text/html' }); // Встановлюємо заголовок відповіді
    res.end(html); // Відправляємо HTML-сторінку
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' }); // Обробка маршруту, що не знайдено
    res.end('Not Found'); // Відправляємо повідомлення про помилку
  }
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`); // Лог у консолі при запуску сервера
});
