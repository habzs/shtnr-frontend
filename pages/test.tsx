async function postData(data = {}) {
  const url = "http://localhost:4000/full";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await response.json(); // parses JSON response into native JavaScript objects
  console.log("json", json);
  return json;
}

async function handler(data: {}) {
  let test = postData(data);
  console.log("test", test);
}

const Test = () => {
  return (
    <div>
      <h1>test</h1>
      <button className="button" onClick={() => handler({ shtnd_url: "5755" })}>
        asdfasdfasdfasdfasdaskfjhsdalkjfhaskjfhalskfhlkasjdfhkjasdf force
        deployment
      </button>
    </div>
  );
};

export default Test;
