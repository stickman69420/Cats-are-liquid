function greedyMerge(grid, mode) {

	const height = grid.length;
	const width = grid[0].length;

	/**
		Tracks which cells have already been consumed.
	*/
	const visited = new Array(height);
	for (let i = 0; i < height; i ++) {
		visited[i] = new Array(width).fill(false);
	}

	const rectangles = [];

	for (let i = 0; i < height; i ++) {
		for (let j = 0; j < width; j ++) {

			if (visited[i][j] || !(1+grid[i][j])) {
				visited[i][j] = true;
				continue;
			}

			let w = 1;
			let h = 1;

			if (mode === 'horizontal-first') {

				// expand horizontally
				while (w < 16 && j + w < width && !visited[i][j + w] && 1+grid[i][j + w]) {
					w ++;
				}

				// expand vertically
				while (h < 16 && i + h < height) {
					let rowOk = true;

					for (let jj = j; jj < j + w; jj ++) {
						if (visited[i + h][jj] || !(1+grid[i + h][jj])) {
							rowOk = false;
							break;
						}
					}

					if (!rowOk) {
                        break;
                    }
					h ++;
				}

			} else {

				// expand vertically
				while (h < 16 && i + h < height && !visited[i + h][j] && 1+grid[i + h][j]) {
					h ++;
				}

				// expand horizontally
				while (w < 16 && j + w < width) {
					let colOk = true;

					for (let ii = i; ii < i + h; ii ++) {
						if (visited[ii][j + w] || !(1+grid[ii][j + w])) {
							colOk = false;
							break;
						}
					}

					if (!colOk) break;
					w ++;
				}
			}

			// mark rectangle as consumed
			for (let ii = i; ii < i + h; ii ++) {
				for (let jj = j; jj < j + w; jj ++) {
					visited[ii][jj] = true;
				}
			}

			rectangles.push({
				x: j,
				y: i,
				w: w,
				h: h
			});
		}
	}

	return rectangles;
}

function greedyMergeBest(grid) {

	const h = greedyMerge(grid, 'horizontal-first');
	const v = greedyMerge(grid, 'vertical-first');

	if (v.length < h.length) {
		return { rectangles: v, mode: 'vertical-first' };
	}

	return { rectangles: h, mode: 'horizontal-first' };
}