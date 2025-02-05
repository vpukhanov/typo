# Типограф (Russian typography script)

*Documentation below will remain in russian since this package is language-specific and seems to be needed by russian-speaking users only.*

Cкрипт для расстановки переносов и привязывания предлогов в русскоязычных текстах.


## Installation

```
npm install ru-typo
```


## Usage

По умолчанию привязываются предлоги, тире заменяется на широкое:
```js
typo(string)
```

| Before | After |
| --- | --- |
| *не в силах выдержать несовершенства мира - закрыл я очи* | *не![](assets/space.png)в![](assets/space.png)силах выдержать несовершенства мира![](assets/space.png)&mdash; закрыл я очи* |

## Options


### digits

При достаточно широкой колонке цифры привязываются с двух сторон:

```js
typo(string, { digits: true })
```

| Before | After |
| --- | --- |
| *...купите 200 граммов водки и 30 граммов огурца* | *...купите![](assets/space.png)200![](assets/space.png)граммов водки и![](assets/space.png)30![](assets/space.png)граммов огурца* |

### digitsR

Привязывает цифры слева:

```js
typo(string, { digitsR: true })
```
| Before | After |
| --- | --- |
| *...купите 200 граммов водки и 30 граммов огурца* | *...купите 200![](assets/space.png)граммов водки и 30![](assets/space.png)граммов огурца* |


### header

В заголовках приклеиваются длинные предлоги:
```js
typo(string, { header: true })
```
| Before | After |
| --- | --- |
| *Как ничего не понять и не подать виду* | *Как![](assets/space.png)ничего не![](assets/space.png)понять и![](assets/space.png)не![](assets/space.png)подать виду* |


### hyphen

Обратите внимание, в части браузеров на сегодня уже работают нативные css переносы (с указанным в html языком): https://developer.mozilla.org/ru/docs/Web/CSS/hyphens#Browser_compatibility

расстановка переносов:
```js
typo(string, { hyphens: true })
```
| Before | After |
| --- | --- |
| В это время Ленин скрывается на конспиративной квартире. |  ```В&nbsp;это вре&shy;мя Ле&shy;нин скры&shy;ва&shy;ет&shy;ся на&nbsp;кон&shy;спи&shy;ратив&shy;ной квар&shy;ти&shy;ре.``` |

Регулярные выражения для переносов взяты с http://vyachet.ru/hyphen-russian-html-text/ (модифицированный алгоритм Христова).
