import React, { useState } from "react";
import {
  Grid,
  TextField,
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Drawer,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { useGetAllProducts, useGetCategories } from "../../api/products";
import ProductThumbnails from "../../components/common/ProductThumbnail";
import BackgroundWrapper from "../../components/common/BackgroundWrapper";
import PageDescription from "../../components/common/PageDescription";
import TuneIcon from "@mui/icons-material/Tune";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SwiftBidHome() {
  const { data: categories } = useGetCategories();
  const { data: products } = useGetAllProducts();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isPriceRangeIncluded = (price: number): boolean => {
    if (selectedPrices.includes("Below 300")) {
      return price <= 300;
    }
    if (selectedPrices.includes("Below 200")) {
      return price <= 200;
    }
    if (selectedPrices.includes("Below 100")) {
      return price <= 100;
    }

    return true;
  };

  const handleCategoryToggle = (categoryId: string) => () => {
    const currentIndex = selectedCategories.indexOf(categoryId);
    const newChecked = [...selectedCategories];

    if (currentIndex === -1) {
      newChecked.push(categoryId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedCategories(newChecked);
  };

  const handlePriceToggle = (priceRange: string) => () => {
    const currentIndex = selectedPrices.indexOf(priceRange);
    const newChecked = [...selectedPrices];

    if (currentIndex === -1) {
      newChecked.push(priceRange);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelectedPrices(newChecked);
  };

  const handleSortOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortOption(event.target.value);
  };

  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSortDirection(event.target.value);
  };
  const filteredProducts = products
    ?.filter((obj) =>
      searchQuery.trim()
        ? obj.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
        : true
    )
    .filter((obj) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(obj.category)
        : true
    )
    .filter((obj) =>
      selectedPrices.length > 0 ? isPriceRangeIncluded(+obj.price) : true
    );

  let sortedProducts = [...(filteredProducts || [])];

  if (sortOption === "name") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "price") {
    sortedProducts.sort((a, b) => +a.price - +b.price);
  }

  if (sortDirection === "desc") {
    sortedProducts.reverse();
  }
  const drawerContent = (
    <div role="presentation">
      <List>
        <ListItem>
          <Typography style={{ fontSize: "1.2rem" }}>Categories</Typography>
        </ListItem>
        {categories?.map((cat) => (
          <ListItem key={cat._id}>
            <ListItemText primary={cat.name} />
            <ListItemSecondaryAction>
              <Checkbox
                onClick={handleCategoryToggle(cat._id)}
                edge="end"
                checked={selectedCategories.indexOf(cat._id) !== -1}
                inputProps={{ "aria-labelledby": cat._id }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <Typography style={{ fontSize: "1.2rem" }}>Prices</Typography>
        </ListItem>
        {["Below 100", "Below 200", "Below 300", "Any"].map((priceRange) => (
          <ListItem key={priceRange}>
            <ListItemText primary={priceRange} />
            <ListItemSecondaryAction>
              <Checkbox
                onClick={handlePriceToggle(priceRange)}
                edge="end"
                checked={selectedPrices.indexOf(priceRange) !== -1}
                inputProps={{ "aria-labelledby": priceRange }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <FormControl component="fieldset">
            <Typography style={{ fontSize: "1.2rem" }}>Sort By</Typography>
            <RadioGroup
              aria-label="sort-option"
              name="sort-option"
              value={sortOption}
              onChange={handleSortOptionChange}
            >
              <FormControlLabel value="name" control={<Radio />} label="Name" />
              <FormControlLabel
                value="price"
                control={<Radio />}
                label="Price"
              />
            </RadioGroup>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl component="fieldset">
            <Typography style={{ fontSize: "1.2rem" }}>
              Sort Direction
            </Typography>
            <RadioGroup
              aria-label="sort-direction"
              name="sort-direction"
              value={sortDirection}
              onChange={handleSortDirectionChange}
            >
              <FormControlLabel
                value="asc"
                control={<Radio />}
                label="Ascending"
              />
              <FormControlLabel
                value="desc"
                control={<Radio />}
                label="Descending"
              />
            </RadioGroup>
          </FormControl>
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <BackgroundWrapper>
        <PageDescription
          title="Welcome To SwiftBid"
          caption="Step into the Digital Auction House: Where Every Bid Unveils a New Possibility"
        />
        <br />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={8} md={4}>
            <TextField
              label="Search For Product Name"
              fullWidth
              variant="standard"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                marginTop: "0px",
                marginBottom: "20px",
              }}
              InputProps={{
                style: {
                  color: "white",
                  opacity: 2, // Adjust opacity as needed
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item xs={11}>
                <ProductThumbnails
                  products={sortedProducts || []}
                  showStatus={false}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div style={{ position: "fixed", bottom: 20, right: 20 }}>
          <Fab
            size="small"
            color="primary"
            aria-label="add"
            onClick={() => setDrawerOpen(true)}
          >
            <TuneIcon />
          </Fab>
        </div>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <div style={{ width: isSmallScreen ? "50vw" : "20vw" }}>
            {drawerContent}
          </div>
        </Drawer>
      </BackgroundWrapper>
    </>
  );
}
