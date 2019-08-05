let font_size = 16;

const setFontSize = (new_font_size) => {
    font_size = new_font_size;
};

const parse = size => `${size / font_size}rem`;

export { setFontSize, parse };
