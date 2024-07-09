export async function getVideoByKeyword(url, func, key) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": key,
        }
    });
    const respData = await resp.json();
    console.log(respData)
    func(respData)
  }