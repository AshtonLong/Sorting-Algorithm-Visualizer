# Sorting Algorithm Visualizer

This is a simple web-based application that visualizes various sorting algorithms. It allows you to generate a random array of numbers, select a sorting algorithm, and observe the sorting process in real-time through visual representations of the array.

## Features

- Generate a new random array with a specified size.
- Choose from different sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, and Quick Sort.
- Toggle dark mode for a different visual experience.
- View information about each sorting algorithm.
- Visualize the sorting process with dynamically updated bars representing the array elements.

## Installation

To use the Sorting Algorithm Visualizer, follow the steps below:

1. Clone the repository

2. Open the `index.html` file in your web browser.

## Usage

1. Open the `index.html` file in your web browser.

2. Use the controls on the page to interact with the visualizer:

   - Click the "Generate New Array" button to create a new random array.
   - Adjust the "Array Size" slider to set the size of the array.
   - Select a sorting algorithm from the dropdown menu.
   - Click the "Sort" button to start the sorting process.
   - Toggle the "Dark Mode" switch to change the visual theme.

3. The array will be displayed as a series of bars, with each bar representing an element of the array. The height of each bar corresponds to the value of the array element.

4. As the sorting algorithm progresses, you will see the bars moving and changing color to reflect the changes in the array.

5. The algorithm information section provides a brief description of each sorting algorithm to help you understand their respective behaviors and time complexities.

## Customization

You can modify the visualizer's behavior and appearance by making changes to the code. The following files are included in the repository:

- `index.html`: The main HTML file that defines the structure of the visualizer.
- `css/styles.css`: The CSS file that controls the visual styling of the page.
- `js/main.js`: The JavaScript file that contains the logic for generating the array, rendering the bars, and handling user interactions.
- `js/sortingAlgorithms.js`: The JavaScript file that implements the sorting algorithms used by the visualizer.

Feel free to explore and modify these files to suit your needs.

## Contributing

Contributions to the Sorting Algorithm Visualizer are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```shell
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them with a descriptive message.

4. Push your changes to your branch:

   ```shell
   git push origin feature/your-feature-name
   ```

5. Open a pull request on the original repository.

Please ensure that your contributions adhere to the repository's code style and that they do not introduce any breaking changes.

## License

The Sorting Algorithm Visualizer is open-source software licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as per the terms of the license.

## Acknowledgements

The Sorting Algorithm Visualizer was developed using HTML, CSS, and JavaScript. It utilizes the following libraries and resources:

- [Font Awesome](https://fontawesome.com/) - Icons used in the user interface.
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Used for generating audio during the sorting process.
