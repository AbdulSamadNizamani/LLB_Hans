
import { useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";

const ShowNotes = () => {
  const notesData = useSelector((state) => state.notes.Notes); 
  const navigate = useNavigate(); 
  
  useEffect(() => {
    if (!notesData || notesData.length === 0) {
      navigate('/getnotes'); 
    }
  }, [notesData, navigate]);

  if (!notesData || notesData.length === 0) {
    return null; // This prevents ShowNotes from rendering until the data is available
  }

  console.log('Notes Got Successfully', notesData);

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Show Notes 📚
      </Typography>

      {Array.isArray(notesData) && notesData.length > 0 ? (
        <Grid
          container
          spacing={3}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
            paddingBottom: "50px",
          }}
        >
          {notesData.map((note, index) => (
            <Grid item key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card
                  sx={{
                    boxShadow: 5,
                    borderRadius: 4,
                    overflow: "hidden",
                    height: "100%",
                    backgroundColor: "#fafafa",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image="/image/notesimg8.jpg"
                    alt="Notes"
                    sx={{
                      objectFit: "cover",
                      borderBottom: "2px solid #ddd",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Subject: {note.subjectName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Department: {note.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Semester: {note.semester} | Year: {note.year}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        mt: 2,
                        padding: "10px",
                        fontSize: "16px",
                        textTransform: "none",
                        borderRadius: "25px",
                      }}
                      onClick={() => handleDownload(note.file)}
                    >
                      Download 📥
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center" color="textSecondary" variant="h6">
          No notes found 😞
        </Typography>
      )}
    </div>
  );
};

export default ShowNotes;
