import React, { useEffect, useState } from 'react';

interface TabItem {
  title: string;
  content: () => JSX.Element;
}
interface TabsProps {
  items:TabItem[],
  active:string
}

function Tabs({ items, active }:TabsProps) {
  const [activeTab, setActiveTab] = useState(active);

  useEffect(() => {
    const actives = items.filter((item) => item.title === active);
    if (actives.length === 0) {
      setActiveTab(items[0].title);
    }
  }, [active]);

  const handleChange = (newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <div className=" flex justify-center items-center  w-full pb-4">
      <div className=" flex flex-col gap-y-2 w-full">
        <div>
          <div className="inline-flex items-center text-xs hover:bg-gray-100 rounded-xl transition-colors group">
            {items.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => handleChange(item.title)}
                className={`outline-none  p-2 hover:text-black  rounded-lg text-center
                 ${activeTab === item.title ? 'text-black group-hover:text-black/80  group-hover:bg-gray-200' : 'text-black/60'}`}
              >
                {item.title}
              </button>
            ))}

          </div>
        </div>
        <div>
          {items.map((item:any) => (
            <div key={item.title} className={`${activeTab === item.title ? 'block' : 'hidden'} `}>
              {item.content()}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Tabs;
