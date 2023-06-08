const arrayContainer = document.getElementById('arrayContainer');
const arraySizeInput = document.getElementById('arraySize');
const algorithmSelect = document.getElementById('algorithm');
const algorithmInfo = document.getElementById('algorithmInfo');
let array = [];
let delay = 1;

let volume = 0.5;

function changeVolume(value) {
    volume = value / 100;
}

function changeSpeed(value) {
    delay = value;
}

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
        case 'bogosort':
            info = 'Bogosort: A highly inefficient sorting algorithm that randomly permutes the elements until they are sorted. Time complexity: O((n+1)!).';
            break;
        case 'heapSort':
            info = 'Heap Sort: An efficient comparison-based sorting algorithm. It works by building a max heap and then repeatedly extracting the maximum element and moving it to the end of the array. Time complexity: O(n log n).';
            break;
        case 'treeSort':
            info = 'Tree Sort: This algorithm builds a binary search tree from the elements in the array, and then traverses the tree in-order to produce a sorted sequence. Time complexity: Average case O(n log n), worst case O(n²).';
            break;
        case 'mergeSort':
            info = 'Merge Sort: An efficient, divide and conquer algorithm that divides the array into halves, sorts them, and merges them. Time complexity: O(n log n).';
            break;
        case 'shellSort':
            info = 'Shell Sort: A generalization of insertion sort that sorts elements that are far apart. Time complexity: Between O(n) and O(n²).';
            break;
        case 'cocktailSort':
            info = 'Cocktail Sort: A variation of Bubble Sort. It sorts the array in both directions each pass through the list. Time complexity: O(n²).';
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
    const maxBarHeight = 300;
    const containerWidth = arrayContainer.offsetWidth;
    const maxWidthPerBar = containerWidth / array.length - 2;

    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${maxWidthPerBar}px`;
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
        case 'bogosort':
            await bogosort(array, render, delay);
            break;
        case 'heapSort':
            await heapSort(array, render, delay);
            break;
        case 'treeSort':
            await treeSort(array, render, delay);
            break;
        case 'mergeSort':
            await mergeSort(array, 0, array.length - 1, render, delay);
            break;
        case 'shellSort':
            await shellSort(array, render, delay);
            break;
        case 'cocktailSort':
            await cocktailSort(array, render, delay);
            break;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener("resize", () => render(array));