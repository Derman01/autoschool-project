import { createContext } from 'react';

interface IPopupContext {
    closePopup: () => void;
}

export const PopupContext = createContext<IPopupContext>(null);
