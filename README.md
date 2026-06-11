# Установка
```shell
npm i -g html-minifier lightningcss-cli lightningcss prettier sass terser
sudo apt install webp libavif-bin
```

# Сжатие картинок
```shell
cd assets
for f in *.png; do cwebp -q 85 "$f" -o "${f%.png}.webp"; done
for f in *.png; do avifenc -q 60 -s 5 -j all "$f" "${f%.png}.avif"; done
```

## Форматирование:

`npx prettier index.html style.scss script.js --write --single-quote`

## Билд + Минификация

`sass style.scss dist/style.css`

`npx lightningcss --minify --bundle dist/style.css -o dist/style.css`

`html-minifier index.html --collapse-whitespace --decode-entities --remove-comments --minify-js true -o dist/index.html`

`terser script.js -o dist/script.js`

## Что есть

- Pixel perfect, относительный, так как вымерять `letter-spacing` дробные сотые части пикселя смысла не вижу
- Довольно строгое следование BEM методологии
- Рабочий функционал фильтров и подгрузки
- Адаптивная верстка без единого `@media queries`
- Картинки в современных форматах
- Svg иконки сжаты через svgo вручную
- Сохранение состояний фильтров в URL
- В скрипте управление фильром и поиском через `proxy + push` стратегию

## Что можно улучшить

- Работать с нативным css вместо scss, современных возможностей вполне хватает даже для больших проектов на БЭМ. В задаче требование использовать scss, подразумевается использование nesting class names, что мешает ориентироваться в файле стилей
- Если есть картинки в лучшем качестве, то использовать их для разной плотности экранов с `<source srcset="cover@2x.avif 2x" ...>`
- Можно подкрутить доступность, накидать `role` и `aria` атрибутов
- Добавить переходов для `:hover`
- Добавить отдельную render функцию для подгрузки, чтоб контент полностью не заменялся и не моргал
- Добавить для кнопки загрузить еще фейковую задержку, чтоб показать состояние загрузки
- Использовать локальные шрифты, вместо Google fonts
- Переделать render функцию на `document.createElement` (по вкусу)
