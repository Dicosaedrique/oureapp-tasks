import React from 'react';

import { Rewarder } from '.';

/**
 * Context to use the rewarder
 */
export const RewarderContext = React.createContext<Rewarder | null>(null);

interface Props {
    value: Rewarder | null;
    children: React.ReactNode;
}

/**
 * Default provider for the rewarder context
 */
export function RewarderProvider({ value, children }: Props) {
    return (
        <RewarderContext.Provider value={value}>
            {children}
        </RewarderContext.Provider>
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
