# Админка для твич сервиса


## Запуск

`npm install`

`npm run start`

## Для входа

login: admin@admin.ru

password: Password123


## Убить процесс на винде

taskkill //pid `netstat -aon | grep 8084 | grep -P '(?<=LISTENING).*' -o | grep -P '\\d*' -o` //f