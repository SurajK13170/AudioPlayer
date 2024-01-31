function CourseCard({ title, description, image, onClick }) {
  return (
    <div
      style={{
        minWidth: "100%",
        overflowY: "auto",
        direction: "flex",
      }}
      onClick={onClick}
    >
      <img
        src={image}
        alt=""
        style={{
          width: "100%",
          aspectRatio: "16/9",
          objectFit: "cover",
          borderRadius: 3,
          flexShrink: 0,
        }}
        draggable={false}
      />
      <h3 style={{ color: "white", marginBottom: 0 }}>{title}</h3>
      <small style={{ color: "grey" }}>{description}</small>
    </div>
  );
}

export default CourseCard;
