export async function fetcher(...args) {
  let res = undefined;
  try {
    res = await fetch(...args);
    res = res.json();
  } catch (e) {
    res = undefined;
  }
  return res;
}
