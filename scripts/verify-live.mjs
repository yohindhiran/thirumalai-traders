import https from "https";

const BASE_URL = "https://thirumalai-traders.vercel.app";

async function postJson(path, body, cookie = "") {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const url = new URL(path, BASE_URL);
    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
          ...(cookie ? { Cookie: cookie } : {}),
        },
      },
      (res) => {
        let buf = "";
        res.on("data", (chunk) => (buf += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: buf,
          });
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function getJson(path, cookie = "") {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = https.request(
      url,
      {
        method: "GET",
        headers: {
          ...(cookie ? { Cookie: cookie } : {}),
        },
      },
      (res) => {
        let buf = "";
        res.on("data", (chunk) => (buf += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: buf,
          });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function deleteJson(path, cookie = "") {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = https.request(
      url,
      {
        method: "DELETE",
        headers: {
          ...(cookie ? { Cookie: cookie } : {}),
        },
      },
      (res) => {
        let buf = "";
        res.on("data", (chunk) => (buf += chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: buf,
          });
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function run() {
  console.log("=== Testing Thirumalai Traders Live Deployment ===");
  
  // 1. Check About page
  console.log("\n1. Checking /about page...");
  const aboutRes = await getJson("/about");
  console.log("Status:", aboutRes.status);
  const hasSupplyTitle = aboutRes.body.includes("We Are Supply Across");
  const hasErode = aboutRes.body.includes("Erode");
  const hasCoimbatore = aboutRes.body.includes("Coimbatore");
  const hasTirupur = aboutRes.body.includes("Tirupur");
  const hasSalem = aboutRes.body.includes("Salem");
  const hasNamakkal = aboutRes.body.includes("Namakkal");
  console.log("Contains 'We Are Supply Across':", hasSupplyTitle);
  console.log("Contains all 5 pinned locations (Coimbatore, Erode, Tirupur, Salem, Namakkal):", 
    hasErode && hasCoimbatore && hasTirupur && hasSalem && hasNamakkal);

  // 2. Admin Login
  console.log("\n2. Testing Admin Login...");
  const loginRes = await postJson("/api/admin/login", {
    email: "admin@thirumalaaitraders.com",
    password: "admin123",
  });
  console.log("Login status:", loginRes.status);
  const setCookie = loginRes.headers["set-cookie"];
  const cookie = Array.isArray(setCookie) ? setCookie[0].split(";")[0] : "";
  console.log("Got auth cookie:", Boolean(cookie));

  if (!cookie) {
    console.error("Login failed, aborting further admin tests.");
    return;
  }

  // 3. Test Hero Slide Add
  console.log("\n3. Testing Hero Slide Add (POST /api/admin/hero)...");
  const testSlide = {
    title: "Test Live Wholesale Delivery Banner",
    subtitle: "Fastest Wholesale Supply in Kongu Belt",
    image: "/images/hero-warehouse.jpg",
    buttonText: "Order Now",
    buttonLink: "/products",
  };
  const addSlideRes = await postJson("/api/admin/hero", testSlide, cookie);
  console.log("Add slide status:", addSlideRes.status);
  let createdSlideId = null;
  try {
    const json = JSON.parse(addSlideRes.body);
    createdSlideId = json.slide?.id;
    console.log("Created slide ID:", createdSlideId);
  } catch (e) {
    console.log("Add slide response:", addSlideRes.body);
  }

  // 4. Verify slide exists in hero list
  console.log("\n4. Verifying slide persisted in cloud database...");
  const listSlideRes = await getJson("/api/admin/hero", cookie);
  console.log("List slides status:", listSlideRes.status);
  const slideListJson = JSON.parse(listSlideRes.body);
  const found = slideListJson.slides?.some((s) => s.id === createdSlideId);
  console.log("Slide found in persistent database:", found);

  // 5. Clean up test slide
  if (createdSlideId) {
    console.log("\n5. Cleaning up test slide (DELETE /api/admin/hero/" + createdSlideId + ")...");
    const delRes = await deleteJson("/api/admin/hero/" + createdSlideId, cookie);
    console.log("Delete status:", delRes.status);
  }

  console.log("\n=== Live Verification Complete ===");
}

run().catch(console.error);
