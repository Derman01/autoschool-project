import { useContext } from 'react';
import { PopupContext } from 'shared/context/popup';

export const usePopupContext = () => useContext(PopupContext);
