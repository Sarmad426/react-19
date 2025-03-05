import { useState, useEffect, useTransition } from "react";
import { productData } from "../../data/product-data";

const Button = ({
  onClick,
  children,
  disabled,
}: {
  onClick: () => void;
  children: string;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`link-styles disabled:bg-gray-600 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

const HomeComponent = () => <p className="text-xl">🏠 Welcome to Home</p>;
const AboutComponent = () => <p className="text-xl">ℹ️ About Us</p>;

const ProductsComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <p className="text-xl mb-4">🛒 Our Products</p>
      <div className="flex gap-6 flex-wrap my-8">
        {productData.map((product, index) => (
          <div key={index} className="p-3 rounded-lg shadow-md w-[180px]">
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
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center space-y-6">
      <div className="flex space-x-4">
        <Button onClick={() => handleTabChange("home")}>Home</Button>
        <Button onClick={() => handleTabChange("about")}>About</Button>
        <Button onClick={() => handleTabChange("products")}>Products</Button>
      </div>

      <div className="text-center w-full">
        {isPending && <p className="text-yellow-400 text-lg">⏳ Loading...</p>}
        {!isPending && tab === "home" && <HomeComponent />}
        {!isPending && tab === "about" && <AboutComponent />}
        {!isPending && tab === "products" && <ProductsComponent />}
      </div>
    </div>
  );
};
