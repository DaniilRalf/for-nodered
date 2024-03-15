import { Tooltip, TooltipProps, withStyles } from "@material-ui/core";
import React from "react";

interface BoundaryProp extends TooltipProps {
    /** A HTML element, component instance, or function that returns either.
     * The `container` will have the portal children appended to it.*/
    container: React.ReactInstance | (() => React.ReactInstance)
}

const CustomTooltip = ({container, ...props }: BoundaryProp) => {
    const extendedProps: TooltipProps = {
        ...props,
        PopperProps: {
            container: container,
        }
    }
    const StylesTooltip = withStyles(styles)(Tooltip)
    return <StylesTooltip {...extendedProps}/>
}

const styles = {
    tooltipPlacementBottom: {
        top: "-8px",
    },
}

export default CustomTooltip

