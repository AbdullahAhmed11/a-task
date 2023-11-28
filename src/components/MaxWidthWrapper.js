import { chakra } from "@chakra-ui/react";

const MaxWidthWrapper = chakra("div", {
    baseStyle: {
        px: { base: 4, md: 6, lg: 8 },
        maxW: "1180px",
        mx: "auto"
    }
});

export default MaxWidthWrapper;