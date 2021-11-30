import React from 'react';

export const ArchiveContext = React.createContext<boolean>(false);

interface ArchiveContextProviderProps {
    archive: boolean;
    children: React.ReactNode;
}

export function ArchiveContextProvider({
    archive,
    children,
}: ArchiveContextProviderProps): React.ReactElement {
    return <ArchiveContext.Provider value={archive}>{children}</ArchiveContext.Provider>;
}

export function useArchive(): boolean {
    return React.useContext(ArchiveContext);
}

export const ARCHIVE_COLOR = '#f5982e';
