import React from "react";
import {Heading, Center, Divider} from "@chakra-ui/react";
import PageTemplate from "../../components/PageTemplate";
import PaymentPlanList from "../../components/PaymentPlanList";
import ReviewCardList from "../../components/ReviewCardList";

const CustomHeading = ({children, ...otherProps}) => (
    <Center>
        <Heading as="h2" size="xl" {...otherProps}>
            {children}
        </Heading>
    </Center>
)

const Payments = () => (
    <PageTemplate>
        <CustomHeading mt={7}>Select A Plan</CustomHeading>
        <PaymentPlanList/>
        <Divider my={16} orientation="horizontal"/>
        <CustomHeading>A Brand That Investors Trust</CustomHeading>
        <ReviewCardList/>
    </PageTemplate>
)

export default Payments;
