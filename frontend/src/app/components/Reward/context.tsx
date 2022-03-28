import React from 'react';

import { Rewarder } from '.';

export const RewarderContext = React.createContext<Rewarder | null>(null);

interface Props {
    children: React.ReactNode;
}

export function RewarderProvider({ children }: Props): React.ReactElement {
    const [rewarder, setRewarder] = React.useState<Rewarder | null>(null);
    const rewarderRef = React.useCallback((rewarderElem: Rewarder) => {
        setRewarder(rewarderElem);
    }, []);

    return (
        <>
            <RewarderContext.Provider value={rewarder}>{children}</RewarderContext.Provider>

            <Rewarder ref={rewarderRef} />
        </>
    );
}

/**
 * Hook to use the rewarder
 * @returns rewarder context hook
 */
export function useRewarder(): Rewarder | null {
    const rewarder = React.useContext(RewarderContext);
    return rewarder;
}
