import { Hono } from "hono";

const app = new Hono();

let state = 0;

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/stateless-add", (c) => {
  const x = +(c.req.query("x") || 0);
  if (isNaN(x)) {
    return c.text("Invalid X");
  }

  const y = +(c.req.query("y") || 0);
  if (isNaN(y)) {
    return c.text("Invalid Y");
  }
  const result = x + y;

  return c.json({ result });
});

app.get("/add", (c) => {
  const x = +(c.req.query("x") || 0);
  const result = state + 2 + x;
  state = result;
  return c.json({ result });
});

app.get("/reset", (c) => {
  state = 0;
  return c.text("Zurück gesetzt");
});

export default app;
