/**
 * Recursive Binary Search implementation with two parameters
 * @param arr - Input array to search in
 * @param target - Value to find
 * @returns index of target if found, -1 if not found
 */
export function recursiveBinarySearch(arr: number[], target: number): number {
    // Base case: if array is empty
    if (arr.length === 0) {
        return -1;
    }

    // Calculate middle index
    const mid = Math.floor(arr.length / 2);

    // Found the target
    if (arr[mid] === target) {
        return mid;
    }

    // If target is less than middle element, search left half
    if (target < arr[mid]) {
        return recursiveBinarySearch(arr.slice(0, mid), target);
    }

    // If target is greater than middle element, search right half
    const result = recursiveBinarySearch(arr.slice(mid + 1), target);
    // Adjust the index for the right half slice
    return result === -1 ? -1 : result + mid + 1;
}

// Example usage:
// const arr = [1, 3, 5, 7, 9, 11, 13, 15];
// console.log(recursiveBinarySearch(arr.sort((a, b) => a - b), 7));  // Output: 3
// console.log(recursiveBinarySearch(arr.sort((a, b) => a - b), 10)); // Output: -1 