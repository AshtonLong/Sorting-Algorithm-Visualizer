const arrayContainer = document.getElementById('arrayContainer');
const arraySizeInput = document.getElementById('arraySize');
const algorithmSelect = document.getElementById('algorithm');
const algorithmInfo = document.getElementById('algorithmInfo');
let array = [];
const delay = 1;

document.addEventListener('DOMContentLoaded', () => {
    generateRandomArray();
    updateAlgorithmInfo();
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function updateArraySizeDisplay(value) {
    document.getElementById('arraySizeDisplay').innerText = value;
    generateRandomArray();
}

function updateAlgorithmInfo() {
    const algorithm = algorithmSelect.value;
    let info = '';
    switch (algorithm) {
        case 'bubbleSort':
            info = 'Bubble Sort: A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Time complexity: O(n²).';
            break;
        case 'selectionSort':
            info = 'Selection Sort: Divides the input list into two parts: a sorted sublist and a remaining unsorted sublist. It repeatedly selects the smallest element from the unsorted sublist and moves it to the end of the sorted sublist. Time complexity: O(n²).';
            break;
        case 'insertionSort':
            info = 'Insertion Sort: Builds a sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms. Time complexity: O(n²).';
            break;
        case 'quickSort':
            info = 'Quick Sort: An efficient, in-place sorting algorithm, with an average-case time complexity of O(n log n). It works by selecting a "pivot" element and partitioning the array around the pivot.';
            break;
    }
    algorithmInfo.innerText = info;
}

function generateRandomArray() {
    const size = arraySizeInput.value;
    array = Array.from({ length: size }, () => Math.floor(Math.random() * size) + 1);
    render(array);
}

function render(array) {
    arrayContainer.innerHTML = '';
    const viewportWidth = window.innerWidth * 0.9;
    const maxBarHeight = 300;
    const barWidth = Math.max(viewportWidth / array.length - 1, 2);
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${barWidth}px`;
        bar.style.height = `${(value / Math.max(...array)) * maxBarHeight}px`;
        arrayContainer.appendChild(bar);
    });
}

async function sort() {
    
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort(array, render, delay);
            break;
        case 'selectionSort':
            await selectionSort(array, render, delay);
            break;
        case 'insertionSort':
            await insertionSort(array, render, delay);
            break;
        case 'quickSort':
            await quickSort(array, 0, array.length - 1, render, delay);
            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
