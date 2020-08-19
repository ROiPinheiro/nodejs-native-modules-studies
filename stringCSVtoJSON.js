export function stringCSVtoJSON(stringCSV) {
  const values = stringCSV.split("\n").map((line) => line.split(","));
  const jsonResult = [];

  const keys = values[0];

  for (let line = 1; line < values.length; line++) {
    jsonResult.push({});

    for (let column = 0; column < values[line].length; column++) {
      jsonResult[line - 1][keys[column].trim().toLocaleLowerCase()] = values[
        line
      ][column].trim();
    }
  }

  return JSON.stringify(jsonResult);
}
