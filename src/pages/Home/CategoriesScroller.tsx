import React from "react";
import Slider from "react-slick";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import phonesCat from "../../assets/images/phonesCategory.jpg";
import laptopsCat from "../../assets/images/laptopCategory.jpg";
import furnitureCat from "../../assets/images/furnitureCategory.jpeg";
import bagsCat from "../../assets/images/bagsCategory.png";
import paintingsCat from "../../assets/images/paintingcategory.jpg";

export default function CategoriesScroller() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images: {[key: string]: any} = {
    Phones: phonesCat,
    Laptops: laptopsCat,
    Furniture: furnitureCat,
    Bags: bagsCat,
    Paintings: paintingsCat,
  };

  return (
    <div className="slider-container" style={{ width: "90vw", margin: "auto" }}>
      <Slider {...settings}>
        {["Phones", "Laptops", "Furniture", "Bags", "Paintings"].map((item) => (
          <div>
            <Card sx={{ maxWidth: 180 }}>
              <CardActionArea>
                <img height={140} width={180} src={images[item]} alt={item} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
