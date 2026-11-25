import app from "./app.js";
import { ENV } from "./config/env.js";
app.listen(ENV.PORT, () => {
    console.log(`local server is running on port ${ENV.PORT}`);
});
