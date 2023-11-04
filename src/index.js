const { log } = require("console");
const http = require("http");
const getUsers = require("./modules/users")

const server = http.createServer((request, response) => {
  if (request.url === "/users") {
    response.status = 200;
    response.statusMessage = "OK";
    response.header = "Content-Type: application/json";
    response.write(getUsers());
    response.end();

    return;
  }
  response.status = 200;
  response.statusMessage = "OK";
  response.header = "Content-Type: text/plain";
  response.write("Hello, World!");
  response.end();

  // Написать обработчик запроса:
  // - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
  // - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
  // - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
  // - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
  // - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
});

// запуск сервера выполняется командой .listen

server.listen(3000, () => {
  console.log("Сервер запущен по адресу http://127.0.0.1:3000");
});
