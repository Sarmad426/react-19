import { useState, useTransition } from "react";

import { productData } from "../../data/product-data";

const HomeComponent = () => {
  return <button className="btn">Home</button>;
};
const AboutComponent = () => {
  return <button className="btn">About</button>;
};
const ProductsComponent = () => {
  return (
    <div>
      <button className="btn">Products</button>
      <div className="products">
        {productData.map((product, index) => (
          <div key={index} className="product">
            {product}
          </div>
        ))}
      </div>
    </div>
  );
};

export const UseTransitionTabs: React.FC = () => {
  const [tab, setTab] = useState<string>("home");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab: string) => {
    if (newTab === "products") {
      startTransition(() => {
        setTimeout(() => {
          setTab(newTab);
        }, 3000);
      });
    } else {
      setTab(newTab);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTabChange("home")}>Home</button>
        <button onClick={() => handleTabChange("about")}>About</button>
        <button onClick={() => handleTabChange("products")}>Products</button>
      </div>
      <div>
        {isPending && <p>Loading...</p>}
        {!isPending && tab === "home" && <HomeComponent />}
        {!isPending && tab === "about" && <AboutComponent />}
        {!isPending && tab === "products" && <ProductsComponent />}
      </div>
    </div>
  );
};
