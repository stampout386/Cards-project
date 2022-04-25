import React from "react";
import SuperInputText from "./common/SuperInput/SuperInputText";
import SuperButton from "./common/SuperButton/SuperButton";
import SuperCheckbox from "./common/SuperCheckbox/SuperCheckbox";

export function Test() {
    return (
        <div>
            <SuperInputText/>
            <SuperButton>Button</SuperButton>
            <SuperCheckbox/>
        </div>
    );
}