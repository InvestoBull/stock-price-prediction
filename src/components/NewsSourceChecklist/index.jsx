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
    const {newsSelections} = useStockNews();
    const {selectSingleNews} = useStockNews();

    return (
        <>
            <VStack align="stretch">
                <HStack>
                    <Button>Check All</Button>
                    <Button>Uncheck All</Button>
                </HStack>
                {newsSelections.map((source) => (
                    <Checkbox
                        key={source.id}
                        value={source.name}
                        isChecked={source.selected}
                        // onChange={(e) => {
                        //     setCheckedItems([e.target.checked, checkedItems[index]])
                        //     // if (this.isChecked) {
                        //     //     // newsSelections --> add this source
                        //     //     // selectNews()
                        //     //     return;
                        //     // }
                        //     // newsSelections --> remove this source
                        //     // selectNews()
                        // }}
                        // onChange={selectSingleNews(source)}
                        onChange={(e)=> selectSingleNews(source)}
                    >
                        {source.name}
                    </Checkbox>
                ))}
            </VStack>
        </>
    )
}

export default NewsSourceChecklist;