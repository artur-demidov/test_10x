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
