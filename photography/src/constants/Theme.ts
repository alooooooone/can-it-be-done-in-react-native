const colors = {
    blue: '#4FAEF6',
    grey: '#ACAAAD',

    default: '#1B2031',
    h1: '#1B2031',
    h2: '#1B2031',
    h3: '#1B2031',
    title: '#ACAAAD',
    header: '#1B2031',
    content: '#ACAAAD',
    bio: '#ACAAAD',
    caption: '#ACAAAD',
    small: '#ACAAAD',
    big: '#1B2031'
}
const sizes = {
    margin: 15,
    padding: 15,

    default: 14,
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    content: 14,
    bio: 13,
    caption: 12,
    small: 10,
    big: 30
}
const fonts = {
    default: generatorFonts('default'),
    h1: generatorFonts('h1'),
    h2: generatorFonts('h2'),
    h3: generatorFonts('h3'),
    title: generatorFonts('title'),
    header: generatorFonts('header'),
    content: generatorFonts('content'),
    bio: generatorFonts('bio'),
    caption: generatorFonts('caption'),
    small: generatorFonts('small'),
    big: generatorFonts('big'),
}
const Theme = {
    colors,
    sizes,
    fonts
}

function generatorFonts(name: string):any {
    return {
        fontSize: sizes[name],
        lineHeight: sizes[name] * 1.5,
        color: colors[name],
    }
}

export default Theme;