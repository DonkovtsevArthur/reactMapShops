module.exports = (url, urlTrade, email, phone, token, evoToken, lkuser, lkpassword) => (
    `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Настройки приложения 1С:Розница</title>
            <link rel="stylesheet" href="./css/main.css" />
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Ubuntu:400,700&amp;subset=cyrillic" rel="stylesheet">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        </head>
        <body>
            <section class="container">
                <h2 class="mainTitle">Выберите базу</h2>
                <table class="mainTable">
                    <tr>
                        <td>1C: Розница 8 <br /><small>При первом входе используйте логин "Администратор" и пустой пароль</small></td>
                        <td class="linkToBase"><a class="baseLink" href="${url}" target="_blank" >Перейти к базе</a></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="resetTd">
                            <div class="reset_1">
                                <span class="resetButton" id="resetButton">Cбросить пароль</span>
                            </div>
                            <div class="reset_2 hide">
                                <lable class="lableReset" for="cod2">Введите проверочный код высланный вам на Email:</lable>
                                <input type="text" id="cod2" />
                                <span class="baseLink" id="confirmReset">Подтвердить сброс</span>
                                <span class="baseLink" id="cancelReset">Отмена</span>
                                <p class="resetError hide" id="badCode">Неверный код</p>
                            </div>
                            <div class="reset_3 hide">
                                <i class="fa fa-spinner fa-pulse fa-fw" id="spiner"></i>
                            </div>
                            <div class="reset_4 hide">
                                <p class="resetSuccess">Пароль сброшен!</p>
                            </div>
                            <div class="reset_5 hide">
                                <p class="resetError">Произобшла ошибка. Попробуйти позднее</p>
                            </div>
                        </td>
                    </tr>
                </table>
                <h2 class="mainTitle">Настройки</h2>
                <table class="mainTable">
                    <tr>
                        <td class="contact" id="email">
                            <div id="grupInput" class="hide">
                                <lable class="lable" for="newEmailInput">Введите новый Email:</lable>
                                <input type="text" id="newEmailInput" value='${email}'/>
                                <small id="warning" class="hide warning">Введите корректный email</small>
                            </div>
                            <div id="grupInputCod" class="hide">
                                <lable class="lable" for="cod">Введите проверочный код высланный вам на Email:</lable>
                                <input type="text" id="cod" />
                                <small id="warningCode" class="hide warning">Неправильный код</small>
                            </div>
                            <span id="emailText">${email}</span>
                            <i class="fa fa-spinner fa-pulse fa-fw hide" id="spiner"></i>
                        </td>
                        <td class="functionalButton" >
                            <span class="baseLink" id="showInput">Изменить</span>
                            <span id="groupButtons" class="hide">
                                <span class="baseLink" id="cancel">Отмена</span>
                                <span class="baseLink" id="confirm">Подтвердить</span>
                            </span>
                            <span class="baseLink hide" id="confirmCod">Отправить код</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="supportKey">Ключ доступа для <a href="https://goo.gl/xg2vV3">"1С Интеграция и поддержка"</a></span>
                        </td>
                        <td class="support">
                            <span class="supportKey">${evoToken || 'Отсутствует'}</span>
                        </td>
                    </tr>
                </table>
                <br />
                <div class="instructions">
                    <a class="baseLink" href="https://docs.google.com/a/lad24.ru/document/d/1hBjAw5eGwrJe46cvRzZvtIni1V8UEOsqXppqU8CprPY/edit?usp=sharing" target="_blank" >Инструкция по использованию</a>
                </div>
                <h2>Логин и пароль для авторизации в облаке "Эвотор"</h2>
                <p>Логин: ${lkuser}</p>
                <p>Пароль: ${lkpassword}</p>
                <img src="/img/evotor.png" alt="Вход в облако Эвотор" width="1000"/>
            </section>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src="./js/main.js"></script>
            <script>
                $('').changeEmail({
                    "email": "${email}",
                    "token": "${token}"
                });
            </script>
        </body>
    </html>`
);
