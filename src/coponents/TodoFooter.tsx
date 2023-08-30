export function TodoFooter(): JSX.Element {
  return (
    <footer className="footer">
      <p>
        Check out my frontend repo{" "}
        <a
          className="repoLinks"
          href="https://github.com/HoKeiL/todo-app-frontend"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>{" "}
        and my backend repo{" "}
        <a
          className="repoLinks"
          href="https://github.com/HoKeiL/todo-app-backend"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>{" "}
      </p>
    </footer>
  );
}
