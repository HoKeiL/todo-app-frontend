export const baseUrl =
    process.env.NODE_ENV === "production"
        ? "http://hokeil-todo-app.onrender.com"
        : "http://localhost:5000";