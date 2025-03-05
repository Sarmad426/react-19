import { useState, useTransition, useCallback, useEffect } from "react";
import { productData } from "../../data/product-data";

type TabId = "home" | "about" | "products";

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "Products" },
];

const HomeComponent = () => <p className="text-xl">🏠 Welcome to Home</p>;

const AboutComponent = () => <p className="text-xl">ℹ️ About Us</p>;

const ProductsComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <p className="text-yellow-400 text-lg">⏳ Loading Products...</p>;
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
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [, startTransition] = useTransition();

  const handleTabChange = useCallback((newTab: TabId) => {
    startTransition(() => {
      setActiveTab(newTab);
    });
  }, []);

  const renderTabContent = useCallback(() => {
    const tabComponents: Record<TabId, React.ReactElement> = {
      home: <HomeComponent />,
      about: <AboutComponent />,
      products: <ProductsComponent />,
    };

    return tabComponents[activeTab];
  }, [activeTab]);

  return (
    <div className="p-6 min-h-screen flex flex-col items-center space-y-6">
      <div className="flex space-x-4">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={`
              btn-styles
              ${
                activeTab === id
                  ? "bg-black text-white"
                  : "bg-transparent outline text-black"
              }
              disabled:bg-gray-600 
              disabled:cursor-not-allowed
            `}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="text-center w-full">{renderTabContent()}</div>
    </div>
  );
};

export default UseTransitionTabs;
