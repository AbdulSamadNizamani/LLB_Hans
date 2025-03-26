
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // ✅ Import styles

const PostPanel = ({ textpost }) => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="px-5 pb-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {textpost && textpost.length > 0
          ? textpost.map((data) => (
              <Link
                to={`/posttext/${data?._id || data?.id}`}
                key={data?._id || data?.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: 360,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                    borderRadius: "12px",
                  }}
                >
                  <CardActionArea sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    {/* ✅ Corrected Skeleton for Image */}
                    {data?.image ? (
                      <CardMedia sx={{ height: 200 }} component="img" image={data.image} alt="image" />
                    ) : (
                      <Skeleton height={200} width="100%" />
                    )}

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6">
                        {data?.heading ? data.heading : <Skeleton width="80%" />}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                        }}
                      >
                        {data?.statement ? data.statement : <Skeleton count={3} />}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            ))
          : // ✅ Show skeletons when `textpost` is empty
            Array(3)
              .fill({})
              .map((_, index) => (
                <Card
                  key={index}
                  sx={{
                    width: "100%",
                    height: 360,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "12px",
                  }}
                >
                  <Skeleton height={200} width="100%" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6">
                      <Skeleton width="80%" />
                    </Typography>
                    <Typography variant="body2">
                      <Skeleton count={3} />
                    </Typography>
                  </CardContent>
                </Card>
              ))}
      </div>
    </SkeletonTheme>
  );
};

export default PostPanel;
