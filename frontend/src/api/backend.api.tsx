// URL TO CONNECT THE BACKEND
const URL = "http://localhost:3000";

export async function fetchData(endPoint: string, setState: Function) {
  const result = await fetch(URL + endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  setState(await result.json());
}
