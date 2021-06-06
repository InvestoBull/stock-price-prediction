import React from 'react';
import {SimpleGrid} from '@chakra-ui/react';
import PaymentPlanCard from '../PaymentPlanCard'

const PaymentPlanList = (props) => (
    <SimpleGrid columns={{base: 1, md: 3}} spacing={5}>
        <PaymentPlanCard type="Free" price="0" buttonText="Start Exploring"
                         details={["This plan is the best in the world",
                             " This plan does nothing"]}/>
        <PaymentPlanCard type="Free" price="0" buttonText="Start Exploring"
                         details={["This plan is the best in the world",
                             " This plan does nothing"]}/>
        <PaymentPlanCard type="Free" price="0" buttonText="Start Exploring"
                         details={["This plan is the best in the world",
                             " This plan does nothing"]}/>
    </SimpleGrid>
)

export default PaymentPlanList;