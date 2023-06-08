function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}
