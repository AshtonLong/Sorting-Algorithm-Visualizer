const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function playSound(frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
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
