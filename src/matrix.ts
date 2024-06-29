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

    return determinant;
  }
};

export { printMatrix, determinant };
