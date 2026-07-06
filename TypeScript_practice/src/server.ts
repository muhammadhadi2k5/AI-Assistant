import { createApp } from './app';

const app = createApp();
const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Student API listening on http://localhost:${port}`);
});
