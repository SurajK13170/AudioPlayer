function TweetCard({ name, image, title }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        padding: "5px 10px",
        borderRadius: 3,
        justifyContent: "space-between",
        marginTop: 20,
        minWidth: "100%",
      }}
    >
      <img src={image} style={{ height: 150, borderRadius: 5 }} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            backgroundColor: "#2E3035",
            width: 70,
            borderRadius: 30,
            textAlign: "center",
            color: "white",
            fontSize: 12,
            padding: "5px 0",
          }}
        >
          Product
        </div>
        <h3 style={{ marginBottom: 0, color: "white" }}>{title}</h3>
        <p style={{ marginTop: 10, color: "grey" }}>{name}</p>
      </div>
    </div>
  );
}

export default TweetCard;
