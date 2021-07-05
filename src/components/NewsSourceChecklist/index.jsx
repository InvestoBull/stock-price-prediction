import React, {useState} from 'react';
import {
    Checkbox,
    VStack,
    HStack,
    Text,
    Spacer,
    Button
} from "@chakra-ui/react"

import {CheckIcon} from "@chakra-ui/icons"
import {useStockNews} from "../../contexts/useStockNews";
import {set} from "react-hook-form";

const Source = ({title}) => {
    return (
        <HStack>
            <Text>{title}</Text>
            <Spacer />
            <CheckIcon />
        </HStack>
    )
}

const NewsSourceChecklist = () => {
    const {allNewsSources} = useStockNews();
    const {selectNews} = useStockNews();

    const [checkedItems, setCheckedItems] = useState([true,true,true,true,true,true,true,true])

    return (
        <>
            <VStack align="stretch">
                <HStack>
                    <Button>Check All</Button>
                    <Button>Uncheck All</Button>
                </HStack>
                {allNewsSources.map((newsSource, index) => (
                    <Checkbox
                        key={newsSource}
                        value={newsSource}
                        isChecked={checkedItems[index]}
                        onChange={(e) => {
                            setCheckedItems([e.target.checked, checkedItems[index]])
                            // if (this.isChecked) {
                            //     // allNewsSources --> add this source
                            //     // selectNews()
                            //     return;
                            // }
                            // allNewsSources --> remove this source
                            // selectNews()
                        }}
                    >
                        {newsSource}
                    </Checkbox>
                ))}
            </VStack>
        </>
    )
}

export default NewsSourceChecklist;