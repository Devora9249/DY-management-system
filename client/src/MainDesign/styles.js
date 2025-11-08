export const cardStyle = {
  borderRadius: 3,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  p: 2,
  bgcolor: "#fff",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },
};

export const tableContainerStyle = {
  mt: 4,
  maxWidth: 1000,
  mx: "auto",
  borderRadius: 3,
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  overflow: "hidden",
  backgroundColor: "#fafafa",
};

export const sectionTitleStyle = {
  px: 2,
  pt: 2,
  color: "primary.main", 
  fontWeight: 700,
  textAlign: "center",
};
