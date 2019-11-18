const parser = (index_label, index_value, array) => array.map(item => ({
    label: item[index_label],
    value: item[index_value],
}));

export { parser };
