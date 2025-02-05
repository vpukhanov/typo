const any = '[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]'
const vowel = '[аеёиоуыэюя]'
const consonant = '[бвгджзклмнпрстфхцчшщ]'
const sign = '[йъь]'
const shy = '&shy;' // '\xAD'
const nonBreakingHyphen = '&#8209;'

const preposiciones = {
  corto: 'и|а|в|к|у|с|о|не|но|на|из|от|об|до|по|во|за|со',
  largo: 'над|под|как',
}

const patterns: Record<string, Array<[RegExp, string]>> = {
  common: [
    [new RegExp(' (-|–|—) ', 'g'), '&nbsp;&mdash; '],
    [new RegExp(' {2}', 'g'), ' '],
    [new RegExp('-(й|я|е) ', 'g'), `${nonBreakingHyphen}$1 `], // TODO TESTS
    [new RegExp('-(й|я|е) ', 'g'), `${nonBreakingHyphen}$1$nbsp;`], // TODO TESTS
    [new RegExp(` (${preposiciones.corto}) `, 'gi'), ' $1&nbsp;'],
    [new RegExp(`&nbsp;(${preposiciones.corto}) `, 'gi'), '&nbsp;$1&nbsp;'],
    [new RegExp(`^(${preposiciones.corto}) `, 'gi'), '$1&nbsp;'],
  ],

  digits: [
    [new RegExp(' (\\d+) ', 'g'), '&nbsp;$1&nbsp;'],
    [new RegExp('&nbsp;(\\d+) ', 'g'), '&nbsp;$1&nbsp;'], // TODO TESTS
  ],

  digitsR: [[new RegExp(' (\\d+) ', 'g'), ' $1&nbsp;']],

  // LIKELY TO BE RENAMED AND EXTENDED (FOR MORE GENERAL DASH HANDLING),
  // USE WITH CAUTION
  ndash: [[new RegExp('-', 'g'), '&ndash;']], // TODO DOC SECTION

  header: [[new RegExp(` (${preposiciones.largo}) `, 'gi'), ' $1&nbsp;']],

  hyphens: [
    [new RegExp(`(${sign})(${any}${any})`, 'ig'), `$1${shy}$2`],
    [new RegExp(`(${vowel})(${vowel}${any})`, 'ig'), `$1${shy}$2`],
    [
      new RegExp(`(${vowel}${consonant})(${consonant}${vowel})`, 'ig'),
      `$1${shy}$2`,
    ],
    [
      new RegExp(`(${consonant}${vowel})(${consonant}${vowel})`, 'ig'),
      `$1${shy}$2`,
    ],
    [
      new RegExp(
        `(${vowel}${consonant})(${consonant}${consonant}${vowel})`,
        'ig'
      ),
      `$1${shy}$2`,
    ],
    [
      new RegExp(
        `(${vowel}${consonant}${consonant})(${consonant}${consonant}${vowel})`,
        'ig'
      ),
      `$1${shy}$2`,
    ],
  ],
}

const defaults = {
  hyphens: false,
  digits: false,
  digitsR: false,
  header: false,
}

// typo :: String -> Object -> String
export default function typo<T>(
  s: T,
  options: Partial<typeof defaults> = defaults
): T | string {
  if (s == null || typeof s !== 'string') {
    return s
  }

  const P = Object.keys(patterns).reduce((acc, key) => {
    return options[key] ? acc.concat(patterns[key]) : acc
  }, patterns.common)

  return P.reduce((acc, p) => acc.replace(p[0], p[1]), s)
}
