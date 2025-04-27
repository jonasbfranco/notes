import * as React from "react";
import Radio from "@mui/material/Radio";

import "./style.css";

type ColorRadioButtonsProps = {
    selectedValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};



export default function ColorRadioButtons({ selectedValue, handleChange }: ColorRadioButtonsProps) {


    const CustomRadio = (item: string) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: "color-radio-button-demo",
        inputProps: { "aria-label": item },
    });

    return (
        <div className="radioOptions">
            <div>
                <Radio
                    {...CustomRadio("all")}
                    sx={{
                        color: "#c8b6ff",
                        "&.Mui-checked": {
                            color: "#f72585",
                        },
                    }}
                    checked={selectedValue === "all"}
                    onChange={e => handleChange(e.target as any)}
                    value="all"
                />
                <span>Todos</span>
            </div>
            <div>
                <Radio
                    {...CustomRadio("true")}
                    sx={{
                        color: "#c8b6ff",
                        "&.Mui-checked": {
                            color: "#f72585",
                        },
                    }}
                    checked={selectedValue === "true"}
                    onChange={e => handleChange(e.target as any)}
                    value="true"
                />
                <span>Prioridade</span>
            </div>
            <div>
                <Radio
                    {...CustomRadio("false")}
                    sx={{
                        color: "#c8b6ff",
                        "&.Mui-checked": {
                            color: "#f72585",
                        },
                    }}
                    checked={selectedValue === "false"}
                    onChange={e => handleChange(e.target as any)}
                    value="false"
                />
                <span>Normal</span>
            </div>
        </div>
    );
}



