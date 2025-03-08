import { startTransition, useState, useTransition } from "react";

export function UseTransitionForm() {
  const [quantity, setQuantity] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const updateQuantityAction = async (newQuantity: number) => {
    startTransition(async () => {
      const savedQuantity = await updateQuantity(newQuantity);
      startTransition(() => {
        setQuantity(savedQuantity);
      });
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Checkout
        </h1>
        <Item action={updateQuantityAction} />
        <hr className="my-4 border-gray-300" />
        <Total quantity={quantity} isPending={isPending} />
      </div>
    </div>
  );
}

type ItemProps = {
  action: (quantity: number) => void;
};

function Item({ action }: ItemProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(event.target.value);
    if (isNaN(newQuantity) || newQuantity < 1) return;

    startTransition(async () => {
      action(newQuantity);
    });
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <span className="text-lg font-medium text-gray-700">
        🎟 Eras Tour Tickets
      </span>
      <div className="flex items-center gap-3">
        <label htmlFor="quantity" className="text-gray-600 font-medium">
          Quantity:
        </label>
        <input
          type="number"
          title="quantity"
          onChange={handleChange}
          defaultValue={1}
          min={1}
          className="w-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
        />
      </div>
    </div>
  );
}

const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

type TotalProps = {
  quantity: number;
  isPending: boolean;
};

function Total({ quantity, isPending }: TotalProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-lg font-medium text-gray-700">Total:</span>
      <span className="text-xl font-bold text-blue-600">
        {isPending ? "🌀 Updating..." : `${intl.format(quantity * 9999)}`}
      </span>
    </div>
  );
}

function updateQuantity(newQuantity: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newQuantity);
    }, 2000);
  });
}
