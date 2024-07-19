export default async function fetchIP() {
  async function getPublicIP() {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  }

  const ip = await getPublicIP();

  return (
    <>
      <div className="">Public IP Address : {ip}</div>
    </>
  );
}
