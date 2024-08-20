// context/WorkspaceContext.js
import React, { createContext, useState, useContext } from 'react';

const WorkspaceContext = createContext();

export const WorkspaceProvider = ({ children }) => {
  const [workspaceId, setWorkspaceId] = useState(null);

  return (
    <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => useContext(WorkspaceContext);