// Function for printing formatted matrices, for debugging
const printMatrix = (matrix: number[][]) => {
  for (let row = 0; row < matrix.length; row++) {
    let rowString = "[";
    for (let col = 0; col < matrix.length; col++) {
      rowString += matrix[row][col] + (col + 1 == matrix.length ? "]" : ", ");
    }
    console.log(rowString);
  }
  console.log("_________");
};

// Assume this is a square matrix
const determinant = (matrix: number[][]) => {
  if (matrix.length == 1) return matrix[0][0];
  else if (matrix.length == 2)
    return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
  else {
    // Ensure there are no 0s in the diagonal, as that could break the algorithm
    let hasSwapHappened = false;
    for (
      let diagonalIndex = 0;
      diagonalIndex < matrix.length - 1;
      diagonalIndex++
    ) {
      if (matrix[diagonalIndex][diagonalIndex] != 0) continue;

      // Find a non zero element in the column below
      let swapRow = -1;
      for (let row = diagonalIndex + 1; row < matrix.length; row++) {
        if (matrix[row][diagonalIndex] != 0) {
          swapRow = row;
          break;
        }
      }

      // Matrix's determinant is 0
      if (swapRow == -1) return 0;

      // Swap rows
      let temp = matrix[diagonalIndex];
      matrix[diagonalIndex] = matrix[swapRow];
      matrix[swapRow] = temp;

      hasSwapHappened = !hasSwapHappened;
    }

    // Gaussian elimination
    for (
      let diagonalIndex = 0;
      diagonalIndex < matrix.length - 1;
      diagonalIndex++
    ) {
      // Zero elements under matrix[diagonalIndex][diagonalIndex]
      for (let row = diagonalIndex + 1; row < matrix.length; row++) {
        // Add matrix[diagonalIndex] to matrix[row] with some factor
        let factor =
          (matrix[row][diagonalIndex] / matrix[diagonalIndex][diagonalIndex]) *
          -1;
        matrix[row][diagonalIndex] = 0;

        for (let col = diagonalIndex + 1; col < matrix.length; col++) {
          matrix[row][col] += factor * matrix[diagonalIndex][col];
        }
      }
    }

    let determinant = 1;
    for (
      let diagonalIndex = 0;
      diagonalIndex < matrix.length;
      diagonalIndex++
    ) {
      determinant *= matrix[diagonalIndex][diagonalIndex];
    }

    if (hasSwapHappened) determinant *= -1;
    return determinant;
  }
};

export { printMatrix, determinant };
