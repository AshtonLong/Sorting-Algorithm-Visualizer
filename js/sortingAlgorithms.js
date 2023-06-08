const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function playSound(frequency) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
}

async function bubbleSort(array, render, delay) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                await playSound(array[j] * 10);
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                await render(array);
                await sleep(delay);
            }
        }
    }
}

async function selectionSort(array, render, delay) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        await playSound(array[minIndex] * 10);
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        await render(array);
        await sleep(delay);
    }
}

async function insertionSort(array, render, delay) {
    let n = array.length;
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            await playSound(array[j] * 10);
            array[j + 1] = array[j];
            j = j - 1;
            await render(array);
            await sleep(delay);
        }
        array[j + 1] = key;
    }
}

async function quickSort(array, left, right, render, delay) {
    if (left < right) {
        let pivotIndex = await partition(array, left, right, render, delay);
        await quickSort(array, left, pivotIndex - 1, render, delay);
        await quickSort(array, pivotIndex + 1, right, render, delay);
    }
}

async function partition(array, left, right, render, delay) {
    let pivot = array[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
            await playSound(array[j] * 10);
            [array[i], array[j]] = [array[j], array[i]];
            await render(array);
            await sleep(delay);
            i++;
        }
    }
    await playSound(array[i] * 10);
    [array[i], array[right]] = [array[right], array[i]];
    await render(array);
    await sleep(delay);
    return i;
}

async function bogosort(array, render, delay) {
    while (!isSorted(array)) {
        await shuffle(array, playSound);
        await render(array);
        await sleep(delay);
    }
}

function isSorted(array) {
    for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
            return false;
        }
    }
    return true;
}

async function shuffle(array, playSound) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        await playSound(array[j] * 10);
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function heapSort(array, render, delay) {
    let n = array.length;

    // Build a max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i, render, delay);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        await playSound(array[0] * 10);
        [array[0], array[i]] = [array[i], array[0]];
        await render(array);
        await sleep(delay);

        // Call max heapify on the reduced heap
        await heapify(array, i, 0, render, delay);
    }
}

async function heapify(array, n, i, render, delay) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await playSound(array[largest] * 10);
        [array[i], array[largest]] = [array[largest], array[i]];
        await render(array);
        await sleep(delay);

        await heapify(array, n, largest, render, delay);
    }
}

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

async function treeSort(array, render, delay) {
    // Build a binary search tree
    let root = null;
    for (let value of array) {
        root = await insertToBST(root, value, render, delay);
    }

    // Perform in-order traversal and update array
    let index = 0;
    await inOrderTraversal(root, array, () => index++, render, delay);
}

async function insertToBST(node, value, render, delay) {
    if (!node) {
        await playSound(value * 10);
        return new TreeNode(value);
    }

    if (value < node.value) {
        node.left = await insertToBST(node.left, value, render, delay);
    } else {
        node.right = await insertToBST(node.right, value, render, delay);
    }

    return node;
}

async function inOrderTraversal(node, array, updateIndex, render, delay) {
    if (!node) {
        return;
    }

    await inOrderTraversal(node.left, array, updateIndex, render, delay);

    await playSound(node.value * 10);
    array[updateIndex()] = node.value;
    await render(array);
    await sleep(delay);

    await inOrderTraversal(node.right, array, updateIndex, render, delay);
}

async function mergeSort(array, left, right, render, delay) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(array, left, mid, render, delay);
        await mergeSort(array, mid + 1, right, render, delay);
        await merge(array, left, mid, right, render, delay);
    }
}

async function mergeSort(array, start, end, render, delay) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);

        await mergeSort(array, start, mid, render, delay);
        await mergeSort(array, mid + 1, end, render, delay);

        await merge(array, start, mid, end, render, delay);
    }
}

async function merge(array, start, mid, end, render, delay) {
    const leftSize = mid - start + 1;
    const rightSize = end - mid;

    const left = new Array(leftSize);
    const right = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) {
        left[i] = array[start + i];
    }
    for (let j = 0; j < rightSize; j++) {
        right[j] = array[mid + 1 + j];
    }

    let i = 0, j = 0, k = start;
    while (i < leftSize && j < rightSize) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }

        await playSound(array[k] * 10); // Add sound
        await render(array, [k]);
        await sleep(delay);
        k++;
    }

    while (i < leftSize) {
        array[k] = left[i];
        await playSound(array[k] * 10); // Add sound
        await render(array, [k]);
        await sleep(delay);
        i++;
        k++;
    }

    while (j < rightSize) {
        array[k] = right[j];
        await playSound(array[k] * 10); // Add sound
        await render(array, [k]);
        await sleep(delay);
        j++;
        k++;
    }
}

async function shellSort(array, render, delay) {
    const n = array.length;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i++) {
            const temp = array[i];
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
                await render(array, [j, j-gap]);
                await playSound(array[j] * 10); // Add sound
                await sleep(delay);
            }
            array[j] = temp;
            await playSound(array[j] * 10); // Add sound
        }
    }
}

async function cocktailSort(array, render, delay) {
    const n = array.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;

    while (swapped) {
        swapped = false;

        for (let i = start; i < end; i++) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await render(array, [i, i+1]);
                await playSound(array[i] * 10); // Add sound
                await sleep(delay);
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;

        for (let i = end - 1; i >= start; i--) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await render(array, [i, i+1]);
                await playSound(array[i] * 10); // Add sound
                await sleep(delay);
            }
        }
        start++;
    }
}