import { MouseEventHandler, ReactElement } from "react";

interface props {
  data: any[];
  tableHeaders: string[];
  headerColor: string;
  primaryColor: string;
  secondaryColor: string;
  minLength?: number;
  actions?: {
    el: ReactElement<any>;
    action: MouseEventHandler<HTMLButtonElement>;
  }[];
}

export const Table = (props: props) => {
  const {
    data,
    tableHeaders: fieldHeaders,
    headerColor,
    primaryColor,
    secondaryColor,
    minLength,
    actions,
  } = props;

  const dataKeys = Object.keys(data);

  if (minLength) {
    const toAdd = data.length - minLength;

    for (let i = 0; i < toAdd; i++) {
      data.push({});
    }
  }

  return (
    <div className="rounded-md overflow-auto drop-shadow-sm drop-shadow-black">
      <table className="w-full table-auto">
        <thead
          className={`${headerColor} font-bold border-b-3 border-b-gray-300`}
        >
          <tr>
            {fieldHeaders.map((v, k) => (
              <td className="p-2 rounded-m w-fit text-nowrap" key={k}>{v}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, key) => (
            <tr
              key={key}
              className={`p-2 h-12 ${(key % 2 == 1
                ? primaryColor
                : secondaryColor)}`}
            >
              {dataKeys.map((itemKey, k) => (
                <td className="p-2">{item[itemKey]}</td>
              ))}
              {actions && item[dataKeys[0]] && (
                <td className="">
                  <div className="p-2 flex justify-around w-full">
                    {actions.map((act, k) => (
                      <button
                        className="cursor-pointer font-bold"
                        onClick={act.action}
                      >
                        <act.el />
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
