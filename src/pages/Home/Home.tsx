import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroBanner from "./HeroBanner";
import CategoriesScroller from "./CategoriesScroller";
import RecentUploads from "./RecentUploads";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <br />
      <div>
        <h2 className="text-center">Categories</h2>
      </div>
      <br />
      <div>
        <CategoriesScroller />
      </div>
      <br />
      <div>
        <h2 className="text-center">Recent Uploads</h2>
      </div>
      <br />
      <div>
        <RecentUploads />
      </div>
    </>
  );
}
