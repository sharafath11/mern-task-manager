export default function NotFound() {
  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
        The page you're looking for does not exist.
      </p>
      <a 
        href="/" 
        style={{
          padding: "8px 16px",
          border: "1px solid #000",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Go back home
      </a>
    </div>
  );
}
