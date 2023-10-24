let array = [];
const arrayContainer = document.getElementById("array-container");

function generateArray() {
    for (let i = 0; i < 20; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
        const bar = document.createElement("div");
        bar.style.height = `${array[i] * 3}px`;
        bar.classList.add("bar");
        arrayContainer.appendChild(bar);
    }
}

function startSort() {
    quickSort(array, 0, array.length - 1);
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await Promise.all([
            quickSort(arr, low, pivotIndex - 1),
            quickSort(arr, pivotIndex + 1, high),
        ]);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);
        }
    }

    await swap(arr, i + 1, high);
    return i + 1;
}

async function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    const bars = document.querySelectorAll(".bar");
    const bar1 = bars[i];
    const bar2 = bars[j];

    await sleep(100); // Delay for visualization
    arrayContainer.insertBefore(bar2, bar1);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = () => {
    generateArray();
};

