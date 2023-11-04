const http = require("http");
// Импортируем класс URL из встроенного модуля url
const { URL } = require("url");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3000;

// создание сервера происходит при помощи функции createServer

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${hostname}`);
  const query = url.searchParams;

  // запрос на ?hello=<name>

  if (query.has("hello")) {
    const name = query.get("hello");

    if (name) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.write(`Hello, ${name}.`);
      response.end();
      return;
    }

    response.statusCode = 400;
    response.setHeader("Content-Type", "text/plain");
    response.write("Enter a name");
    response.end();
    return;
  } else if (url.pathname === "/users") {
    // запрос для /users
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.write(getUsers());
    response.end();
    return;
  } else if (url.search === "") {
    // если никакие параметры не переданы
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.write("Hello, World!");
    response.end();
    return;
  } else {
    response.statusCode = 500;
    response.end();
    return;
  }
});

// запуск сервера выполняется командой .listen

server.listen(3000, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
