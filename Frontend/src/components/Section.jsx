function Section({ children, title, description, style }) {
  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ color: "white", marginBottom: 5 }}>{title}</h2>
      <small style={{ color: "grey" }}>{description}</small>
      <div
        style={{
          margin: "20px 0",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Section;
