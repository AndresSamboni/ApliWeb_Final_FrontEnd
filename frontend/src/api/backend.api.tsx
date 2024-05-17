// IMPORT CONSTANTS
import { URL } from './constants';

export async function fetchData(endPoint: string, setState: Function, data = {}) {
  const result = await fetch(URL + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  setState(await result.json());
}
