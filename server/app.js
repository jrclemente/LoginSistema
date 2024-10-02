const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const profilesRouter = require('./routes/profiles');

const app = express();
// cors é um middlewares que define quais endereços web externos(front-end) podem acessar uma aplicação HTTP(back-end)(Proteção do back-end em relação ao front-end)
app.use(require('cors')());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);/* Rota Default - Traz todos os usuários */
app.use('/users/user/:id', usersRouter);
app.use('/users/register', usersRouter);
app.use('/users/delete/:id', usersRouter);
app.use('/users/updatepwd/:id', usersRouter);

app.use('/login', loginRouter);/* Rota Default - Verifica existência de usuario por email/senha */
app.use('/nome/:nome', loginRouter);
app.use('/email/:email', loginRouter);

app.use('/profiles', profilesRouter);/* Rota Default - Traz todos os perfis */
app.use('/profiles/user/:idUser', profilesRouter);
app.use('/profiles/register', profilesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  /*A linha acima foi retirada para a inclusão das linhas abaixo. Tecnicamente, as linhas abaixo tem a mesma funcionalidade desta linha.
  Porém, as mensagens de erro ficam mais fácil de manipular devido ao formato JSON.
  Já com a linha que foi retirada, a mensagem de erro já está no formato de apresentação da página, conforme a rederização do arquivo: error.ejs
  Se as duas linhas ficarem ativas ocorre o erro: Não é possível definir cabeçalhos depois que eles são enviados ao cliente(Cannot set headers after they are sent to the client)
  */
  // Linhas incluídas
  res.json({
    status: err.status,
    success: false,
    message: err.message,
    stack: err.stack
  })
});

module.exports = app;