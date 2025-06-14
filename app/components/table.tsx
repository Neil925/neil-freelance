"use client";

interface Props {
  data: any[];
  fieldHeaders: string[];
  headerColor: string;
  primaryColor: string;
  secondaryColor: string;
  minLength?: number;
}

export function Table(props: Props) {
  const {
    data,
    fieldHeaders,
    headerColor,
    primaryColor,
    secondaryColor,
    minLength,
  } = props;

  let dataKeys: string[] = [];

  for (let i = 0; i < fieldHeaders.length; i++) {
    dataKeys.push(`holder${i}`);
  }

  if (data[0]) {
    dataKeys = Object.keys(data[0]);
  }

  if (minLength) {
    const toAdd = minLength - data.length;

    for (let i = 0; i < toAdd; i++) {
      const obj: any = {};
      for (let j = 0; j < dataKeys.length; j++) {
        const el = dataKeys[j];
        obj[el] = " ";
      }
      data.push(obj);
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
              className={`p-2 h-12 ${(key % 2 == 0
                ? primaryColor
                : secondaryColor)}`}
            >
              {dataKeys.map((itemKey, k) => (
                <td className="p-2" key={k}>{item[itemKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
